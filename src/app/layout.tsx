import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

/**
 * Inter loaded via next/font so the browser never uses a fallback font
 * during first paint. This prevents the headline width from changing
 * after measurement (a critical correctness concern for GSAP layout caching).
 */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans", // reuse the existing CSS variable name
  display: "swap",
});

export const metadata: Metadata = {
  title: "Car Scroll Animation – ITZFIZZ",
  description:
    "A scroll-driven hero section where an orange supercar drives across the screen, revealing a headline and stat cards as it passes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
