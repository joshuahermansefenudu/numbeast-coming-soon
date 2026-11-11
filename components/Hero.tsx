"use client";
import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import EmailCapture from "./EmailCapture";

const crew = [
  {
    key: "flamfox",
    name: "Flamfox",
    element: "FIRE",
    number: "02",
    color: "#F5A25C",
    fact: "A fiery friend with a big spark.",
  },
  {
    key: "rollie",
    name: "Rollie",
    element: "EARTH",
    number: "03",
    color: "#B9D781",
    fact: "Small steps. Rock-solid teamwork.",
  },
  {
    key: "breeflap",
    name: "Breeflap",
    element: "AIR",
    number: "04",
    color: "#A5D9DC",
    fact: "A curious mind. A soaring spirit.",
  },
];
const scenes = [
  "Solve a little maths",
  "Earn a little power",
  "Unlock the next adventure",
];
export default function Hero() {
  const [phase, setPhase] = useState(0),
    [paused, setPaused] = useState(false),
    [watch, setWatch] = useState(false),
    [ready, setReady] = useState(false),
    [selected, setSelected] = useState<string | null>(null);
  const dialog = useRef<HTMLDialogElement>(null),
    iframe = useRef<HTMLIFrameElement>(null),
    stage = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    if (paused || watch || reduced.matches) return;
    const id = setInterval(() => {
      if (!document.hidden) setPhase((v) => (v + 1) % 3);
    }, 3600);
    return () => clearInterval(id);
  }, [paused, watch]);
  useEffect(() => {
    function message(e: MessageEvent) {
      if (
        e.origin === location.origin &&
        e.source === iframe.current?.contentWindow &&
        e.data?.type === "numbeast-ready"
      )
        setReady(true);
    }
    addEventListener("message", message);
    return () => removeEventListener("message", message);
  }, []);
  function open() {
    setReady(false);
    setWatch(true);
    dialog.current?.showModal();
  }
  function close() {
    iframe.current?.contentWindow?.postMessage(
      { type: "numbeast-stop" },
      location.origin,
    );
    dialog.current?.close();
    setWatch(false);
  }
  function move(e: React.PointerEvent<HTMLDivElement>) {
    if (
      e.pointerType !== "mouse" ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty(
      "--mx",
      ((e.clientX - r.left) / r.width - 0.5) * 8 + "px",
    );
    e.currentTarget.style.setProperty(
      "--my",
      ((e.clientY - r.top) / r.height - 0.5) * 6 + "px",
    );
  }
  return (
    <main className="launch-page">
      <header className="launch-header">
        <a href="/" aria-label="Numbeast home">
          <Image
            unoptimized
            className="wordmark"
            src="/adventure/logo.webp"
            alt="Numbeast"
            width={210}
            height={62}
            priority
          />
        </a>
        <span className="header-caption">
          A little maths. A lot of adventure.
        </span>
        <a className="header-signup" href="#waitlist">
          Get launch updates <span aria-hidden="true">↗</span>
        </a>
      </header>
      <section
        className="game-hero"
        aria-labelledby="hero-title"
        data-phase={phase}
        data-paused={paused}
        ref={stage}
        onPointerMove={move}
        onPointerLeave={() => {
          stage.current?.style.setProperty("--mx", "0px");
          stage.current?.style.setProperty("--my", "0px");
        }}
      >
        <div className="hero-stripes" aria-hidden="true" />
        <div className="giant-number" aria-hidden="true">
          01
        </div>
        <div className="hero-copy">
          <p className="eyebrow">
            <span aria-hidden="true">✦</span> MATHS QUESTS. ELEMENTAL FRIENDS.
            AGES 7–12.
          </p>
          <h1 id="hero-title">
            <span className="heading-first">RAISE A LITTLE</span>
            <span className="heading-last">LEGEND.</span>
          </h1>
          <p className="hero-description">
            Hatch a companion. Take on playful maths quests.
            <br className="desktop-break" /> Watch your little friend become
            something mighty.
          </p>
          <div className="hero-actions">
            <a className="join-button" href="#waitlist">
              Join the adventure <span aria-hidden="true">↗</span>
            </a>
            <button className="watch-button" onClick={open}>
              <span className="play-ring" aria-hidden="true">
                ▶
              </span>
              Watch a quest
            </button>
          </div>
        </div>
        <div
          className="crew-deck"
          aria-label="Meet the other elemental companions"
        >
          {crew.map((c, i) => (
            <button
              className="beast-card"
              key={c.key}
              style={
                { "--card-color": c.color, "--card-index": i } as CSSProperties
              }
              data-selected={selected === c.key}
              aria-pressed={selected === c.key}
              onClick={() => setSelected((v) => (v === c.key ? null : c.key))}
            >
              <span className="card-heading">
                <strong>{c.name}</strong>
                <span>{c.number}</span>
              </span>
              <Image
                unoptimized
                src={`/adventure/${c.key}-stage-3.webp`}
                alt={c.name + " " + c.element.toLowerCase() + " companion"}
                width={270}
                height={340}
                sizes="(max-width:700px) 105px, 160px"
                className="card-beast"
              />
              <span className="card-element">
                {c.element}
                <span aria-hidden="true">✦</span>
              </span>
            </button>
          ))}
          <p className="crew-caption" aria-live="polite">
            {selected
              ? crew.find((c) => c.key === selected)?.fact
              : "FOUR ELEMENTS. ONE EXTRAORDINARY FRIENDSHIP."}
          </p>
        </div>
        <div className="featured-beast">
          <span className="orbit orbit-one" aria-hidden="true" />
          <span className="orbit orbit-two" aria-hidden="true" />
          <Image
            unoptimized
            className="splashle-hero"
            src="/adventure/splashle-hero-v2.webp"
            alt="Splashle, a blue and green water guardian, leaping forward with an outstretched paw"
            width={1090}
            height={1440}
            sizes="(max-width:700px) 310px, (max-width:1100px) 430px, 580px"
            quality={85}
            priority
          />
          <span className="beast-label">
            <span className="label-dot" />
            SPLASHLE <small>WATER GUARDIAN / NO. 01</small>
          </span>
        </div>
        <div className="quest-sticker" key={phase} aria-hidden="true">
          <span className="sticker-kicker">
            {phase === 0
              ? "A LITTLE CHALLENGE"
              : phase === 1
                ? "QUEST COMPLETE"
                : "THE NEXT CHAPTER"}
          </span>
          <strong>
            {phase === 0
              ? "7 + 5 = ?"
              : phase === 1
                ? "+10 XP"
                : "New path. New possibilities."}
          </strong>
          <span className="sticker-detail">
            {phase === 0 ? (
              <>
                <i>9</i>
                <i className="quest-answer">12 ✓</i>
                <i>14</i>
              </>
            ) : phase === 1 ? (
              "A little practice. A little stronger."
            ) : (
              "Your adventure keeps growing."
            )}
          </span>
        </div>
        <div className="hero-bottom">
          <span className="scene-label">
            <i /> {scenes[phase]}
          </span>
          <button
            className="motion-button"
            onClick={() => setPaused((v) => !v)}
            aria-label={paused ? "Play hero animation" : "Pause hero animation"}
          >
            {paused ? "▶" : "Ⅱ"}
          </button>
        </div>
      </section>
      <section className="signup-section" aria-label="Parent launch updates">
        <div className="signup-copy">
          <p className="eyebrow">YOUR NEXT ADVENTURE IS COMING</p>
          <h2>Let the adventure find your inbox.</h2>
        </div>
        <EmailCapture />
      </section>
      <footer className="launch-footer">
        <span>Made for curious minds. Built around play.</span>
        <a href="mailto:info@numbeast.com">Say hello ↗</a>
      </footer>
      <dialog
        ref={dialog}
        className="journey-dialog"
        onCancel={close}
        onClick={(e) => {
          if (e.target === dialog.current) close();
        }}
      >
        <div className="journey-heading">
          <strong>Your first Numbeast adventure</strong>
          <button onClick={close} aria-label="Close adventure">
            ×
          </button>
        </div>
        <div className="journey-modal-body">
          <div className="modal-device">
            {watch && (
              <iframe
                ref={iframe}
                src="/game/index.html"
                title="Numbeast playable adventure"
                allow="autoplay"
              />
            )}
            <Image
              unoptimized
              src="/adventure/device.webp"
              alt=""
              width={443}
              height={900}
              aria-hidden="true"
            />
          </div>
          <div>
            <p className="eyebrow">CHOOSE. SOLVE. EXPLORE.</p>
            <h2>
              Come on.
              <br />
              Let’s explore.
            </h2>
            <p>
              A friendly voice, three maths quests and your beast’s first
              evolution. Follow the entire adventure, from the very first
              screen.
            </p>
            <button
              className="join-button"
              disabled={!ready}
              onClick={() =>
                iframe.current?.contentWindow?.postMessage(
                  { type: "numbeast-start", sound: true },
                  location.origin,
                )
              }
            >
              {ready ? "▶ Play with sound" : "Getting the adventure ready…"}
            </button>
            <p className="modal-help">
              You can also tap the phone and explore for yourself.
            </p>
          </div>
        </div>
      </dialog>
    </main>
  );
}
