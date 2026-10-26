"use client";

import { useId, useState } from "react";
import { faq } from "@/data/faq";
import { ToothMascot } from "./illustrations/Mascots";

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

/** Lista de întrebări, cu filtrare după text. Fără JS rămâne lista completă. */
export function FaqList() {
  const [query, setQuery] = useState("");
  const id = useId();
  const q = normalize(query.trim());
  const results = q ? faq.filter((f) => normalize(`${f.q} ${f.a}`).includes(q)) : faq;
  const topics = [...new Set(results.map((f) => f.topic))];

  return (
    <div className="faq">
      <div className="faq__search">
        <label htmlFor={`${id}-q`}>Caută o întrebare</label>
        <input
          id={`${id}-q`}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="de ex. copii, albire, plată"
          autoComplete="off"
        />
        <p className="small" aria-live="polite">
          {q ? `${results.length} ${results.length === 1 ? "rezultat" : "rezultate"}` : `${faq.length} întrebări`}
        </p>
      </div>

      {results.length === 0 ? (
        <div className="empty">
          <ToothMascot className="empty__art float" mood="surprised" />
          <h2 className="h3">Hopa, n-am găsit nimic</h2>
          <p>Încearcă alt cuvânt sau întreabă-ne direct, la telefon. Nicio întrebare nu e prea mică.</p>
          <button type="button" className="btn btn--light" onClick={() => setQuery("")}>
            Arată toate întrebările
          </button>
        </div>
      ) : (
        topics.map((t) => (
          <section key={t} className="faq__group" aria-labelledby={`${id}-${t}`}>
            <h2 id={`${id}-${t}`} className="faq__topic">
              {t}
            </h2>
            {results
              .filter((f) => f.topic === t)
              .map((f) => (
                <details key={f.q} className="faq__item">
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
          </section>
        ))
      )}
    </div>
  );
}
