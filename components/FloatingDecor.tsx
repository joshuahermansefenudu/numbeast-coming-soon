"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";

type DecorItem = {
  id: string;
  type: "emoji" | "dot";
  content?: string;
  top: string;
  left?: string;
  right?: string;
  size: number;
  color?: string;
  delay: number;
};

const decorItems: DecorItem[] = [
  {
    id: "apple-1",
    type: "emoji",
    content: "🍎",
    top: "12%",
    left: "6%",
    size: 18,
    delay: 0,
  },
  {
    id: "spark-1",
    type: "emoji",
    content: "✦",
    top: "16%",
    right: "12%",
    size: 18,
    color: "var(--warm-yellow)",
    delay: 0.4,
  },
  {
    id: "spark-2",
    type: "emoji",
    content: "✦",
    top: "72%",
    right: "6%",
    size: 16,
    color: "var(--cta-red)",
    delay: 0.2,
  },
  {
    id: "apple-2",
    type: "emoji",
    content: "🍎",
    top: "68%",
    left: "10%",
    size: 16,
    delay: 0.6,
  },
  {
    id: "dot-1",
    type: "dot",
    top: "30%",
    left: "22%",
    size: 10,
    color: "var(--sky-blue)",
    delay: 0.3,
  },
  {
    id: "dot-2",
    type: "dot",
    top: "52%",
    right: "20%",
    size: 12,
    color: "var(--warm-yellow)",
    delay: 0.5,
  },
];

type FloatingDecorProps = {
  popKey?: number;
};

export default function FloatingDecor({ popKey = 0 }: FloatingDecorProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className="pointer-events-none absolute inset-0 z-30 overflow-hidden"
      aria-hidden="true"
    >
      {decorItems.map((item, index) => (
        <motion.div
          key={item.id}
          className="absolute"
          style={{ top: item.top, left: item.left, right: item.right }}
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  y: [0, -6, 0],
                  x: [0, 4, 0],
                }
          }
          transition={
            shouldReduceMotion
              ? undefined
              : {
                  duration: 4 + index * 0.4,
                  delay: item.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
        >
          {item.type === "emoji" ? (
            <span
              className="block drop-shadow-[0_6px_12px_rgba(2,42,84,0.12)]"
              style={{
                fontSize: item.size,
                color: item.color,
              }}
            >
              {item.content}
            </span>
          ) : (
            <span
              className="block rounded-full"
              style={
                {
                  width: item.size,
                  height: item.size,
                  backgroundColor: item.color,
                  opacity: 0.5,
                } as CSSProperties
              }
            />
          )}
        </motion.div>
      ))}

      <motion.div
        key={`pop-${popKey}`}
        className="pointer-events-none fixed bottom-0 left-[32%] w-[120%] max-w-[1500px] -translate-x-1/2 origin-bottom rotate-[45deg] sm:absolute sm:bottom-0 sm:left-1/2"
        initial={
          shouldReduceMotion
            ? { y: "40%", opacity: 1 }
            : { y: "120%", opacity: 0 }
        }
        animate={
          shouldReduceMotion
            ? { y: "40%", opacity: 1 }
            : { y: ["120%", "40%", "40%", "120%"], opacity: [0, 1, 1, 0] }
        }
        transition={
          shouldReduceMotion
            ? undefined
            : {
                duration: 7,
                delay: 0.1,
                ease: "easeInOut",
                times: [0, 0.12, 0.7, 1],
              }
        }
      >
        <div className="relative w-full aspect-[4/3]">
          <Image
            src="/images/numbeast-pop.png"
            alt="Numbeast character peeking"
            fill
            sizes="(max-width: 640px) 112px, (max-width: 1024px) 144px, 176px"
            className="object-contain drop-shadow-[0_10px_22px_rgba(2,42,84,0.2)]"
          />
        </div>
      </motion.div>
    </div>
  );
}
