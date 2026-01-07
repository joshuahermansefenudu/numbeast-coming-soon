"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import EmailCapture from "./EmailCapture";
import FloatingDecor from "./FloatingDecor";
import GameHudCard from "./GameHudCard";

const supportChips = ["Ages 4–12", "K–7 Topics", "No Ads", "Family Friendly"];

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [xpBoosted, setXpBoosted] = useState(false);
  const [popKey, setPopKey] = useState(0);
  const emailInputId = "waitlist-email";

  const handleCtaClick = () => {
    setPopKey((value) => value + 1);
    if (typeof window !== "undefined") {
      const isMobile = window.matchMedia("(max-width: 639px)").matches;
      if (isMobile) {
        return;
      }
    }
    const input = document.getElementById(
      emailInputId
    ) as HTMLInputElement | null;
    if (!input) {
      return;
    }
    input.scrollIntoView({
      behavior: shouldReduceMotion ? "auto" : "smooth",
      block: "center",
    });
    input.focus();
  };

  return (
    <section className="relative overflow-hidden">
      <FloatingDecor popKey={popKey} />
      <div
        className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,_rgba(143,203,233,0.35),_transparent_60%)]"
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <div className="mt-6 grid flex-1 items-center gap-10 lg:mt-0 lg:grid-cols-[1.05fr_1fr]">
          <div className="order-2 space-y-6 lg:order-1">
            <div className="space-y-0">
              <div className="flex items-center">
                <span className="relative flex h-[60px] w-[200px] items-center justify-start sm:h-[84px] sm:w-[260px] lg:h-[84px] lg:w-[240px] xl:h-[92px] xl:w-[260px]">
                  <Image
                    src="/images/numbeast-logo.png"
                    alt="Numbeast logo"
                    fill
                    sizes="(max-width: 640px) 200px, (max-width: 1024px) 260px, 260px"
                    className="object-contain"
                    priority
                  />
                </span>
              </div>

              <div className="-mt-2 space-y-4 sm:-mt-3 lg:-mt-4">
                <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-[var(--navy)] drop-shadow-[0_6px_16px_rgba(2,42,84,0.18)] sm:text-5xl lg:text-6xl">
                  Hatch. Feed. Evolve.
                </h1>
                <p className="max-w-xl text-base text-[rgba(2,42,84,0.75)] sm:text-lg">
                  A math adventure where kids grow elemental companions by
                  solving quick number challenges.
                </p>
              </div>
            </div>

            <EmailCapture
              onSuccess={() => setXpBoosted(true)}
              inputId={emailInputId}
            />

            <div className="flex flex-wrap gap-2">
              {supportChips.map((chip, index) => (
                <motion.span
                  key={chip}
                  className="rounded-full border border-[var(--border-soft)] bg-white/70 px-3 py-1 text-xs font-medium text-[rgba(2,42,84,0.85)] shadow-[0_6px_14px_rgba(2,42,84,0.08)]"
                  initial={
                    shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }
                  }
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: shouldReduceMotion ? 0 : 0.1 + index * 0.06,
                    duration: shouldReduceMotion ? 0 : 0.3,
                  }}
                >
                  {chip}
                </motion.span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-[var(--navy)]">
              <span>Email us:</span>
              <a
                href="mailto:info@numbeast.com"
                className="underline decoration-[rgba(2,42,84,0.35)] underline-offset-4 hover:decoration-[rgba(2,42,84,0.7)]"
              >
                info@numbeast.com
              </a>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <GameHudCard
              xpBoost={xpBoosted}
              onPrimaryAction={handleCtaClick}
            />
          </div>
        </div>

      </div>
    </section>
  );
}

