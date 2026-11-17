"use client";

import React from "react";
import { Product, products } from "@/data/products";

interface FlavorNavigationProps {
  currentIndex: number;
  onSelectFlavor: (index: number) => void;
  onPrevFlavor: () => void;
  onNextFlavor: () => void;
}

export default function FlavorNavigation({
  currentIndex,
  onSelectFlavor,
  onPrevFlavor,
  onNextFlavor,
}: FlavorNavigationProps) {
  const prevIndex = (currentIndex - 1 + products.length) % products.length;
  const nextIndex = (currentIndex + 1) % products.length;

  return (
    <>
      {/* FIXED LEFT ARROW */}
      <div className="fixed left-4 sm:left-6 top-1/2 -translate-y-1/2 z-40 hidden md:block">
        <button
          onClick={onPrevFlavor}
          aria-label={`Previous flavor: ${products[prevIndex].name}`}
          className="group relative flex items-center justify-center w-12 h-12 rounded-full glass-panel-dark text-white hover:scale-110 active:scale-95 transition-all duration-300 shadow-xl border border-white/20"
        >
          <svg
            className="w-5 h-5 transition-transform group-hover:-translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>

          {/* Floating Tooltip */}
          <span className="absolute left-16 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md text-xs font-semibold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-white/10 shadow-lg">
            ← {products[prevIndex].name}
          </span>
        </button>
      </div>

      {/* FIXED RIGHT ARROW */}
      <div className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:block">
        <button
          onClick={onNextFlavor}
          aria-label={`Next flavor: ${products[nextIndex].name}`}
          className="group relative flex items-center justify-center w-12 h-12 rounded-full glass-panel-dark text-white hover:scale-110 active:scale-95 transition-all duration-300 shadow-xl border border-white/20"
        >
          <svg
            className="w-5 h-5 transition-transform group-hover:translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>

          {/* Floating Tooltip */}
          <span className="absolute right-16 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md text-xs font-semibold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-white/10 shadow-lg">
            {products[nextIndex].name} →
          </span>
        </button>
      </div>

      {/* FIXED BOTTOM-CENTER PILL MENU */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-[90vw]">
        <div className="glass-panel-dark px-3 py-2 rounded-full border border-white/20 shadow-2xl flex items-center gap-1.5 sm:gap-2">
          {products.map((item, index) => {
            const isActive = index === currentIndex;
            return (
              <button
                key={item.id}
                onClick={() => onSelectFlavor(index)}
                className={`relative px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? "bg-white text-black shadow-lg shadow-white/20 scale-105"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                {/* Color Dot */}
                <span
                  className="w-2.5 h-2.5 rounded-full inline-block border border-black/20"
                  style={{ backgroundColor: item.themeColor }}
                />
                <span className="hidden sm:inline">{item.name}</span>
                <span className="sm:hidden">{item.name.split(" ")[1] || item.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
