"use client";

import { useId, useState } from "react";
import { ToothMascot } from "./illustrations/Mascots";

const items = [
  "M-am spălat pe dinți dimineața, 2 minute",
  "M-am spălat pe dinți seara, înainte de culcare",
  "Am folosit pastă cu fluor, cât un bob de mazăre",
  "Am băut apă în loc de suc",
  "Am mâncat un fruct sau o legumă crocantă",
  "Un adult a verificat dacă am periat peste tot",
];

/** Mică listă de bifat pentru acasă. Nu salvează nimic. */
export function Checklist() {
  const [checked, setChecked] = useState<boolean[]>(() => items.map(() => false));
  const id = useId();
  const count = checked.filter(Boolean).length;
  const all = count === items.length;

  return (
    <div className="checklist">
      <fieldset>
        <legend className="checklist__legend">Azi am avut grijă de dinți?</legend>
        <ul className="checklist__list">
          {items.map((label, i) => (
            <li key={label}>
              <input
                type="checkbox"
                id={`${id}-${i}`}
                checked={checked[i]}
                onChange={(e) => setChecked((c) => c.map((v, j) => (j === i ? e.target.checked : v)))}
              />
              <label htmlFor={`${id}-${i}`}>{label}</label>
            </li>
          ))}
        </ul>
      </fieldset>
      <div className="checklist__progress">
        <div className="checklist__bar" aria-hidden="true">
          <span style={{ transform: `scaleX(${count / items.length})` }} />
        </div>
        <p aria-live="polite">
          {all ? "Bravo! Dințișor e mândru de tine!" : `${count} din ${items.length} bifate`}
        </p>
      </div>
      {all && (
        <div className="checklist__done">
          <ToothMascot className="checklist__mascot float" mood="wink" />
          <button
            type="button"
            className="btn btn--light"
            onClick={() => setChecked(items.map(() => false))}
          >
            Începe o zi nouă
          </button>
        </div>
      )}
    </div>
  );
}
