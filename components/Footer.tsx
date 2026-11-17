"use client";

import React, { useState } from "react";
import Link from "next/link";
import { products } from "@/data/products";

interface FooterProps {
  onSelectFlavor?: (index: number) => void;
}

export default function Footer({ onSelectFlavor }: FooterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="relative bg-gray-950 text-white/80 border-t border-white/10 pt-20 pb-12 overflow-hidden">
      {/* Background radial gradient effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-48 bg-gradient-to-b from-orange-500/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 pb-16 border-b border-white/10">
          {/* Column 1: Brand (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 via-amber-400 to-pink-500 p-[1.5px] shadow-[0_0_15px_rgba(255,152,0,0.4)]">
                <div className="w-full h-full bg-black rounded-[10px] flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-5 h-5 text-amber-400"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                </div>
              </div>
              <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-orange-400 via-amber-300 to-pink-500 bg-clip-text text-transparent">
                Nano Banana
              </span>
            </div>

            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              Pioneering the future of fresh botanical nutrition. Never heated, 
              zero preservatives, and cold-pressed at the speed of sunshine for peak vital nourishment.
            </p>

            <div className="flex items-center gap-4 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                100% Real Fruit
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-amber-400">
                HPP Cold Treated
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-orange-400">
                Direct Farm
              </span>
            </div>
          </div>

          {/* Column 2: Shop Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white">
              Signature Flavors
            </h3>
            <ul className="space-y-2.5 text-sm">
              {products.map((p, idx) => (
                <li key={p.id}>
                  <button
                    onClick={() => onSelectFlavor?.(idx)}
                    className="text-gray-400 hover:text-amber-400 transition-colors flex items-center gap-2 group text-left"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-amber-400 transition-colors" />
                    <span>{p.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white/70">
                      {p.price}
                    </span>
                  </button>
                </li>
              ))}
              <li>
                <span className="text-gray-500 text-xs italic">
                  + Seasonal Curations arriving weekly
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: Quality & Support */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white">
              Assurance & Support
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>
                <a href="#freshness-tech" className="hover:text-white transition-colors">
                  Cold-Chain Guarantee
                </a>
              </li>
              <li>
                <a href="#product-details" className="hover:text-white transition-colors">
                  Ratnagiri Harvest Story
                </a>
              </li>
              <li>
                <a href="#buy-now" className="hover:text-white transition-colors">
                  Metro Delivery Times
                </a>
              </li>
              <li>
                <span className="text-gray-400">100% Satisfaction Return</span>
              </li>
              <li>
                <span className="text-gray-400">Bulk & Corporate Orders</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Signup */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white">
              Fresh Drops Newsletter
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Get secret drops, seasonal harvest alerts, and 15% off your first cold-box order.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-medium">
                ✓ You are on the VIP cold drop list!
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 bottom-1.5 px-3 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all"
                  >
                    Join
                  </button>
                </div>
                <p className="text-[11px] text-gray-500">
                  Zero spam. Unsubscribe anytime in one click.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Credits & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            © {new Date().getFullYear()} Nano Banana Inc. All rights reserved. Future of Freshness.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-gray-300 transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-gray-300 transition-colors cursor-pointer">
              Terms of Freshness
            </span>
            <span className="hover:text-gray-300 transition-colors cursor-pointer">
              FSSAI Certified
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
