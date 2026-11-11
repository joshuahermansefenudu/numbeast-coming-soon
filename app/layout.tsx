import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";

const nunito = localFont({
  src: "../public/adventure/nunito.woff2",
  variable: "--font-nunito",
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
      <body className={nunito.variable}>{children}</body>
    </html>
  );
}
