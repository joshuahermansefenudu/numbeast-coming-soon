"use client";

import Image from "next/image";
import { motion, useAnimationControls, useReducedMotion } from "framer-motion";

// Asset note (one-time):
// Copy-Item "/mnt/data/numbeast group.png" "public/images/numbeast-group.png"
// Copy-Item "/mnt/data/Paw.png" "public/images/paw-reference.png"

type GameHudCardProps = {
  xpBoost?: boolean;
  onPrimaryAction?: () => void;
};

type ProgressBarProps = {
  label: string;
  value: number;
  max: number;
  color: string;
  boost?: boolean;
};

function ProgressBar({ label, value, max, color, boost }: ProgressBarProps) {
  const shouldReduceMotion = useReducedMotion();
  const rawPct = Math.min(value / max, 1);
  const basePct = rawPct >= 1 ? 0.92 : rawPct;
  const targetPct = Math.min(basePct + (boost ? 0.05 : 0), 1);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs font-semibold text-[rgba(2,42,84,0.75)]">
        <span>{label}</span>
        <span className="font-numbers">
          {value} / {max}
        </span>
      </div>
      <div className="h-4 w-full rounded-full bg-[rgba(2,42,84,0.08)] p-1">
        <div className="h-full w-full overflow-hidden rounded-full">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: color }}
            initial={shouldReduceMotion ? false : { width: 0 }}
            animate={{ width: `${targetPct * 100}%` }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.8,
              ease: "easeOut",
            }}
          />
        </div>
      </div>
    </div>
  );
}

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 3l2.2 5.8L20 11l-5.8 2.2L12 19l-2.2-5.8L4 11l5.8-2.2L12 3z" />
      <path d="M4 20l.7-1.8L7 17l-1.8-.7L4 14l-.7 1.8L1 17l1.8.7L4 20z" />
    </svg>
  );
}

export default function GameHudCard({
  xpBoost,
  onPrimaryAction,
}: GameHudCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const clickControls = useAnimationControls();

  const handlePrimaryClick = () => {
    if (!shouldReduceMotion) {
      clickControls.start({
        scale: [1, 1.06, 0.98, 1],
        y: [0, -2, 0],
        transition: { duration: 0.35, ease: "easeOut" },
      });
    }
    onPrimaryAction?.();
  };

  return (
    <div className="relative mx-auto w-full max-w-lg">
      <div className="absolute -top-4 left-6 origin-left -rotate-2 rounded-full bg-[var(--cta-red)] px-4 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow-[0_8px_18px_rgba(233,73,85,0.35)]">
        Coming Soon
      </div>

      <div className="rounded-[24px] border border-[var(--border-soft)] bg-white p-6 shadow-hud sm:p-7">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-[rgba(255,209,102,0.35)] px-3 py-1 text-xs font-semibold text-[var(--navy)]">
            Youngling
          </span>
          <span className="rounded-full bg-[rgba(143,203,233,0.35)] px-3 py-1 text-xs font-semibold text-[var(--navy)]">
            ?? <span className="font-numbers">435</span>
          </span>
        </div>

        <motion.div
          className="relative mx-auto mt-6 h-56 w-full sm:h-64"
          animate={shouldReduceMotion ? undefined : { y: [-4, 4, -4] }}
          transition={
            shouldReduceMotion
              ? undefined
              : { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <Image
            src="/images/numbeast-group.png"
            alt="Four elemental Numbeast companions"
            fill
            priority
            sizes="(max-width: 768px) 90vw, 420px"
            className="object-contain rounded-[18px] drop-shadow-[0_12px_24px_rgba(2,42,84,0.18)]"
          />
        </motion.div>

        <div className="mt-6 space-y-4">
          <ProgressBar
            label="XP"
            value={1300}
            max={1200}
            color="var(--warm-yellow)"
            boost={xpBoost}
          />
          <ProgressBar
            label="Hunger"
            value={90}
            max={100}
            color="var(--sky-blue)"
          />
        </div>

        <motion.div animate={clickControls}>
          <motion.button
            type="button"
            onClick={handlePrimaryClick}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-[20px] bg-[var(--warm-yellow)] px-6 py-4 text-base font-semibold text-[var(--navy)] shadow-[0_10px_18px_rgba(255,209,102,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--warm-yellow)] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            whileHover={shouldReduceMotion ? undefined : { scale: 1.01 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    boxShadow: [
                      "0 10px 18px rgba(255,209,102,0.3)",
                      "0 12px 22px rgba(255,209,102,0.45)",
                      "0 10px 18px rgba(255,209,102,0.3)",
                    ],
                  }
            }
            transition={
              shouldReduceMotion
                ? undefined
                : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
            }
          >
            <span>Summon Rollie!</span>
            <SparkleIcon className="h-5 w-5" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

