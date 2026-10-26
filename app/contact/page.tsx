import type { Metadata } from "next";
import Link from "next/link";
import { CalendarIcon, ClockIcon, MailIcon, PhoneIcon, PinIcon } from "@/components/icons";
import { MapArt } from "@/components/illustrations/MapArt";
import { DentistMascot } from "@/components/illustrations/Mascots";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CLINIC_NAME, site } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Telefon, email, program și zona clinicii ${CLINIC_NAME} din ${site.city}.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact"
        eyebrow="Te așteptăm"
        lead="Cel mai rapid ne găsești la telefon. Pentru programări poți folosi și formularul online."
        art={<DentistMascot className="float" />}
      />
      <section className="section section--teal">
        <div className="container contact">
          <Reveal className="contact__cards">
            <a href={site.phone.href} className="contact-card contact-card--call">
              <PhoneIcon />
              <span>
                <span className="contact-card__label">Sună-ne</span>
                <span className="contact-card__value">{site.phone.display}</span>
              </span>
            </a>
            <a href={`mailto:${site.email}`} className="contact-card">
              <MailIcon />
              <span>
                <span className="contact-card__label">Scrie-ne</span>
                <span className="contact-card__value contact-card__value--small">{site.email}</span>
              </span>
            </a>
            <div className="contact-card">
              <PinIcon />
              <span>
                <span className="contact-card__label">Unde suntem</span>
                <span className="contact-card__value">{site.area}</span>
                <span className="small">{site.areaNote}</span>
              </span>
            </div>
            <div className="contact-card">
              <ClockIcon />
              <span>
                <span className="contact-card__label">Program</span>
                <span className="hours">
                  {site.hours.map((h) => (
                    <span key={h.days} className="hours__row">
                      <span>{h.days}</span>
                      <strong>{h.time}</strong>
                    </span>
                  ))}
                </span>
              </span>
            </div>
            <Link href="/programare/" className="btn btn--sun">
              <CalendarIcon /> Cere o programare
            </Link>
          </Reveal>
          <Reveal className="contact__map" delay={80}>
            <MapArt className="contact__map-art" />
            <p className="small">
              Harta e doar orientativă. Îți trimitem indicațiile exacte și locurile de parcare odată cu confirmarea
              programării.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
