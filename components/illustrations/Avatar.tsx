import type { AvatarLook } from "@/data/team";

const INK = "#20303A";

function HairBack({ look }: { look: AvatarLook }) {
  if (look.style === "long")
    return <path d="M28 56c0-26 14-38 32-38s32 12 32 38v40H28Z" fill={look.hair} stroke={INK} strokeWidth="3" />;
  if (look.style === "bun")
    return <circle cx="60" cy="18" r="12" fill={look.hair} stroke={INK} strokeWidth="3" />;
  return null;
}

function HairFront({ look }: { look: AvatarLook }) {
  const common = { fill: look.hair, stroke: INK, strokeWidth: 3, strokeLinejoin: "round" as const };
  switch (look.style) {
    case "short":
      return <path d="M32 54c-3-20 10-32 28-32s31 12 28 32c-4-8-10-12-18-13-10 5-24 7-38 13Z" {...common} />;
    case "side":
      return (
        <g>
          <path d="M31 58c-2-10 0-18 4-22l4 20Z" {...common} />
          <path d="M89 58c2-10 0-18-4-22l-4 20Z" {...common} />
          <path d="M38 34q22-12 44 0" fill="none" stroke={INK} strokeWidth="2" opacity="0.3" />
        </g>
      );
    case "curly":
      return (
        <g {...common}>
          {[
            [34, 44, 10],
            [44, 32, 11],
            [60, 27, 12],
            [76, 32, 11],
            [86, 44, 10],
            [30, 58, 8],
            [90, 58, 8],
          ].map(([cx, cy, r]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} />
          ))}
        </g>
      );
    case "long":
      return <path d="M30 56c0-22 12-34 30-34s30 12 30 34c-10-4-18-10-22-18-8 10-22 16-38 18Z" {...common} />;
    case "bun":
      return <path d="M30 56c-2-22 12-32 30-32s32 10 30 32c-8-8-18-12-30-12s-22 4-30 12Z" {...common} />;
  }
}

/** Avatar ilustrat pentru membrii echipei (desen original, parametric). */
export function Avatar({
  look,
  id,
  className,
  label,
}: {
  look: AvatarLook;
  /** Id unic pe pagină, pentru decupajul circular. */
  id: string;
  className?: string;
  label?: string;
}) {
  const clip = `avatar-${id}`;
  const a11y = label ? { role: "img", "aria-label": label } : { "aria-hidden": true as const };
  return (
    <svg viewBox="0 0 120 120" className={className} {...a11y}>
      <defs>
        <clipPath id={clip}>
          <circle cx="60" cy="60" r="58" />
        </clipPath>
      </defs>
      <circle cx="60" cy="60" r="58" fill={look.bg} />
      <g clipPath={`url(#${clip})`}>
        <HairBack look={look} />
        <path d="M18 124c0-22 18-34 42-34s42 12 42 34Z" fill={look.scrubs} stroke={INK} strokeWidth="3" />
        <path d="M50 90l10 13 10-13" fill="#fff" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        <rect x="52" y="74" width="16" height="18" rx="6" fill={look.skin} stroke={INK} strokeWidth="3" />
        <circle cx="60" cy="58" r="28" fill={look.skin} stroke={INK} strokeWidth="3" />
        {look.beard && (
          <path d="M34 62c2 16 12 24 26 24s24-8 26-24c-6 6-14 8-26 8s-20-2-26-8Z" fill={look.hair} stroke={INK} strokeWidth="3" />
        )}
        <HairFront look={look} />
        <circle cx="50" cy="60" r="3.6" fill={INK} />
        <circle cx="70" cy="60" r="3.6" fill={INK} />
        {look.glasses && (
          <g fill="none" stroke={INK} strokeWidth="2.6">
            <circle cx="50" cy="60" r="8" />
            <circle cx="70" cy="60" r="8" />
            <path d="M58 60h4" />
          </g>
        )}
        <ellipse cx="42" cy="70" rx="5" ry="3" fill="#FF7A6B" opacity="0.5" />
        <ellipse cx="78" cy="70" rx="5" ry="3" fill="#FF7A6B" opacity="0.5" />
        <path d="M52 71q8 8 16 0" fill="none" stroke={INK} strokeWidth="3.2" strokeLinecap="round" />
      </g>
      <circle cx="60" cy="60" r="58" fill="none" stroke={INK} strokeWidth="3" />
    </svg>
  );
}
