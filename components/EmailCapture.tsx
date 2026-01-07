"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
} from "react";
import { validateEmail } from "../lib/validateEmail";

type EmailCaptureProps = {
  onSuccess?: () => void;
  inputId?: string;
};

const GOOGLE_FORM_ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLSfeWNU2BKbkaT3epCuppD2wRqHK801-GzoHtvGYr8ve9aAQ-g/formResponse";
const GOOGLE_FORM_ENTRY = "entry.632745447";

const confettiPieces = [
  { id: 1, left: "8%", color: "var(--cta-red)", x: "-12px", delay: "0ms" },
  { id: 2, left: "22%", color: "var(--warm-yellow)", x: "8px", delay: "80ms" },
  { id: 3, left: "36%", color: "var(--sky-blue)", x: "-6px", delay: "140ms" },
  { id: 4, left: "50%", color: "var(--cta-red)", x: "10px", delay: "40ms" },
  { id: 5, left: "64%", color: "var(--warm-yellow)", x: "-10px", delay: "120ms" },
  { id: 6, left: "78%", color: "var(--sky-blue)", x: "6px", delay: "60ms" },
  { id: 7, left: "90%", color: "var(--cta-red)", x: "-8px", delay: "100ms" },
];

type Status = "idle" | "loading" | "success" | "error";

export default function EmailCapture({
  onSuccess,
  inputId,
}: EmailCaptureProps) {
  const shouldReduceMotion = useReducedMotion();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const timeoutRef = useRef<number | null>(null);
  const fallbackInputId = useId();
  const resolvedInputId = inputId ?? fallbackInputId;
  const helpId = useId();
  const errorId = useId();
  const successId = useId();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setStatus("error");
      setMessage("Please enter a valid parent email address.");
      return;
    }

    if (status === "loading" || status === "success") {
      return;
    }

    setStatus("loading");
    setMessage("");

    const emailValue = email.trim();

    timeoutRef.current = window.setTimeout(() => {
      const submitEmail = async () => {
        try {
          try {
            window.localStorage.setItem("numbeast_waitlist_email", emailValue);
          } catch (error) {
            console.error("LocalStorage unavailable", error);
          }

          const formData = new FormData();
          formData.append(GOOGLE_FORM_ENTRY, emailValue);
          await fetch(GOOGLE_FORM_ACTION, {
            method: "POST",
            mode: "no-cors",
            body: formData,
          });

          setStatus("success");
          onSuccess?.();
        } catch (error) {
          console.error("Google Form submission failed", error);
          setStatus("error");
          setMessage("Something went wrong. Please try again.");
        }
      };

      void submitEmail();
    }, 600);
  };

  const isDisabled = status === "loading" || status === "success";

  return (
    <div className="relative" id="waitlist">
      <form
        onSubmit={handleSubmit}
        className="rounded-[24px] border border-[var(--border-soft)] bg-white p-4 shadow-hud sm:p-5"
      >
        <label
          htmlFor={resolvedInputId}
          className="text-sm font-semibold text-[rgba(2,42,84,0.85)]"
        >
          Get launch updates
        </label>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <input
            id={resolvedInputId}
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="Parent email address"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (status === "error") {
                setStatus("idle");
              }
            }}
            disabled={isDisabled}
            aria-invalid={status === "error"}
            aria-describedby={`${helpId}${status === "error" ? ` ${errorId}` : ""}${
              status === "success" ? ` ${successId}` : ""
            }`}
            className="w-full flex-1 rounded-[20px] border border-[var(--border-soft)] bg-white px-4 py-3 text-sm text-[var(--navy)] placeholder:text-[rgba(2,42,84,0.45)] shadow-[0_8px_18px_rgba(2,42,84,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sky-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:opacity-70"
          />
          <button
            type="submit"
            disabled={isDisabled}
            className="flex w-full items-center justify-center rounded-[20px] bg-[var(--cta-red)] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_18px_rgba(233,73,85,0.35)] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cta-red)] focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
          >
            {status === "loading" ? "Joining..." : "Join the Hatch List 🍎"}
          </button>
        </div>
        <p
          id={helpId}
          className="mt-2 text-xs text-[rgba(2,42,84,0.65)]"
        >
          Launch updates only. No ads. Ever.
        </p>
      </form>

      {status === "error" && (
        <p
          id={errorId}
          role="alert"
          className="mt-2 text-sm font-medium text-[var(--cta-red)]"
        >
          {message}
        </p>
      )}

      {status === "success" && (
        <motion.div
          id={successId}
          role="status"
          className="mt-3 inline-flex items-center rounded-full border border-[var(--border-soft)] bg-[rgba(255,209,102,0.35)] px-3 py-1 text-xs font-semibold text-[var(--navy)]"
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          +10 XP — You’re on the list!
        </motion.div>
      )}

      {status === "success" && !shouldReduceMotion && (
        <div className="confetti" aria-hidden="true">
          {confettiPieces.map((piece) => (
            <span
              key={piece.id}
              className="confetti-piece"
              style={
                {
                  left: piece.left,
                  backgroundColor: piece.color,
                  animationDelay: piece.delay,
                  "--x": piece.x,
                } as CSSProperties
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
