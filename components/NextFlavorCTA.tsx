"use client";

import React from "react";
import { motion } from "framer-motion";
import { Product } from "@/data/products";

interface NextFlavorCTAProps {
  nextProduct: Product;
  onNext: () => void;
}

export default function NextFlavorCTA({ nextProduct, onNext }: NextFlavorCTAProps) {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 text-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center"
      >
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/60 mb-4">
          Continue The Scrolly Journey
        </span>

        {/* Large Slanted-Edge CTA Button */}
        <button
          onClick={onNext}
          className="group relative block w-full max-w-3xl focus:outline-none transition-transform duration-300 active:scale-98"
        >
          {/* Slanted outer glow */}
          <div
            className="absolute -inset-1 blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
            style={{
              background: nextProduct.gradient,
            }}
          />

          {/* Slanted Container */}
          <div
            className="relative px-8 py-10 sm:py-14 bg-black/85 backdrop-blur-2xl border-2 border-white/20 transition-all duration-500 group-hover:border-white/40 flex flex-col sm:flex-row items-center justify-between gap-6"
            style={{
              clipPath: "polygon(0% 0%, 96% 0%, 100% 100%, 4% 100%)",
            }}
          >
            <div className="text-left sm:pl-6 space-y-1">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-white/50">
                Next Botanical Batch
              </span>
              <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight flex items-center gap-3">
                <span>{nextProduct.name}</span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-white/80 font-bold tracking-normal align-middle">
                  {nextProduct.price}
                </span>
              </h3>
              <p className="text-sm sm:text-base text-white/70 italic">
                "{nextProduct.subName}"
              </p>
            </div>

            <div className="sm:pr-6 flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-black font-black text-xl transition-all duration-300 group-hover:scale-110 shadow-xl"
                style={{ background: nextProduct.gradient }}
              >
                →
              </div>
            </div>
          </div>
        </button>
      </motion.div>
    </section>
  );
}
