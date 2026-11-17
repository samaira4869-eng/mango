"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, MotionValue } from "framer-motion";
import { Product } from "@/data/products";
import ProductTextOverlays from "./ProductTextOverlays";

interface ProductBottleScrollProps {
  product: Product;
}

const TOTAL_FRAMES = 120;

export default function ProductBottleScroll({ product }: ProductBottleScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const lastDrawnFrameRef = useRef<number>(-1);
  const rafIdRef = useRef<number | null>(null);

  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // useScroll hook bound to the 500vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Render a specific frame onto the responsive canvas
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const images = imagesRef.current;
    let img = images[frameIndex];

    // Fallback to nearest loaded image if target frame is not ready
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const prev = images[frameIndex - offset];
        if (prev && prev.complete && prev.naturalWidth > 0) {
          img = prev;
          break;
        }
        const next = images[frameIndex + offset];
        if (next && next.complete && next.naturalWidth > 0) {
          img = next;
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Calculate aspect ratio "contain"
    const imgRatio = img.width / img.height;
    const canvasRatio = canvasWidth / canvasHeight;

    let drawWidth = canvasWidth;
    let drawHeight = canvasHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      // Screen is wider than image: fit height, center horizontally
      drawHeight = canvasHeight;
      drawWidth = canvasHeight * imgRatio;
      offsetX = (canvasWidth - drawWidth) / 2;
      offsetY = 0;
    } else {
      // Screen is taller than image: fit width, center vertically
      drawWidth = canvasWidth;
      drawHeight = canvasWidth / imgRatio;
      offsetX = 0;
      offsetY = (canvasHeight - drawHeight) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    lastDrawnFrameRef.current = frameIndex;
  }, []);

  // Sync canvas dimensions with device pixel ratio
  const updateCanvasDimensions = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    const rect = canvas.getBoundingClientRect();

    if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);

      // Re-draw current frame after resizing
      if (lastDrawnFrameRef.current >= 0) {
        drawFrame(lastDrawnFrameRef.current);
      }
    }
  }, [drawFrame]);

  // Preload frames for current product
  useEffect(() => {
    let isCancelled = false;
    imagesRef.current = [];
    lastDrawnFrameRef.current = -1;
    setImagesLoaded(false);
    setLoadProgress(0);

    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let loadedCount = 0;

    const handleSingleImageLoad = () => {
      if (isCancelled) return;
      loadedCount++;
      const currentProgress = Math.round((loadedCount / TOTAL_FRAMES) * 100);
      setLoadProgress(currentProgress);

      // As soon as the first frame loads, render it immediately
      if (loadedCount === 1 && lastDrawnFrameRef.current === -1) {
        updateCanvasDimensions();
        drawFrame(0);
      }

      if (loadedCount >= Math.min(30, TOTAL_FRAMES)) {
        setImagesLoaded(true);
      }
    };

    // Preload all 120 images
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      // Try WebP first with JPG fallback if error
      const frameNum = i + 1;
      img.src = `${product.folderPath}/${frameNum}.webp`;
      img.onload = handleSingleImageLoad;
      img.onerror = () => {
        // Fallback to jpg
        img.onerror = handleSingleImageLoad;
        img.src = `${product.folderPath}/${frameNum}.jpg`;
      };
      images[i] = img;
    }

    imagesRef.current = images;

    return () => {
      isCancelled = true;
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [product.folderPath, drawFrame, updateCanvasDimensions]);

  // Handle window resize
  useEffect(() => {
    updateCanvasDimensions();
    window.addEventListener("resize", updateCanvasDimensions);
    return () => window.removeEventListener("resize", updateCanvasDimensions);
  }, [updateCanvasDimensions]);

  // Subscribe to scrollYProgress to update the frame index via requestAnimationFrame
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (progress: number) => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }

      rafIdRef.current = requestAnimationFrame(() => {
        // Map progress (0 to 1) to frame index (0 to 119)
        const frameIndex = Math.min(
          TOTAL_FRAMES - 1,
          Math.max(0, Math.floor(progress * (TOTAL_FRAMES - 1)))
        );

        if (frameIndex !== lastDrawnFrameRef.current) {
          drawFrame(frameIndex);
        }
      });
    });

    return () => {
      unsubscribe();
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [scrollYProgress, drawFrame]);

  return (
    <div
      ref={containerRef}
      id="scrolly-hero"
      className="relative w-full h-[500vh] select-none"
    >
      {/* Sticky viewport frame */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
        {/* Soft radial glow reflecting product theme */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-1000"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${product.themeColor} 0%, transparent 65%)`,
          }}
        />

        {/* Ambient floating particle hint */}
        <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />

        {/* Loading indicator (only visible on initial frame fetch) */}
        {!imagesLoaded && (
          <div className="absolute z-30 bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 px-4 py-2 rounded-full glass-panel-dark">
            <div className="flex items-center gap-3">
              <div className="w-3.5 h-3.5 border-2 border-orange-400 border-t-transparent rounded-full animate-spin" />
              <span className="text-xs font-semibold text-white/80 tracking-wider uppercase">
                Loading Experience {loadProgress}%
              </span>
            </div>
            <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-400 to-amber-300 transition-all duration-200"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* HTML5 Canvas Engine */}
        <canvas
          ref={canvasRef}
          className="relative z-10 w-full h-full object-contain pointer-events-none"
          style={{ touchAction: "none" }}
        />

        {/* Text Overlays mapped to scroll stages */}
        <ProductTextOverlays
          product={product}
          scrollYProgress={scrollYProgress}
        />

        {/* Scroll down prompt (fades as user starts scrolling) */}
        <ScrollIndicator scrollYProgress={scrollYProgress} />
      </div>
    </div>
  );
}

function ScrollIndicator({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      if (latest > 0.05) {
        setOpacity(Math.max(0, 1 - latest * 15));
      } else {
        setOpacity(1);
      }
    });
  }, [scrollYProgress]);

  if (opacity <= 0.01) return null;

  return (
    <div
      style={{ opacity }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none transition-opacity duration-300"
    >
      <span className="text-[11px] font-bold tracking-[0.25em] text-white/70 uppercase">
        Scroll to Explore
      </span>
      <div className="w-5 h-9 rounded-full border-2 border-white/40 flex justify-center p-1">
        <div className="w-1.5 h-2.5 rounded-full bg-white/80 animate-bounce" />
      </div>
    </div>
  );
}
