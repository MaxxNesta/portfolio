import type { Metadata } from "next";
import { Cormorant_Garamond, Space_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import { Analytics } from "@vercel/analytics/next";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ju — Portfolio",
  description:
    "Explore the works of Ju, a stylist and visual artist crafting fashion stories through editorial styling, artworks, and curated aesthetics.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${spaceMono.variable}`}
    >
      <body>
        <SmoothScroll>
          <CustomCursor />
          {children}
        </SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}
