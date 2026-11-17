"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Product } from "@/data/products";

interface BuyNowProps {
  product: Product;
  onAddedToCart?: (item: { product: Product; quantity: number; total: number }) => void;
}

export default function BuyNow({ product, onAddedToCart }: BuyNowProps) {
  const [packSize, setPackSize] = useState<number>(4); // default 4-pack
  const [quantity, setQuantity] = useState<number>(1);
  const [added, setAdded] = useState(false);

  // Parse numeric price from string like "₹120"
  const basePriceNum = parseInt(product.buyNowSection.price.replace(/[^\d]/g, ""), 10) || 120;

  // Calculate discount based on pack
  const discountMultiplier = packSize === 8 ? 0.85 : packSize === 4 ? 0.9 : 1.0;
  const unitPrice = Math.round(basePriceNum * discountMultiplier);
  const totalPrice = unitPrice * packSize * quantity;

  const handleAddToCart = () => {
    setAdded(true);
    onAddedToCart?.({
      product,
      quantity: packSize * quantity,
      total: totalPrice,
    });
    setTimeout(() => setAdded(false), 3000);
  };

  return (
    <section id="buy-now" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="rounded-3xl glass-panel-dark border border-white/20 p-6 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl"
      >
        {/* Decorative corner glows */}
        <div
          className="absolute -top-32 -right-32 w-80 h-80 rounded-full blur-3xl opacity-30 pointer-events-none"
          style={{ backgroundColor: product.themeColor }}
        />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full blur-3xl opacity-20 bg-emerald-500 pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Product Commerce Meta */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold uppercase tracking-widest text-amber-300">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Chilled Direct Dispatch</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              Order {product.name}
            </h2>

            <p className="text-lg text-white/80 max-w-xl leading-relaxed">
              {product.description}
            </p>

            {/* Processing badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              {product.buyNowSection.processingParams.map((param, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 text-xs font-semibold text-white/90"
                >
                  ⚡ {param}
                </span>
              ))}
            </div>

            {/* Guarantees & Delivery */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-white/10">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Delivery Promise
                </div>
                <p className="text-xs text-white/70 leading-relaxed">
                  {product.buyNowSection.deliveryPromise}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Return Policy
                </div>
                <p className="text-xs text-white/70 leading-relaxed">
                  {product.buyNowSection.returnPolicy}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Order Configurator Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-white/5 border border-white/15 p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-6">
              {/* Pack Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-3">
                  Select Pack Size
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { count: 1, label: "Single", discount: "" },
                    { count: 4, label: "4-Pack", discount: "Save 10%" },
                    { count: 8, label: "8-Pack", discount: "Save 15%" },
                  ].map((tier) => (
                    <button
                      key={tier.count}
                      onClick={() => setPackSize(tier.count)}
                      className={`relative p-3 rounded-xl border text-center transition-all ${
                        packSize === tier.count
                          ? "bg-gradient-to-br from-orange-500/30 to-amber-500/20 border-amber-400 text-white shadow-lg"
                          : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                      }`}
                    >
                      {tier.discount && (
                        <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase bg-emerald-500 text-black">
                          {tier.discount}
                        </span>
                      )}
                      <div className="text-lg font-black">{tier.label}</div>
                      <div className="text-[10px] text-white/60">
                        {tier.count * 300} ml total
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity selector */}
              <div className="flex items-center justify-between py-2 border-y border-white/10">
                <span className="text-sm font-semibold text-white/80">Quantity</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-white font-bold hover:bg-white/20 active:scale-95 transition-transform"
                  >
                    -
                  </button>
                  <span className="text-lg font-black text-white w-6 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-white font-bold hover:bg-white/20 active:scale-95 transition-transform"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Price summary */}
              <div className="flex items-baseline justify-between pt-2">
                <div>
                  <div className="text-3xl sm:text-4xl font-black text-amber-300">
                    ₹{totalPrice}
                  </div>
                  <div className="text-xs text-white/60">
                    ₹{unitPrice} / bottle ({product.buyNowSection.unit})
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                    In Stock • Chilled
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  className={`w-full py-4 rounded-xl font-bold uppercase tracking-wider text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-xl active:scale-98 ${
                    added
                      ? "bg-emerald-500 text-black shadow-emerald-500/40"
                      : "bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-400 hover:from-orange-600 hover:to-amber-500 text-black shadow-orange-500/30"
                  }`}
                >
                  {added ? (
                    <>
                      <span>✓ Added to Chilled Cart!</span>
                    </>
                  ) : (
                    <>
                      <span>Add to Cart • ₹{totalPrice}</span>
                    </>
                  )}
                </button>

                <p className="text-center text-[11px] text-white/50">
                  ⚡ Free refrigerated shipping on orders over ₹400
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
