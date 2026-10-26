import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import { BrushMascot, Sparkle, TOOTH_PATH, ToothMascot } from "@/components/illustrations/Mascots";

export const metadata: Metadata = {
  title: "Pagina nu există",
};

export default function NotFound() {
  return (
    <section className="section notfound">
      <div className="container notfound__inner">
        <div className="notfound__art" aria-hidden="true">
          <svg viewBox="0 0 330 140" className="notfound__row">
            <rect x="6" y="10" width="318" height="40" rx="20" fill="#FF7A6B" stroke="#20303A" strokeWidth="3" />
            {[20, 220].map((x) => (
              <g key={x} transform={`translate(${x} 22) scale(0.9)`}>
                <path d={TOOTH_PATH} fill="#fff" stroke="#20303A" strokeWidth="4" strokeLinejoin="round" />
              </g>
            ))}
            <g transform="translate(120 22) scale(0.9)" className="notfound__gap">
              <path d={TOOTH_PATH} fill="none" stroke="#20303A" strokeWidth="4" strokeDasharray="8 9" strokeLinejoin="round" />
            </g>
          </svg>
          <ToothMascot className="notfound__tooth" mood="surprised" />
          <BrushMascot className="notfound__brush" />
          <Sparkle className="notfound__spark twinkle" />
        </div>
        <div className="notfound__text">
          <span className="eyebrow">Eroare 404</span>
          <h1>Ups! Pagina asta a căzut ca un dinte de lapte</h1>
          <p className="lead">
            Am căutat peste tot, chiar și sub pernă, dar nu am găsit-o. Poate adresa are o greșeală, sau pagina s-a
            mutat.
          </p>
          <div className="hero__actions">
            <Link href="/" className="btn btn--sun">
              Înapoi acasă <ArrowIcon />
            </Link>
            <Link href="/servicii/" className="btn btn--light">
              Vezi serviciile
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
