import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/CtaBand";
import { ClockIcon, SparkIcon } from "@/components/icons";
import { ServiceArt } from "@/components/illustrations/ServiceArt";
import { PageHero } from "@/components/PageHero";
import { PriceTable } from "@/components/PriceTable";
import { Reveal } from "@/components/Reveal";
import { getService, services } from "@/data/services";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  return s ? { title: s.name, description: s.short } : {};
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const others = services.filter((o) => o.slug !== s.slug);

  return (
    <>
      <PageHero
        title={s.name}
        crumbs={[{ href: "/servicii/", label: "Servicii" }]}
        lead={s.intro}
        art={<ServiceArt art={s.art} className="float" />}
      />

      <section className="section section--teal">
        <div className="container service-detail">
          <Reveal className="card">
            <h2 className="h3">Pentru cine e potrivit</h2>
            <ul className="check-list">
              {s.forWho.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <p className="service-detail__meta">
              <ClockIcon /> Durată: <strong>{s.duration}</strong>
            </p>
          </Reveal>

          <Reveal className="service-detail__steps" delay={80}>
            <h2 className="h3">Cum decurge</h2>
            <ol className="steps">
              {s.steps.map((st) => (
                <li key={st.title} className="steps__item">
                  <h3 className="steps__title">{st.title}</h3>
                  <p>{st.text}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container service-detail">
          <Reveal>
            <h2>Prețuri orientative</h2>
            <PriceTable items={s.prices} caption={`Prețuri ${s.name.toLowerCase()}`} />
            <p className="small">
              Prețul final îl afli după consultație. Vezi <Link href="/preturi/">toate prețurile</Link>.
            </p>
          </Reveal>
          <Reveal className="tip" delay={80}>
            <SparkIcon className="tip__icon" />
            <h2 className="h3">Sfatul nostru</h2>
            <p>{s.tip}</p>
          </Reveal>
        </div>
      </section>

      <section className="section section--sun">
        <div className="container">
          <h2>Alte servicii</h2>
          <ul className="chip-list">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/servicii/${o.slug}/`} className="chip">
                  <ServiceArt art={o.art} className="chip__art" />
                  {o.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title={`Programează-te pentru ${s.name.toLowerCase()}`} service={s.slug} />
    </>
  );
}
