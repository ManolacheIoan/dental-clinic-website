import type { Metadata } from "next";
import { Suspense } from "react";
import { BookingForm } from "@/components/BookingForm";
import { BookingFormWithParams } from "@/components/BookingFormWithParams";
import { ClockIcon, PhoneIcon } from "@/components/icons";
import { PageHero } from "@/components/PageHero";
import { ServiceArt } from "@/components/illustrations/ServiceArt";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Programare",
  description: "Cere o programare: alegi serviciul și ziua, iar noi te sunăm pentru confirmare.",
};

export default function BookingPage() {
  return (
    <>
      <PageHero
        title="Programare"
        eyebrow="Durează un minut"
        lead="Spune-ne ce ai nevoie și ce zi îți convine. Te sunăm noi ca să stabilim ora exactă."
        art={<ServiceArt art="consultatii" className="float" />}
      />
      <section className="section section--teal">
        <div className="container booking-layout">
          <div className="booking-card">
            <Suspense fallback={<BookingForm />}>
              <BookingFormWithParams />
            </Suspense>
          </div>
          <aside className="booking-aside" aria-label="Alte moduri de programare">
            <h2 className="h3">Preferi la telefon?</h2>
            <p>Răspundem în timpul programului și găsim împreună ora potrivită.</p>
            <a href={site.phone.href} className="btn">
              <PhoneIcon /> {site.phone.display}
            </a>
            <h2 className="h3 booking-aside__hours">
              <ClockIcon /> Program
            </h2>
            <ul className="plain-list">
              {site.hours.map((h) => (
                <li key={h.days}>
                  {h.days}: <strong>{h.time}</strong>
                </li>
              ))}
            </ul>
            <p className="small">
              Pentru urgențe sună-ne direct: păstrăm zilnic câteva intervale libere.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
