"use client";

import React from "react";
import { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
  total: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onCheckout,
}: CartDrawerProps) {
  if (!isOpen) return null;

  const totalAmount = items.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer content */}
      <div className="relative w-full max-w-md h-full bg-neutral-950 border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl z-10 overflow-y-auto">
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <h2 className="text-xl font-black text-white">Chilled Basket</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-white/60 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              ✕
            </button>
          </div>

          {items.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <div className="text-4xl">🧊</div>
              <p className="text-white/60 text-sm">Your chilled box is empty.</p>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-white/10 text-xs font-bold uppercase text-white hover:bg-white/20 transition-colors"
              >
                Choose a Flavor
              </button>
            </div>
          ) : (
            <div className="divide-y divide-white/10 py-4">
              {items.map((item, idx) => (
                <div key={idx} className="py-4 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-white text-base">
                      {item.product.name}
                    </h4>
                    <p className="text-xs text-white/60">
                      {item.quantity} bottles ({item.product.buyNowSection.unit})
                    </p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Cold Pack Insulated
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-black text-amber-300">
                      ₹{item.total}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="pt-6 border-t border-white/10 space-y-4">
            <div className="flex justify-between items-baseline">
              <span className="text-sm text-white/70">Subtotal</span>
              <span className="text-2xl font-black text-white">₹{totalAmount}</span>
            </div>
            <div className="flex justify-between text-xs text-emerald-400">
              <span>Chilled Shipping</span>
              <span>FREE</span>
            </div>

            <button
              onClick={onCheckout}
              className="w-full py-4 rounded-xl font-bold uppercase tracking-wider text-sm bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-300 text-black shadow-lg shadow-orange-500/30 hover:opacity-90 active:scale-98 transition-all"
            >
              Proceed to Checkout • ₹{totalAmount}
            </button>

            <p className="text-center text-[10px] text-white/40">
              Guaranteed under 4°C upon arrival • 100% Satisfaction Guarantee
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
