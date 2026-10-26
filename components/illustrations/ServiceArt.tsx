import type { ServiceArtKey } from "@/data/services";
import { TOOTH_PATH } from "./Mascots";

/** Ilustrații originale pentru fiecare serviciu (viewBox 0 0 120 120, același stil ca mascotele). */

const INK = "#20303A";
const BG: Record<ServiceArtKey, string> = {
  consultatii: "#BFE7E4",
  igienizare: "#FFE7A3",
  carii: "#FFD3CB",
  ortodontie: "#BFE7E4",
  copii: "#FFE7A3",
  albire: "#FFD3CB",
  implanturi: "#BFE7E4",
};

/** Dinte mic cu față, poziționat în ilustrație. */
function Tooth({ x = 30, y = 26, s = 0.6, face = true }: { x?: number; y?: number; s?: number; face?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d={TOOTH_PATH} fill="#fff" stroke={INK} strokeWidth={3 / s} strokeLinejoin="round" />
      {face && (
        <g>
          <circle cx="38" cy="44" r="4.6" fill={INK} />
          <circle cx="62" cy="44" r="4.6" fill={INK} />
          <ellipse cx="29" cy="55" rx="5.5" ry="3.5" fill="#FF7A6B" opacity="0.55" />
          <ellipse cx="71" cy="55" rx="5.5" ry="3.5" fill="#FF7A6B" opacity="0.55" />
          <path d="M39 57q11 12 22 0" fill="none" stroke={INK} strokeWidth="4.5" strokeLinecap="round" />
        </g>
      )}
    </g>
  );
}

function Star({ x, y, r = 8, fill = "#FFC93C" }: { x: number; y: number; r?: number; fill?: string }) {
  const k = r / 18;
  return (
    <path
      transform={`translate(${x - 20 * k} ${y - 20 * k}) scale(${k})`}
      d="M20 2c2 10 8 16 18 18-10 2-16 8-18 18-2-10-8-16-18-18C12 18 18 12 20 2Z"
      fill={fill}
      stroke={INK}
      strokeWidth={2.5 / k}
      strokeLinejoin="round"
    />
  );
}

function Details({ art }: { art: ServiceArtKey }) {
  switch (art) {
    case "consultatii":
      return (
        <g>
          <Tooth x={22} y={30} s={0.58} />
          <path d="M92 104 78 70" stroke={INK} strokeWidth="5" strokeLinecap="round" />
          <circle cx="74" cy="58" r="15" fill="#E3F4F2" stroke={INK} strokeWidth="3.5" />
          <path d="M66 54q3-6 9-7" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" />
        </g>
      );
    case "igienizare":
      return (
        <g>
          <Tooth x={30} y={30} s={0.6} />
          <Star x={92} y={30} r={10} />
          <Star x={24} y={26} r={6} fill="#fff" />
          <circle cx="94" cy="78" r="8" fill="#fff" stroke={INK} strokeWidth="3" />
          <circle cx="22" cy="86" r="6" fill="#fff" stroke={INK} strokeWidth="3" />
          <circle cx="104" cy="58" r="4" fill="#fff" stroke={INK} strokeWidth="2.5" />
        </g>
      );
    case "carii":
      return (
        <g>
          <Tooth x={30} y={30} s={0.6} face={false} />
          <circle cx="50" cy="56" r="3.5" fill={INK} />
          <circle cx="70" cy="56" r="3.5" fill={INK} />
          <path d="M53 66q7 7 14 0" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />
          {/* plasture */}
          <g transform="rotate(-25 74 40)">
            <rect x="58" y="33" width="34" height="14" rx="7" fill="#FFC93C" stroke={INK} strokeWidth="3" />
            <rect x="69" y="33" width="12" height="14" fill="#FFE7A3" stroke={INK} strokeWidth="2" />
          </g>
          <path
            d="M96 78c0-5 7-5 7 0 0 5-7 9-7 9s-7-4-7-9c0-5 7-5 7 0Z"
            fill="#FF7A6B"
            stroke={INK}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        </g>
      );
    case "ortodontie":
      return (
        <g>
          <Tooth x={30} y={28} s={0.6} />
          <path d="M28 76q32 10 64 0" fill="none" stroke="#7D8C95" strokeWidth="3.5" strokeLinecap="round" />
          {[38, 53, 68, 83].map((x) => (
            <rect key={x} x={x - 5} y={74} width="10" height="9" rx="2" fill="#E3F4F2" stroke={INK} strokeWidth="2.5" />
          ))}
          <Star x={98} y={28} r={7} />
        </g>
      );
    case "copii":
      return (
        <g>
          {/* balon */}
          <path d="M92 70q-6 12 2 26" fill="none" stroke={INK} strokeWidth="2.5" />
          <ellipse cx="92" cy="44" rx="15" ry="18" fill="#FF7A6B" stroke={INK} strokeWidth="3" />
          <path d="M86 36q2-6 7-7" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
          <path d="M89 62h6l-3 5Z" fill="#FF7A6B" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
          <Tooth x={18} y={40} s={0.52} />
          {/* coroniță */}
          <path
            d="M30 40l4-12 7 8 6-11 6 11 7-8 4 12Z"
            fill="#FFC93C"
            stroke={INK}
            strokeWidth="3"
            strokeLinejoin="round"
          />
        </g>
      );
    case "albire":
      return (
        <g>
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <path
              key={a}
              d="M60 14v8"
              transform={`rotate(${a} 60 62)`}
              stroke="#FFC93C"
              strokeWidth="5"
              strokeLinecap="round"
            />
          ))}
          <Tooth x={30} y={30} s={0.6} />
          <Star x={84} y={38} r={9} fill="#fff" />
        </g>
      );
    case "implanturi":
      return (
        <g>
          <path d="M42 34h36q4 0 4 6 0 14-6 18H44q-6-4-6-18 0-6 4-6Z" fill="#fff" stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
          <circle cx="52" cy="44" r="3" fill={INK} />
          <circle cx="68" cy="44" r="3" fill={INK} />
          <path d="M54 50q6 5 12 0" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />
          <rect x="54" y="58" width="12" height="6" fill="#B8C4CB" stroke={INK} strokeWidth="2.5" />
          <path d="M51 64h18l-3 34h-12Z" fill="#B8C4CB" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
          {[72, 80, 88].map((y) => (
            <path key={y} d={`M52 ${y}l16-4`} stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
          ))}
          <Star x={92} y={30} r={7} />
        </g>
      );
  }
}

export function ServiceArt({ art, className }: { art: ServiceArtKey; className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true" focusable="false">
      <path
        d="M60 6c26 0 52 14 54 46 2 34-22 62-56 62S4 92 6 58C8 26 34 6 60 6Z"
        fill={BG[art]}
      />
      <Details art={art} />
    </svg>
  );
}
