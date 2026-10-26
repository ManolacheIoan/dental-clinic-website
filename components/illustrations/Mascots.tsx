/**
 * Personajele clinicii, desenate de mână în SVG, în același stil:
 * contur închis rotunjit, culori plate, obraji roz.
 *  - Dințișor (dintele zâmbăreț)
 *  - Periuța (periuța de dinți cu peri colorați)
 *  - Doctorița Zâmbet (micuța doctoriță)
 */

const INK = "#20303A";
const CHEEK = "#FF7A6B";

type Props = {
  className?: string;
  /** Text alternativ; fără el, desenul e decorativ (ascuns de cititoarele de ecran). */
  label?: string;
};

function a11y(label?: string) {
  return label ? { role: "img", "aria-label": label } : { "aria-hidden": true as const, focusable: "false" as const };
}

/** Conturul de dinte folosit peste tot (viewBox 0 0 100 110). */
export const TOOTH_PATH =
  "M50 14C38 5 14 7 14 33c0 17 8 25 10 41 2 18 6 30 14 30s6-20 12-20 4 20 12 20 12-12 14-30c2-16 10-24 10-41 0-26-24-28-36-19Z";

function Eyes({ y = 44, dx = 12, cx = 50 }: { y?: number; dx?: number; cx?: number }) {
  return (
    <g>
      <ellipse cx={cx - dx} cy={y} rx="4.2" ry="5.4" fill={INK} />
      <ellipse cx={cx + dx} cy={y} rx="4.2" ry="5.4" fill={INK} />
      <circle cx={cx - dx + 1.4} cy={y - 2} r="1.5" fill="#fff" />
      <circle cx={cx + dx + 1.4} cy={y - 2} r="1.5" fill="#fff" />
    </g>
  );
}

function Cheeks({ y = 55, dx = 21, cx = 50 }: { y?: number; dx?: number; cx?: number }) {
  return (
    <g fill={CHEEK} opacity="0.55">
      <ellipse cx={cx - dx} cy={y} rx="5.5" ry="3.5" />
      <ellipse cx={cx + dx} cy={y} rx="5.5" ry="3.5" />
    </g>
  );
}

/** Dințișor: dintele zâmbăreț. Variante de expresie pentru 404 și stări goale. */
export function ToothMascot({
  className,
  label,
  mood = "happy",
}: Props & { mood?: "happy" | "surprised" | "wink" }) {
  return (
    <svg viewBox="0 0 100 110" className={className} {...a11y(label)}>
      <path d={TOOTH_PATH} fill="#fff" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
      <path d="M25 30c1-9 7-13 14-13" fill="none" stroke="#BFE7E4" strokeWidth="5" strokeLinecap="round" />
      {mood === "wink" ? (
        <g>
          <path d="M33 44q5-5 10 0" fill="none" stroke={INK} strokeWidth="3.5" strokeLinecap="round" />
          <ellipse cx="62" cy="44" rx="4.2" ry="5.4" fill={INK} />
          <circle cx="63.4" cy="42" r="1.5" fill="#fff" />
        </g>
      ) : (
        <Eyes />
      )}
      <Cheeks />
      {mood === "surprised" ? (
        <ellipse cx="50" cy="61" rx="5" ry="6" fill={INK} />
      ) : (
        <g>
          <path d="M37 57q13 15 26 0Z" fill={INK} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
          <path d="M43 63.5q7 4 14 0" fill="none" stroke={CHEEK} strokeWidth="3" strokeLinecap="round" />
        </g>
      )}
    </svg>
  );
}

