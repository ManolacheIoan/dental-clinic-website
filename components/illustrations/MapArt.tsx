/** Hartă desenată, stilizată (nu e o hartă reală): orașul, Dunărea și clinica. */
export function MapArt({ className }: { className?: string }) {
  const INK = "#20303A";
  return (
    <svg viewBox="0 0 400 260" className={className} role="img" aria-label="Hartă ilustrată: clinica se află în cartierul Țiglina din Galați, aproape de Dunăre">
      <rect width="400" height="260" rx="24" fill="#FFF4D6" />
      {/* Dunărea */}
      <path d="M0 214c70-22 120 10 200-8s130-34 200-18v72H0Z" fill="#BFE7E4" />
      <path d="M30 232q30-8 60 0M240 222q30-8 60 0" stroke="#1AA6A6" strokeWidth="4" strokeLinecap="round" fill="none" />
      {/* străzi */}
      <g stroke="#fff" strokeWidth="14" strokeLinecap="round" fill="none">
        <path d="M-10 120h420" />
        <path d="M140 -10v200" />
        <path d="M280 -10l-40 200" />
        <path d="M20 40l360 20" />
      </g>
      <g stroke="#E8D9B5" strokeWidth="2" fill="none" strokeDasharray="6 8">
        <path d="M-10 120h420" />
        <path d="M140 -10v200" />
      </g>
      {/* blocuri */}
      <g fill="#fff" stroke={INK} strokeWidth="2.5">
        <rect x="30" y="66" width="80" height="38" rx="8" />
        <rect x="164" y="70" width="60" height="34" rx="8" />
        <rect x="30" y="136" width="90" height="40" rx="8" />
        <rect x="300" y="78" width="70" height="30" rx="8" />
        <rect x="300" y="136" width="64" height="36" rx="8" />
      </g>
      {/* parc */}
      <g>
        <rect x="164" y="136" width="62" height="44" rx="12" fill="#C9EBC0" stroke={INK} strokeWidth="2.5" />
        <circle cx="182" cy="156" r="8" fill="#8BCF6A" stroke={INK} strokeWidth="2" />
        <circle cx="206" cy="162" r="10" fill="#8BCF6A" stroke={INK} strokeWidth="2" />
      </g>
      {/* clinica */}
      <g transform="translate(240 76)">
        <ellipse cx="0" cy="42" rx="18" ry="6" fill={INK} opacity="0.2" />
        <path d="M0 42C-18 18-26 6-26-8a26 26 0 0 1 52 0c0 14-8 26-26 50Z" fill="#FF7A6B" stroke={INK} strokeWidth="3" />
        <circle cx="0" cy="-8" r="15" fill="#fff" stroke={INK} strokeWidth="2.5" />
        <path d="M-6-8q6 7 12 0" fill="none" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="-5" cy="-12" r="1.8" fill={INK} />
        <circle cx="5" cy="-12" r="1.8" fill={INK} />
      </g>
      <text x="200" y="250" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="13" fontWeight="700" fill="#0B6B6B">
        Dunărea
      </text>
    </svg>
  );
}
