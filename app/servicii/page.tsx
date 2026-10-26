import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { BrushMascot, Sparkle } from "@/components/illustrations/Mascots";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ServiceCard } from "@/components/ServiceCard";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Servicii",
  description: "Consultații, igienizare, tratamente carii, ortodonție, stomatologie pentru copii, albire și implanturi.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Servicii"
        eyebrow="Tot ce ține de zâmbet"
        lead="De la prima consultație la implanturi, îți explicăm fiecare pas pe înțeles și lucrăm fără grabă. Alege un serviciu ca să afli cum decurge."
        art={
          <div className="hero-mini">
            <BrushMascot className="hero-mini__main float" />
            <Sparkle className="hero-mini__spark twinkle" />
          </div>
        }
      />
      <section className="section section--teal">
        <div className="container">
          <ul className="grid grid--3 plain-list">
            {services.map((s, i) => (
              <Reveal as="li" key={s.slug} delay={(i % 3) * 80}>
                <ServiceCard service={s} headingLevel={2} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand title="Nu știi de unde să începi?" text="Începe cu o consultație. Îți spunem sincer ce e necesar și ce mai poate aștepta." service="consultatii" />
    </>
  );
}
