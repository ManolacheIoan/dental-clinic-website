"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import { site } from "@/config/site";
import { services } from "@/data/services";
import { type BookingData, type BookingErrors, bookingSummary, days, normalizePhone, validateBooking } from "@/lib/booking";
import { CheckIcon, MailIcon, PhoneIcon } from "./icons";
import { DentistMascot, ToothMascot } from "./illustrations/Mascots";

const UNKNOWN = "nu-stiu";
const fieldOrder: (keyof BookingData)[] = ["nume", "telefon", "serviciu", "zi", "mesaj", "acord"];

type Status = "idle" | "sending" | "sent" | "prepared" | "error";

function serviceName(slug: string) {
  return services.find((s) => s.slug === slug)?.name ?? "Nu știu încă / consultație";
}

export function BookingForm({ initialService = "" }: { initialService?: string }) {
  const id = useId();
  const [data, setData] = useState<BookingData>({
    nume: "",
    telefon: "",
    serviciu: services.some((s) => s.slug === initialService) ? initialService : "",
    zi: "",
    mesaj: "",
    acord: false,
  });
  const [errors, setErrors] = useState<BookingErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLHeadingElement>(null);

  const set = <K extends keyof BookingData>(k: K, v: BookingData[K]) => {
    setData((d) => ({ ...d, [k]: v }));
    // Eroarea dispare de cum utilizatorul corectează câmpul.
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const fid = (k: string) => `${id}-${k}`;
  const describedBy = (k: keyof BookingData, hint?: boolean) =>
    [hint ? fid(`${k}-hint`) : "", errors[k] ? fid(`${k}-err`) : ""].filter(Boolean).join(" ") || undefined;

  const summary = bookingSummary(data, serviceName(data.serviciu));
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
    `Cerere programare: ${data.nume.trim()}`,
  )}&body=${encodeURIComponent(summary)}`;

  function focusResult() {
    requestAnimationFrame(() => resultRef.current?.focus());
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateBooking(data);
    setErrors(found);
    const first = fieldOrder.find((k) => found[k]);
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    // Fără adresă configurată nu trimitem nimic: spunem sincer și oferim email/telefon.
    if (!site.bookingEndpoint) {
      setStatus("prepared");
      focusResult();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(site.bookingEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          nume: data.nume.trim(),
          telefon: normalizePhone(data.telefon),
          serviciu: serviceName(data.serviciu),
          zi: data.zi,
          mesaj: data.mesaj.trim(),
        }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
    focusResult();
  }

  if (status === "sent" || status === "prepared") {
    const sent = status === "sent";
    return (
      <div className="booking-result" role="status">
        <ToothMascot className="booking-result__art float" mood="wink" />
        <h2 ref={resultRef} tabIndex={-1}>
          {sent ? "Am primit cererea ta!" : "Cererea ta e pregătită"}
        </h2>
        {sent ? (
          <p>
            Mulțumim, {data.nume.trim().split(" ")[0]}! Te sunăm în cel mult o zi lucrătoare la{" "}
            <strong>{normalizePhone(data.telefon)}</strong> ca să stabilim ora exactă.
          </p>
        ) : (
          <>
            <p>
              Formularul online nu este conectat încă, așa că <strong>datele tale nu au fost trimise nicăieri</strong>.
              Ca să finalizezi programarea, trimite-ne emailul de mai jos (îl pregătim noi) sau sună-ne.
            </p>
            <pre className="booking-result__summary">{summary}</pre>
            <div className="booking-result__actions">
              <a href={mailto} className="btn">
                <MailIcon /> Trimite pe email
              </a>
              <a href={site.phone.href} className="btn btn--light">
                <PhoneIcon /> {site.phone.display}
              </a>
            </div>
          </>
        )}
        <p className="small">
          <Link href="/">Înapoi la pagina principală</Link>
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} className="booking" noValidate onSubmit={onSubmit} aria-describedby={fid("intro")}>
      <p id={fid("intro")} className="small">
        Câmpurile marcate cu <span aria-hidden="true">*</span>
        <span className="visually-hidden">asterisc</span> sunt obligatorii.
      </p>

      {status === "error" && (
        <div className="booking__alert" role="alert">
          <h2 ref={resultRef} tabIndex={-1} className="h3">
            Cererea nu a putut fi trimisă
          </h2>
          <p>
            A apărut o problemă de conexiune. Încearcă din nou sau{" "}
            <a href={mailto}>trimite-ne cererea pe email</a> ori sună la{" "}
            <a href={site.phone.href}>{site.phone.display}</a>.
          </p>
        </div>
      )}

      <div className="field">
        <label htmlFor={fid("nume")}>
          Nume și prenume <span aria-hidden="true">*</span>
        </label>
        <input
          id={fid("nume")}
          name="nume"
          type="text"
          autoComplete="name"
          required
          value={data.nume}
          onChange={(e) => set("nume", e.target.value)}
          aria-invalid={!!errors.nume}
          aria-describedby={describedBy("nume")}
        />
        {errors.nume && (
          <p id={fid("nume-err")} className="field__error">
            {errors.nume}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor={fid("telefon")}>
          Telefon <span aria-hidden="true">*</span>
        </label>
        <input
          id={fid("telefon")}
          name="telefon"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          value={data.telefon}
          onChange={(e) => set("telefon", e.target.value)}
          aria-invalid={!!errors.telefon}
          aria-describedby={describedBy("telefon", true)}
        />
        <p id={fid("telefon-hint")} className="field__hint">
          Te sunăm noi pentru confirmare. Exemplu: 0722 123 456
        </p>
        {errors.telefon && (
          <p id={fid("telefon-err")} className="field__error">
            {errors.telefon}
          </p>
        )}
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor={fid("serviciu")}>
            Serviciu <span aria-hidden="true">*</span>
          </label>
          <select
            id={fid("serviciu")}
            name="serviciu"
            required
            value={data.serviciu}
            onChange={(e) => set("serviciu", e.target.value)}
            aria-invalid={!!errors.serviciu}
            aria-describedby={describedBy("serviciu")}
          >
            <option value="">Alege…</option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
            <option value={UNKNOWN}>Nu știu încă / consultație</option>
          </select>
          {errors.serviciu && (
            <p id={fid("serviciu-err")} className="field__error">
              {errors.serviciu}
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor={fid("zi")}>
            Ziua preferată <span aria-hidden="true">*</span>
          </label>
          <select
            id={fid("zi")}
            name="zi"
            required
            value={data.zi}
            onChange={(e) => set("zi", e.target.value)}
            aria-invalid={!!errors.zi}
            aria-describedby={describedBy("zi", true)}
          >
            <option value="">Alege…</option>
            {days.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <p id={fid("zi-hint")} className="field__hint">
            Sâmbăta lucrăm doar dimineața.
          </p>
          {errors.zi && (
            <p id={fid("zi-err")} className="field__error">
              {errors.zi}
            </p>
          )}
        </div>
      </div>

      <div className="field">
        <label htmlFor={fid("mesaj")}>Mesaj (opțional)</label>
        <textarea
          id={fid("mesaj")}
          name="mesaj"
          rows={3}
          maxLength={500}
          value={data.mesaj}
          onChange={(e) => set("mesaj", e.target.value)}
          aria-invalid={!!errors.mesaj}
          aria-describedby={describedBy("mesaj", true)}
        />
        <p id={fid("mesaj-hint")} className="field__hint">
          De exemplu: ora care îți convine sau dacă vii cu un copil.
        </p>
        {errors.mesaj && (
          <p id={fid("mesaj-err")} className="field__error">
            {errors.mesaj}
          </p>
        )}
      </div>

      <div className="field field--check">
        <input
          id={fid("acord")}
          name="acord"
          type="checkbox"
          checked={data.acord}
          onChange={(e) => set("acord", e.target.checked)}
          aria-invalid={!!errors.acord}
          aria-describedby={describedBy("acord")}
        />
        <label htmlFor={fid("acord")}>
          Sunt de acord să fiu contactat(ă) pentru această programare. Am citit{" "}
          <Link href="/confidentialitate/">politica de confidențialitate</Link>.{" "}
          <span aria-hidden="true">*</span>
        </label>
        {errors.acord && (
          <p id={fid("acord-err")} className="field__error">
            {errors.acord}
          </p>
        )}
      </div>

      <button type="submit" className="btn btn--sun booking__submit" disabled={status === "sending"}>
        <CheckIcon /> {status === "sending" ? "Se trimite…" : "Cere programarea"}
      </button>
      <DentistMascot className="booking__mascot" />
    </form>
  );
}
