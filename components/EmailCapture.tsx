"use client";
import { useRef, useState, type FormEvent } from "react";
import { validateEmail } from "../lib/validateEmail";
export default function EmailCapture() {
  const [status, setStatus] = useState<
      "idle" | "sending" | "success" | "error"
    >("idle"),
    [message, setMessage] = useState("");
  const busy = useRef(false);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy.current) return;
    const form = e.currentTarget,
      data = new FormData(form),
      email = String(data.get("email") ?? "").trim();
    if (!validateEmail(email)) {
      setStatus("error");
      setMessage("Please enter a valid parent or guardian email.");
      return;
    }
    busy.current = true;
    setStatus("sending");
    setMessage("");
    try {
      const r = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website: data.get("website") }),
      });
      if (!r.ok) throw Error();
      setStatus("success");
      setMessage(
        "You’re on the list! We’ll email you when the adventure is ready.",
      );
      form.reset();
    } catch {
      setStatus("error");
      setMessage("We couldn’t save your email. Please try again.");
    } finally {
      busy.current = false;
    }
  }
  return (
    <div className="waitlist" id="waitlist">
      <form onSubmit={submit} aria-describedby="signup-status">
        <label htmlFor="parent-email">
          A new adventure is coming. Be first to hear.
        </label>
        <div className="email-row">
          <input
            id="parent-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Parent or guardian email"
            required
            maxLength={254}
            disabled={status === "sending" || status === "success"}
            aria-invalid={status === "error"}
          />
          <button
            type="submit"
            disabled={status === "sending" || status === "success"}
          >
            {status === "sending"
              ? "Joining…"
              : status === "success"
                ? "You’re in! ✓"
                : "Join the adventure ↗"}
          </button>
        </div>
        <div className="honey" aria-hidden="true">
          <label htmlFor="company-website">Website</label>
          <input
            id="company-website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
        <p className="signup-note">
          For parents and guardians. Only Numbeast launch updates. Unsubscribe
          anytime.
        </p>
      </form>
      <p
        id="signup-status"
        className="signup-status"
        role={status === "error" ? "alert" : "status"}
      >
        {message}
      </p>
    </div>
  );
}
