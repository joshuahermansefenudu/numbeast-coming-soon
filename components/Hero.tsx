"use client";
import Image from "next/image";
import { useState, type CSSProperties } from "react";
import EmailCapture from "./EmailCapture";
import useTouchHighlights from "./useTouchHighlights";

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

const eggs = [
  { family: "flamfox", size: 0.8, tilt: -13 },
  { family: "breeflap", size: 0.98, tilt: 9 },
  { family: "splashle", size: 0.86, tilt: -6 },
  { family: "rollie", size: 1.08, tilt: 7 },
  { family: "flamfox", size: 0.84, tilt: -10 },
  { family: "splashle", size: 1.02, tilt: 11 },
  { family: "breeflap", size: 0.9, tilt: -7 },
];

export default function Hero() {
  const rootRef = useTouchHighlights();
  const [selected, setSelected] = useState<string | null>(null);
  const [highlighted, setHighlighted] = useState<string | null>(null);
  const [solved, setSolved] = useState(false);

  return (
    <main className="launch-page" ref={rootRef}>
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
          data-touch-highlight="cards"
          aria-label="Meet the other elemental companions"
        >
          {crew.map((c, i) => (
            <button
              className="beast-card"
              key={c.key}
              style={
                {
                  "--card-color": c.color,
                  "--card-index": i,
                  "--card-layer": [1, 2, 0][i],
                } as CSSProperties
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
              <span className="card-element">{c.element}</span>
            </button>
          ))}
          <p className="sr-only" aria-live="polite">
            {crew.find((c) => c.key === selected)?.fact ?? ""}
          </p>
        </div>
        <div
          className="featured-team"
          data-touch-highlight="characters"
          role="group"
          aria-label="Your Numbeast team"
        >
          <div
            className="featured-character splashle-hero"
            data-selected={highlighted === "splashle"}
          >
            <Image
              unoptimized
              className="hero-beast"
              src="/adventure/splashle-hero-v2.webp"
              alt=""
              width={1105}
              height={1423}
              sizes="(max-width:700px) 245px, (max-width:1150px) 350px, 440px"
              priority
            />
            <button
              type="button"
              className="character-hit"
              aria-label="Highlight Splashle, water guardian"
              aria-pressed={highlighted === "splashle"}
              onClick={() =>
                setHighlighted((v) => (v === "splashle" ? null : "splashle"))
              }
            />
          </div>
          <div
            className="featured-character flamfox-hero"
            data-selected={highlighted === "flamfox"}
          >
            <Image
              unoptimized
              className="hero-beast"
              src="/adventure/flamfox-hero-v1.webp"
              alt=""
              width={1105}
              height={1423}
              sizes="(max-width:700px) 190px, (max-width:1150px) 285px, 360px"
              priority
            />
            <button
              type="button"
              className="character-hit"
              aria-label="Highlight Flamfox, fire companion"
              aria-pressed={highlighted === "flamfox"}
              onClick={() =>
                setHighlighted((v) => (v === "flamfox" ? null : "flamfox"))
              }
            />
          </div>
        </div>
        <button
          type="button"
          className="quest-sticker"
          data-touch-highlight="challenge"
          data-solved={solved}
          aria-pressed={solved}
          aria-label={
            solved
              ? "7 plus 5 equals 12. Reset challenge"
              : "7 plus 5. Reveal answer"
          }
          onClick={() => setSolved((value) => !value)}
        >
          <span className="sticker-kicker">A LITTLE CHALLENGE</span>
          <strong aria-hidden="true">
            7 + 5 ={" "}
            <span className="equation-answer">
              <span className="answer-prompt">?</span>
              <span className="answer-solution">12</span>
            </span>
          </strong>
          <span className="sticker-detail" aria-hidden="true">
            <span>9</span>
            <span className="quest-answer">
              12
              <svg className="answer-check" viewBox="0 0 12 12" fill="none">
                <path d="m2 6 2.5 2.5L10 3" />
              </svg>
            </span>
            <span>14</span>
          </span>
          <span className="sr-only" role="status">
            {solved ? "7 plus 5 equals 12" : ""}
          </span>
        </button>
      </section>
      <section className="growth-strip" aria-labelledby="growth-title">
        <Image
          unoptimized
          src="/adventure/camp.webp"
          alt=""
          fill
          sizes="(max-width:700px) 100vw, 80vw"
          className="growth-landscape"
        />
        <div className="growth-copy">
          <p>ONE LITTLE QUEST AT A TIME</p>
          <h2 id="growth-title">
            Little quests.<br />Mighty beasts.
          </h2>
        </div>
        <div className="egg-nest" aria-hidden="true">
          {eggs.map(({ family, size, tilt }, index) => (
            <span
              key={`${family}-${index}`}
              className="nest-egg"
              style={
                {
                  "--egg-index": index,
                  "--egg-size": size,
                  "--egg-tilt": `${tilt}deg`,
                } as CSSProperties
              }
            >
              <Image
                unoptimized
                src={`/adventure/egg-art/${family}.svg`}
                width={186}
                height={214}
                alt=""
              />
            </span>
          ))}
        </div>
        <svg
          className="nest-grass"
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            className="grass-back"
            d="M0 160Q200 157 360 149Q425 145 480 128L473 109 493 121 500 91 509 120 529 108 525 129Q570 116 615 123L610 98 627 113 638 84 641 112 659 100 656 126Q710 112 757 119L749 95 767 109 775 77 784 107 802 94 800 119Q845 104 890 116L884 86 901 103 914 72 916 102 938 84 931 116Q976 103 1028 112L1021 82 1040 98 1049 64 1057 98 1077 81 1071 111Q1114 100 1160 109L1152 79 1171 96 1184 66 1187 96 1207 82 1201 110Q1246 99 1292 112L1284 85 1303 101 1314 70 1320 102 1342 85 1334 114Q1380 102 1440 113V160Z"
          />
          <path
            className="grass-front"
            d="M0 160Q350 159 500 145Q578 132 652 144L649 128 662 139 674 116 677 140Q753 126 828 141L822 121 837 133 848 109 854 135Q924 125 997 140L992 118 1007 130 1019 109 1023 134Q1099 124 1171 139L1165 119 1182 133 1193 108 1198 135Q1270 124 1348 139L1341 117 1358 129 1369 107 1374 134Q1410 130 1440 138V160Z"
          />
        </svg>
      </section>
    </main>
  );
}
