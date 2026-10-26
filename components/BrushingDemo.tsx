"use client";

import { useEffect, useState } from "react";

const INK = "#20303A";

/** Zonele gurii, în ordinea periajului. x/y = poziția periuței în desen. */
const zones = [
  { label: "Sus, în stânga", text: "Mișcări mici, în cerc, pe fiecare dinte. Numărăm până la 10.", x: 62, y: 58 },
  { label: "Sus, în dreapta", text: "Nu uita măselele din spate, acolo se ascund firimiturile.", x: 168, y: 58 },
  { label: "Jos, în stânga", text: "Periuța înclinată spre gingie, ușor, fără să apeși tare.", x: 62, y: 118 },
  { label: "Jos, în dreapta", text: "Periem și partea dinspre limbă a dinților.", x: 168, y: 118 },
  { label: "Limba", text: "La final, câteva mișcări ușoare pe limbă, pentru o respirație proaspătă.", x: 115, y: 90 },
];
const STEP_MS = 2600;

/** Microbii fictivi care dispar când zona lor e periată. */
const germs = [
  { zone: 0, x: 70, y: 52 },
  { zone: 1, x: 182, y: 50 },
  { zone: 2, x: 58, y: 128 },
  { zone: 3, x: 176, y: 130 },
  { zone: 4, x: 128, y: 92 },
];

function Teeth({ y, flip }: { y: number; flip?: boolean }) {
  const xs = [36, 66, 96, 126, 156, 186];
  return (
    <g>
      {xs.map((x) => (
        <rect
          key={x}
          x={x}
          y={flip ? y - 30 : y}
          width="26"
          height="30"
          rx="9"
          fill="#fff"
          stroke={INK}
          strokeWidth="3"
        />
      ))}
    </g>
  );
}

function Germ({ x, y, gone }: { x: number; y: number; gone: boolean }) {
  return (
    <g className={`demo__germ${gone ? " demo__germ--gone" : ""}`} transform={`translate(${x} ${y})`}>
      <path
        d="M0-9c4-4 9 0 8 4 5 0 6 7 2 9 2 5-4 8-7 5-3 4-10 2-9-3-5-1-5-8 0-9-1-5 4-8 6-6Z"
        fill="#8BCF6A"
        stroke={INK}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="-3" cy="-1" r="1.6" fill={INK} />
      <circle cx="3" cy="-1" r="1.6" fill={INK} />
      <path d="M-3 4q3-2 6 0" fill="none" stroke={INK} strokeWidth="1.6" strokeLinecap="round" />
    </g>
  );
}

/**
 * Demonstrație animată de periaj: periuța trece prin fiecare zonă,
 * microbii dispar, iar pașii sunt anunțați și în text (aria-live).
 * Pornește doar la cerere și se poate opri oricând.
 */
export function BrushingDemo() {
  const [step, setStep] = useState(-1); // -1 = nepornit; zones.length = gata
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setStep((s) => {
        const next = s + 1;
        if (next >= zones.length) {
          setPlaying(false);
          return zones.length;
        }
        return next;
      });
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [playing]);

  const done = step >= zones.length;
  const current = step >= 0 && !done ? zones[step] : null;
  const brush = current ?? { x: 115, y: 160 };

  function toggle() {
    if (playing) {
      setPlaying(false);
      return;
    }
    if (step === -1 || done) setStep(0);
    setPlaying(true);
  }

  const buttonLabel = playing ? "Pauză" : done ? "Încă o dată" : step === -1 ? "Pornește periajul" : "Continuă";

  return (
    <div className={`demo${playing ? " demo--playing" : ""}`}>
      <div className="demo__stage">
        <svg viewBox="0 0 250 190" className="demo__svg" aria-hidden="true" focusable="false">
          <rect x="14" y="20" width="222" height="150" rx="70" fill="#FF7A6B" stroke={INK} strokeWidth="3.5" />
          <rect x="28" y="30" width="194" height="130" rx="60" fill="#A8392D" />
          <ellipse cx="125" cy="98" rx="52" ry="16" fill="#FF9C90" stroke={INK} strokeWidth="2.5" />
          <Teeth y={38} />
          <Teeth y={152} flip />
          {germs.map((g) => (
            <Germ key={g.zone} x={g.x} y={g.y} gone={step > g.zone || done} />
          ))}
          {done && (
            <g className="demo__shine">
              <path d="M200 26c1 6 4 9 10 10-6 1-9 4-10 10-1-6-4-9-10-10 6-1 9-4 10-10Z" fill="#FFC93C" stroke={INK} strokeWidth="2" />
              <path d="M44 150c1 5 3 7 8 8-5 1-7 3-8 8-1-5-3-7-8-8 5-1 7-3 8-8Z" fill="#fff" stroke={INK} strokeWidth="2" />
            </g>
          )}
          {/* periuța */}
          <g className="demo__brush" style={{ transform: `translate(${brush.x}px, ${brush.y}px)` }}>
            <g className="demo__scrub">
              <rect x="-8" y="-10" width="30" height="16" rx="5" fill="#fff" stroke={INK} strokeWidth="2.5" />
              <path d="M-4-10v-7M2-10v-7M8-10v-7M14-10v-7M19-10v-6" stroke="#1AA6A6" strokeWidth="3" strokeLinecap="round" />
              <rect x="18" y="-6" width="64" height="12" rx="6" fill="#1AA6A6" stroke={INK} strokeWidth="2.5" />
              {playing && (
                <g fill="#fff" stroke={INK} strokeWidth="1.5" className="demo__foam">
                  <circle cx="-10" cy="-18" r="4" />
                  <circle cx="0" cy="-24" r="3" />
                  <circle cx="12" cy="-22" r="4.5" />
                </g>
              )}
            </g>
          </g>
        </svg>
      </div>

      <div className="demo__panel">
        <ol className="demo__steps">
          {zones.map((z, i) => (
            <li
              key={z.label}
              className={i === step ? "is-current" : i < step || done ? "is-done" : undefined}
              aria-current={i === step ? "step" : undefined}
            >
              {z.label}
            </li>
          ))}
        </ol>
        <p className="demo__status" aria-live="polite">
          {done
            ? "Gata! Toți microbii au plecat. Un periaj complet durează 2 minute, de două ori pe zi."
            : current
              ? `${current.label}: ${current.text}`
              : "Apasă butonul și urmărește periuța. Fiecare zonă primește atenție."}
        </p>
        <button type="button" className="btn btn--sun" onClick={toggle} aria-pressed={playing}>
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}
