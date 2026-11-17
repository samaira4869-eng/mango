"use client";

import React from "react";
import { motion, useTransform, MotionValue } from "framer-motion";
import { Product } from "@/data/products";

interface ProductTextOverlaysProps {
  product: Product;
  scrollYProgress: MotionValue<number>;
}

export default function ProductTextOverlays({
  product,
  scrollYProgress,
}: ProductTextOverlaysProps) {
  // Section 1: Hero Welcome (0.00 - 0.22)
  const opacity1 = useTransform(scrollYProgress, [0.0, 0.05, 0.15, 0.22], [1, 1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0.0, 0.22], [0, -60]);
  const scale1 = useTransform(scrollYProgress, [0.0, 0.22], [1, 0.95]);

  // Section 2: Bursting with Fresh Fruit (0.24 - 0.48)
  const opacity2 = useTransform(scrollYProgress, [0.22, 0.28, 0.42, 0.48], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.22, 0.28, 0.42, 0.48], [50, 0, 0, -50]);

  // Section 3: Vitamin-packed Refreshment (0.50 - 0.74)
  const opacity3 = useTransform(scrollYProgress, [0.48, 0.54, 0.68, 0.74], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.48, 0.54, 0.68, 0.74], [50, 0, 0, -50]);

  // Section 4: Pure Fruit, Never Concentrate (0.76 - 0.98)
  const opacity4 = useTransform(scrollYProgress, [0.74, 0.80, 0.94, 0.99], [0, 1, 1, 0]);
  const y4 = useTransform(scrollYProgress, [0.74, 0.80, 0.94, 0.99], [50, 0, 0, -40]);

  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-center items-center px-4 sm:px-8 max-w-7xl mx-auto">
      {/* SECTION 1: HERO TITLE & SUBTITLE */}
      <motion.div
        style={{ opacity: opacity1, y: y1, scale: scale1 }}
        className="absolute inset-0 flex flex-col justify-center items-center text-center px-4"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel-dark text-xs sm:text-sm font-semibold tracking-widest uppercase mb-4 text-white/90 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Cold Pressed Revolution</span>
        </div>

        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
          {product.section1.title}
        </h1>

        <p className="mt-4 text-xl sm:text-2xl md:text-3xl font-light text-white/90 tracking-wide max-w-2xl drop-shadow-[0_2px_15px_rgba(0,0,0,0.6)]">
          {product.section1.subtitle}
        </p>

        {/* Floating Quick Badges */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {product.features.map((feature, idx) => (
            <span
              key={idx}
              className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-black/40 backdrop-blur-md border border-white/20 text-white/90 shadow-md"
            >
              {feature}
            </span>
          ))}
        </div>
      </motion.div>

      {/* SECTION 2: BURSTING WITH FRESH FRUIT (LEFT-ALIGNED LAYOUT) */}
      <motion.div
        style={{ opacity: opacity2, y: y2 }}
        className="absolute inset-x-4 sm:inset-x-8 md:left-12 lg:left-24 max-w-xl text-left"
      >
        <div className="p-6 sm:p-8 rounded-3xl glass-panel-dark shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-white/15">
          <div className="text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-amber-400 mb-2">
            01 / Origin & Taste
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {product.section2.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/80 leading-relaxed">
            {product.section2.subtitle}
          </p>

          {/* Stat Pill */}
          <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-6">
            <div>
              <div className="text-2xl sm:text-3xl font-black text-amber-300">
                {product.stats[2]?.val || "100%"}
              </div>
              <div className="text-[11px] uppercase tracking-wider text-white/60">
                {product.stats[2]?.label || "Pulp"}
              </div>
            </div>
            <div className="h-8 w-px bg-white/15" />
            <div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-300">
                {product.stats[0]?.val || "0g"}
              </div>
              <div className="text-[11px] uppercase tracking-wider text-white/60">
                Added {product.stats[0]?.label || "Sugar"}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* SECTION 3: VITAMIN-PACKED REFRESHMENT (RIGHT-ALIGNED LAYOUT) */}
      <motion.div
        style={{ opacity: opacity3, y: y3 }}
        className="absolute inset-x-4 sm:inset-x-8 md:right-12 lg:right-24 max-w-xl text-left sm:text-right ml-auto"
      >
        <div className="p-6 sm:p-8 rounded-3xl glass-panel-dark shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-white/15">
          <div className="text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-emerald-400 mb-2">
            02 / Bio-Availability
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {product.section3.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/80 leading-relaxed">
            {product.section3.subtitle}
          </p>

          <div className="mt-6 flex flex-wrap gap-2 justify-start sm:justify-end">
            {product.stats.map((stat, idx) => (
              <div
                key={idx}
                className="px-3.5 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-center"
              >
                <div className="text-lg font-black text-white">{stat.val}</div>
                <div className="text-[10px] uppercase tracking-wider text-white/60">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* SECTION 4: MADE FROM FRUIT, NOT CONCENTRATE (CENTERED BOLD HERO) */}
      <motion.div
        style={{ opacity: opacity4, y: y4 }}
        className="absolute inset-0 flex flex-col justify-center items-center text-center px-4"
      >
        <div className="max-w-3xl p-8 sm:p-12 rounded-3xl glass-panel-dark border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.5)]">
          <span className="inline-block px-4 py-1 rounded-full bg-orange-500/30 text-orange-300 border border-orange-400/40 text-xs font-bold tracking-widest uppercase mb-4">
            Zero Compromise
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-none">
            {product.section4.title}
          </h2>
          {product.section4.subtitle ? (
            <p className="mt-4 text-lg sm:text-xl text-white/90 max-w-xl mx-auto">
              {product.section4.subtitle}
            </p>
          ) : (
            <p className="mt-4 text-base sm:text-lg text-white/80 max-w-xl mx-auto">
              Never heated. No synthetic additives. Only whole fruit cold-pressed at the speed of harvest.
            </p>
          )}

          <div className="mt-8 flex items-center justify-center gap-4">
            <span className="text-3xl font-extrabold text-amber-300">
              {product.price}
            </span>
            <span className="text-sm text-white/60">
              {product.buyNowSection.unit}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
