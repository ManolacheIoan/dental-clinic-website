import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { ServiceArt } from "@/components/illustrations/ServiceArt";
import { PageHero } from "@/components/PageHero";
import { PriceTable } from "@/components/PriceTable";
import { Reveal } from "@/components/Reveal";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Prețuri",
  description: "Prețuri orientative pentru consultații, igienizare, tratamente, ortodonție, copii, albire și implanturi.",
};

export default function PricesPage() {
  return (
    <>
      <PageHero
        title="Prețuri"
        eyebrow="Fără surprize"
        lead="Prețurile de mai jos sunt orientative. Costul exact îl afli după consultație, din planul de tratament scris, înainte să începem orice lucrare."
        art={<ServiceArt art="albire" className="float" />}
      />
      <section className="section section--teal">
        <div className="container">
          <nav aria-label="Categorii de prețuri" className="price-nav">
            <ul className="chip-list">
              {services.map((s) => (
                <li key={s.slug}>
                  <a href={`#${s.slug}`} className="chip">
                    <ServiceArt art={s.art} className="chip__art" />
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="price-groups">
            {services.map((s) => (
              <Reveal as="section" key={s.slug} className="price-group">
                <div className="price-group__head" id={s.slug} tabIndex={-1}>
                  <ServiceArt art={s.art} className="price-group__art" />
                  <h2>{s.name}</h2>
                </div>
                <PriceTable items={s.prices} caption={`Prețuri ${s.name}`} />
                <Link href={`/servicii/${s.slug}/`} className="small">
                  Cum decurge: {s.name.toLowerCase()}
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="note-box">
            <h2 className="h3">Bine de știut</h2>
            <ul className="check-list">
              <li>Prețurile sunt în lei și includ anestezia locală, unde e cazul.</li>
              <li>Pentru tratamente mai lungi, plata se poate face pe etape.</li>
              <li>Acceptăm plata cu cardul și numerar și emitem factură la cerere.</li>
            </ul>
          </div>
        </div>
      </section>
      <CtaBand title="Vrei să știi exact cât costă?" text="Programează o consultație și primești planul de tratament scris, cu toate costurile." service="consultatii" />
    </>
  );
}
