import Link from "next/link";
import type { Service } from "@/data/services";
import { ArrowIcon } from "./icons";
import { ServiceArt } from "./illustrations/ServiceArt";

/** Card de serviciu: tot cardul e clicabil, iar desenul face „wiggle” la hover. */
export function ServiceCard({ service, headingLevel = 3 }: { service: Service; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className={`service-card service-card--${service.tone}`}>
      <ServiceArt art={service.art} className="service-card__art" />
      <H className="service-card__title">
        <Link href={`/servicii/${service.slug}/`} className="service-card__link">
          {service.name}
        </Link>
      </H>
      <p>{service.short}</p>
      <span className="service-card__more" aria-hidden="true">
        Află mai mult <ArrowIcon />
      </span>
    </article>
  );
}
