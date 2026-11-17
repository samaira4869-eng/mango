import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Nano Banana | Future of Freshness",
  description:
    "Experience the pinnacle of cold-pressed purity. 100% real fruit, zero preservatives, high-pressure processed for unmatched taste and vitality.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className={`${outfit.className} antialiased selection:bg-orange-500 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