/** Periuța: periuță de dinți cu perii pe post de freză colorată. */
export function BrushMascot({ className, label }: Props) {
  return (
    <svg viewBox="0 0 100 150" className={className} {...a11y(label)}>
      {/* peri */}
      <g stroke={INK} strokeWidth="3.5" strokeLinejoin="round">
        <rect x="27" y="8" width="11" height="26" rx="5.5" fill="#FF7A6B" />
        <rect x="39" y="4" width="11" height="30" rx="5.5" fill="#FFC93C" />
        <rect x="51" y="4" width="11" height="30" rx="5.5" fill="#BFE7E4" />
        <rect x="63" y="8" width="11" height="26" rx="5.5" fill="#FF7A6B" />
      </g>
      {/* corp */}
      <rect x="22" y="30" width="56" height="112" rx="26" fill="#1AA6A6" stroke={INK} strokeWidth="4" />
      <rect x="32" y="96" width="36" height="34" rx="16" fill="#0E7676" opacity="0.35" />
      {/* brațe */}
      <path d="M22 82c-9 2-14 8-15 16" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" />
      <path d="M78 82c9-1 14-8 15-16" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" />
      <circle cx="7" cy="100" r="5" fill="#fff" stroke={INK} strokeWidth="3.5" />
      <circle cx="93" cy="64" r="5" fill="#fff" stroke={INK} strokeWidth="3.5" />
      {/* față */}
      <g transform="translate(0 16)">
        <ellipse cx="40" cy="44" rx="6.5" ry="7.5" fill="#fff" />
        <ellipse cx="60" cy="44" rx="6.5" ry="7.5" fill="#fff" />
        <Eyes y={45} dx={10} />
        <Cheeks y={57} dx={19} />
        <path d="M41 58q9 9 18 0" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" />
      </g>
    </svg>
  );
}

/** Doctorița Zâmbet: micuța doctoriță cu oglindă frontală. */
export function DentistMascot({ className, label }: Props) {
  return (
    <svg viewBox="0 0 120 150" className={className} {...a11y(label)}>
      {/* corp — halat turcoaz */}
      <path
        d="M24 146c0-34 12-52 36-52s36 18 36 52Z"
        fill="#1AA6A6"
        stroke={INK}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path d="M48 96l12 16 12-16" fill="#fff" stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
      <rect x="70" y="118" width="14" height="12" rx="3" fill="#fff" stroke={INK} strokeWidth="3" />
      {/* oglinjoară dentară în mână */}
      <path d="M28 132l-14-26" stroke={INK} strokeWidth="4" strokeLinecap="round" />
      <circle cx="12" cy="102" r="7" fill="#BFE7E4" stroke={INK} strokeWidth="3.5" />
      <circle cx="30" cy="134" r="6" fill="#F4C7A5" stroke={INK} strokeWidth="3.5" />
      {/* cap */}
      <circle cx="60" cy="58" r="32" fill="#F4C7A5" stroke={INK} strokeWidth="4" />
      {/* păr */}
      <path
        d="M28 56c-2-22 14-34 32-34s34 12 32 34c-6-10-14-14-22-15-6 6-18 9-30 8-6 1-10 3-12 7Z"
        fill="#7A4B2A"
        stroke={INK}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <circle cx="92" cy="40" r="9" fill="#7A4B2A" stroke={INK} strokeWidth="4" />
      {/* oglindă frontală */}
      <path d="M32 38q28-16 56 0" fill="none" stroke={INK} strokeWidth="3.5" />
      <circle cx="60" cy="27" r="9" fill="#FFC93C" stroke={INK} strokeWidth="3.5" />
      <circle cx="57" cy="24" r="2.5" fill="#fff" />
      {/* față */}
      <Eyes y={60} dx={11} cx={60} />
      <Cheeks y={71} dx={19} cx={60} />
      <path d="M50 74q10 10 20 0" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

/** Steluță de strălucire, folosită ca decor. */
export function Sparkle({ className, color = "#FFC93C" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false">
      <path
        d="M20 2c2 10 8 16 18 18-10 2-16 8-18 18-2-10-8-16-18-18C12 18 18 12 20 2Z"
        fill={color}
        stroke={INK}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Bulă de spumă, decor. */
export function Bubble({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false">
      <circle cx="20" cy="20" r="16" fill="#fff" fillOpacity="0.85" stroke={INK} strokeWidth="2.5" />
      <path d="M12 16q2-6 8-6" fill="none" stroke="#BFE7E4" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
