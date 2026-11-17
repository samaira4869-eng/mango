"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Product } from "@/data/products";

interface ProductDetailsProps {
  product: Product;
  onOrderClick?: () => void;
}

export default function ProductDetails({ product, onOrderClick }: ProductDetailsProps) {
  const detailImageSrc = `${product.folderPath}/details.webp`;

  return (
    <section id="product-details" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      {/* SECTION 1: THE CRAFT & BOTANICAL DETAILS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mb-32">
        {/* Left Column: Visual Showcase Card */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 relative"
        >
          <div className="relative group rounded-3xl overflow-hidden glass-panel-dark p-6 sm:p-10 border border-white/20 shadow-2xl">
            {/* Ambient Background Gradient Glow */}
            <div
              className="absolute -top-24 -left-24 w-72 h-72 rounded-full blur-3xl opacity-40 pointer-events-none transition-all duration-700 group-hover:scale-125"
              style={{ backgroundColor: product.themeColor }}
            />

            {/* Showcase Image */}
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-black/40 flex items-center justify-center">
              <Image
                src={detailImageSrc}
                alt={product.detailsSection.imageAlt}
                width={800}
                height={800}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />

              {/* Overlay Badge */}
              <div className="absolute top-4 left-4 glass-panel px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-lg flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Single-Estate Harvest</span>
              </div>
            </div>

            {/* Quick stats below image */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              {product.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-white/5 border border-white/10 text-center"
                >
                  <div className="text-xl font-extrabold text-white">
                    {stat.val}
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-white/60">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Column: Copy & Story */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold uppercase tracking-widest text-amber-300">
            <span>Botanical Excellence</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            {product.detailsSection.title}
          </h2>

          <p className="text-lg text-white/80 leading-relaxed">
            {product.detailsSection.description}
          </p>

          <div className="space-y-4 pt-4 border-t border-white/15">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white/90">
              Key Extraction Characteristics
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {product.features.map((feat, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10"
                >
                  <div className="w-6 h-6 rounded-lg bg-orange-500/20 flex items-center justify-center text-amber-400">
                    ✓
                  </div>
                  <span className="text-sm font-semibold text-white/90">
                    {feat}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* SECTION 2: FARM TO BOTTLE & FRESHNESS TECHNOLOGY */}
      <motion.div
        id="freshness-tech"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="rounded-3xl glass-panel-dark p-8 sm:p-14 border border-white/20 relative overflow-hidden shadow-2xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-widest">
              <span>HPP Science</span>
            </div>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              {product.freshnessSection.title}
            </h3>
            <p className="text-base sm:text-lg text-white/80 leading-relaxed">
              {product.freshnessSection.description}
            </p>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between h-36">
              <span className="text-xs uppercase tracking-wider text-white/50 font-medium">Pressure</span>
              <span className="text-2xl font-black text-amber-400">6,000 Bar</span>
              <span className="text-xs text-white/70">Isostatic water pressure neutralizes microbes</span>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between h-36">
              <span className="text-xs uppercase tracking-wider text-white/50 font-medium">Thermal Impact</span>
              <span className="text-2xl font-black text-emerald-400">0°C Heat</span>
              <span className="text-xs text-white/70">Never boiled or cooked like commercial concentrate</span>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between h-36">
              <span className="text-xs uppercase tracking-wider text-white/50 font-medium">Enzyme Life</span>
              <span className="text-2xl font-black text-sky-400">100% Active</span>
              <span className="text-xs text-white/70">Live digestive enzymes and vitamins preserved</span>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between h-36">
              <span className="text-xs uppercase tracking-wider text-white/50 font-medium">Cold Chain</span>
              <span className="text-2xl font-black text-pink-400">4°C Chilled</span>
              <span className="text-xs text-white/70">Insulated transit to maintain peak freshness</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
