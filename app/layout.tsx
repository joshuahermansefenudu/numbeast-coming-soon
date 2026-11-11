import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";

const adventure = localFont({
  src: "../public/adventure/bangers-400.woff2",
  variable: "--font-adventure",
  weight: "400",
  display: "swap",
});

const interfaceFont = localFont({
  src: [
    { path: "../public/adventure/barlow-500.woff2", weight: "500" },
    { path: "../public/adventure/barlow-700.woff2", weight: "700" },
  ],
  variable: "--font-interface",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Numbeast — Raise a little legend.",
  description:
    "A maths adventure for ages 7–12. Hatch a companion, solve playful quests and explore Tide Cove with a friendly voice guide. Join the parent launch list.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${adventure.variable} ${interfaceFont.variable}`}>
        {children}
      </body>
    </html>
  );
}
