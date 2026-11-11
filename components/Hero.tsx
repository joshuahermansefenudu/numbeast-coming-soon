"use client";
import Image from "next/image";
import { useState, type CSSProperties } from "react";
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

export default function Hero() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <main className="launch-page">
      <header className="launch-header">
        <a href="/" aria-label="Numbeast home">
          <Image
            unoptimized
            className="wordmark"
            src="/adventure/logo.webp"
            alt="Numbeast"
            width={184}
            height={62}
            priority
          />
        </a>
      </header>
      <section className="game-hero" aria-labelledby="hero-title">
        <div className="giant-number" aria-hidden="true">
          01
        </div>
        <div className="hero-copy">
          <h1 id="hero-title">
            <span className="heading-first">RAISE A LITTLE</span>
            <span className="heading-last">LEGEND.</span>
          </h1>
          <p className="hero-description">
            Hatch a companion. Take on playful maths quests.
            <br className="desktop-break" /> Watch your little friend become
            something mighty.
          </p>
          <EmailCapture />
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
              aria-label={
                c.name + ", " + c.element.toLowerCase() + " companion"
              }
              onClick={() => setSelected((v) => (v === c.key ? null : c.key))}
            >
              <span className="card-heading">
                <strong>{c.name}</strong>
                <span>{c.number}</span>
              </span>
              <Image
                unoptimized
                src={"/adventure/" + c.key + "-stage-3.webp"}
                alt=""
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
          <p className="sr-only" aria-live="polite">
            {crew.find((c) => c.key === selected)?.fact ?? ""}
          </p>
        </div>
        <div
          className="featured-team"
          role="group"
          aria-label="Your Numbeast team"
        >
          <Image
            unoptimized
            className="hero-beast splashle-hero"
            src="/adventure/splashle-hero-v2.webp"
            alt="Splashle, a blue and green water guardian, leaping forward with an outstretched paw"
            width={1105}
            height={1423}
            sizes="(max-width:700px) 245px, (max-width:1150px) 350px, 440px"
            priority
          />
          <Image
            unoptimized
            className="hero-beast flamfox-hero"
            src="/adventure/flamfox-hero-v1.webp"
            alt="Flamfox, an orange fire-fox companion, standing confidently alongside Splashle"
            width={1105}
            height={1423}
            sizes="(max-width:700px) 190px, (max-width:1150px) 285px, 360px"
            priority
          />
        </div>
        <div className="quest-sticker" aria-hidden="true">
          <span className="sticker-kicker">A LITTLE CHALLENGE</span>
          <strong>7 + 5 = ?</strong>
          <span className="sticker-detail">
            <i>9</i>
            <i className="quest-answer">12 ✓</i>
            <i>14</i>
          </span>
        </div>
      </section>
    </main>
  );
}
