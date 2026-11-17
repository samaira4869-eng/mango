"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { products, Product } from "@/data/products";
import Navbar from "@/components/Navbar";
import ProductBottleScroll from "@/components/ProductBottleScroll";
import ProductDetails from "@/components/ProductDetails";
import BuyNow from "@/components/BuyNow";
import NextFlavorCTA from "@/components/NextFlavorCTA";
import FlavorNavigation from "@/components/FlavorNavigation";
import Footer from "@/components/Footer";
import CartDrawer, { CartItem } from "@/components/CartDrawer";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const currentProduct = products[currentIndex] || products[0];
  const nextIndex = (currentIndex + 1) % products.length;
  const nextProduct = products[nextIndex];

  // Reset scroll to top whenever flavor changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [currentIndex]);

  // Update dynamic CSS gradient variables on root
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--product-gradient",
      currentProduct.gradient
    );
    document.documentElement.style.setProperty(
      "--product-theme",
      currentProduct.themeColor
    );
  }, [currentProduct]);

  const handlePrevFlavor = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const handleNextFlavor = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const handleSelectFlavor = (index: number) => {
    if (index >= 0 && index < products.length) {
      setCurrentIndex(index);
    }
  };

  const handleAddToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.product.id === item.product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === item.product.id
            ? { ...i, quantity: i.quantity + item.quantity, total: i.total + item.total }
            : i
        );
      }
      return [...prev, item];
    });
    setCartOpen(true);
  };

  const handleCheckout = () => {
    alert(
      `Order Placed Successfully! Your chilled batch of ${cartItems
        .map((i) => `${i.quantity}x ${i.product.name}`)
        .join(", ")} is being cold-packed.`
    );
    setCartItems([]);
    setCartOpen(false);
  };

  return (
    <main className="relative min-h-screen text-white overflow-x-hidden">
      {/* Top Fixed Global Navigation */}
      <Navbar
        currentProduct={currentProduct}
        onOrderClick={() => setCartOpen(true)}
      />

      {/* Persistent Left/Right Arrows & Bottom Center Pill Menu */}
      <FlavorNavigation
        currentIndex={currentIndex}
        onSelectFlavor={handleSelectFlavor}
        onPrevFlavor={handlePrevFlavor}
        onNextFlavor={handleNextFlavor}
      />

      {/* Main Product Showcase with AnimatePresence Page Transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentProduct.id}
          initial={{ opacity: 0, filter: "blur(12px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(12px)" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full"
        >
          {/* 1. SCROLL ENGINE (Sticky Canvas Sequence + Typography Overlays) */}
          <ProductBottleScroll product={currentProduct} />

          {/* 2. PRODUCT DETAILS & FRESHNESS SCIENCE */}
          <ProductDetails
            product={currentProduct}
            onOrderClick={() => setCartOpen(true)}
          />

          {/* 3. COMMERCE & BUY NOW SECTION */}
          <BuyNow
            product={currentProduct}
            onAddedToCart={handleAddToCart}
          />

          {/* 4. NEXT FLAVOR SLANTED-EDGE CTA */}
          <NextFlavorCTA
            nextProduct={nextProduct}
            onNext={handleNextFlavor}
          />
        </motion.div>
      </AnimatePresence>

      {/* Footer */}
      <Footer onSelectFlavor={handleSelectFlavor} />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onCheckout={handleCheckout}
      />
    </main>
  );
}
