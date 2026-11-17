"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Product } from "@/data/products";

interface NavbarProps {
  currentProduct: Product;
  onOrderClick?: () => void;
}

export default function Navbar({ currentProduct, onOrderClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/40 backdrop-blur-2xl border-b border-white/10 py-3 shadow-2xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Branding */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Nano Banana Home"
          >
            {/* Abstract Lightning / Banana Icon */}
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 via-amber-400 to-yellow-300 p-[1.5px] shadow-[0_0_20px_rgba(255,152,0,0.5)] transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full bg-black/80 rounded-[10px] flex items-center justify-center overflow-hidden">
                <svg
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 transition-transform duration-300 group-hover:rotate-6"
                >
                  <defs>
                    <linearGradient id="bananaBolt" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFA000" />
                      <stop offset="50%" stopColor="#FFD54F" />
                      <stop offset="100%" stopColor="#FF4081" />
                    </linearGradient>
                  </defs>
                  {/* Stylized geometric curve reminiscent of banana silhouette + lightning bolt */}
                  <path
                    d="M19.5 3C18.2 3.1 14 5.5 10.5 11C7 16.5 7.5 22 9.5 25C11.5 28 16 29 20 27C21.5 26.2 21 24.5 19.5 24C16.5 23 13 20 13.5 15C14 10 17 6.5 21 5.5C22 5.2 21.5 3 19.5 3Z"
                    fill="url(#bananaBolt)"
                    opacity="0.8"
                  />
                  <path
                    d="M17 5L9 17H16L13 27L24 13H16.5L19 5H17Z"
                    fill="url(#bananaBolt)"
                  />
                </svg>
              </div>
            </div>

            {/* Gradient Logo Text */}
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-orange-400 via-amber-300 to-pink-500 bg-clip-text text-transparent drop-shadow-sm">
                Nano Banana
              </span>
              <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/60 -mt-1">
                {currentProduct.name}
              </span>
            </div>
          </Link>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/80">
            <button
              onClick={() => scrollToSection("scrolly-hero")}
              className="hover:text-white transition-colors duration-200 cursor-pointer"
            >
              Experience
            </button>
            <button
              onClick={() => scrollToSection("product-details")}
              className="hover:text-white transition-colors duration-200 cursor-pointer"
            >
              Craft & Farm
            </button>
            <button
              onClick={() => scrollToSection("freshness-tech")}
              className="hover:text-white transition-colors duration-200 cursor-pointer"
            >
              Freshness Tech
            </button>
            <button
              onClick={() => scrollToSection("buy-now")}
              className="hover:text-white transition-colors duration-200 cursor-pointer"
            >
              Flavors & Shop
            </button>
          </nav>

          {/* Action Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={
                onOrderClick || (() => scrollToSection("buy-now"))
              }
              className="relative group overflow-hidden rounded-full p-[1px] focus:outline-none active:scale-95 transition-transform duration-200"
            >
              {/* Outer Glow */}
              <span className="absolute inset-0 bg-gradient-to-r from-orange-500 via-amber-400 to-pink-500 rounded-full blur-sm opacity-70 group-hover:opacity-100 transition-opacity duration-300 animate-pulse-slow" />
              {/* Button Surface */}
              <span className="relative flex items-center gap-2 px-5 py-2 sm:px-6 sm:py-2.5 rounded-full bg-black/80 backdrop-blur-md text-white text-xs sm:text-sm font-bold tracking-wide uppercase group-hover:bg-black/60 transition-colors duration-300 border border-white/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                <span>Order Now</span>
                <span className="text-white/60 font-normal">|</span>
                <span className="text-amber-300 font-extrabold">{currentProduct.price}</span>
              </span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white/80 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 px-6 rounded-2xl bg-black/90 backdrop-blur-xl border border-white/10 flex flex-col gap-4 text-center">
            <button
              onClick={() => scrollToSection("scrolly-hero")}
              className="py-2 text-white/80 hover:text-white transition-colors"
            >
              Experience
            </button>
            <button
              onClick={() => scrollToSection("product-details")}
              className="py-2 text-white/80 hover:text-white transition-colors"
            >
              Craft & Farm
            </button>
            <button
              onClick={() => scrollToSection("freshness-tech")}
              className="py-2 text-white/80 hover:text-white transition-colors"
            >
              Freshness Tech
            </button>
            <button
              onClick={() => scrollToSection("buy-now")}
              className="py-2 text-white/80 hover:text-white transition-colors"
            >
              Flavors & Shop
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
