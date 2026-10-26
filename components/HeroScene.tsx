import { BrushMascot, Bubble, DentistMascot, Sparkle, ToothMascot } from "./illustrations/Mascots";

/** Scena animată din hero: personajele plutesc ușor, steluțele sclipesc, bulele urcă. */
export function HeroScene() {
  return (
    <div className="scene" role="img" aria-label="Dințișor, Periuța și Doctorița Zâmbet îți fac cu mâna">
      <svg className="scene__blob" viewBox="0 0 400 340" aria-hidden="true" focusable="false">
        <path
          d="M206 14c84 0 176 40 182 136 6 104-80 178-186 178S10 268 14 168C18 70 112 14 206 14Z"
          fill="#BFE7E4"
        />
        <path d="M60 280q140 40 290-6" fill="none" stroke="#1AA6A6" strokeWidth="6" strokeLinecap="round" strokeDasharray="2 16" />
      </svg>
      <div className="scene__item scene__brush float" style={{ "--dur": "4.2s", "--delay": "-1s", "--tilt": "-6deg" } as React.CSSProperties}>
        <BrushMascot />
      </div>
      <div className="scene__item scene__tooth float" style={{ "--dur": "3.6s", "--tilt": "3deg" } as React.CSSProperties}>
        <ToothMascot />
      </div>
      <div className="scene__item scene__dentist float" style={{ "--dur": "4.8s", "--delay": "-2s", "--tilt": "4deg" } as React.CSSProperties}>
        <DentistMascot />
      </div>
      <Sparkle className="scene__spark scene__spark--1 twinkle" />
      <Sparkle className="scene__spark scene__spark--2 twinkle" color="#FF7A6B" />
      <Sparkle className="scene__spark scene__spark--3 twinkle" color="#fff" />
      <Bubble className="scene__bubble scene__bubble--1 bubble-rise" />
      <Bubble className="scene__bubble scene__bubble--2 bubble-rise" />
      <Bubble className="scene__bubble scene__bubble--3 bubble-rise" />
    </div>
  );
}
