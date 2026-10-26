import Link from "next/link";
import { site } from "@/config/site";
import { CalendarIcon, PhoneIcon } from "./icons";
import { ToothMascot } from "./illustrations/Mascots";
import { Reveal } from "./Reveal";

/** Bandă galbenă de final de pagină: programare sau telefon. */
export function CtaBand({
  title = "Hai să ne cunoaștem!",
  text = "Alege o zi care ți se potrivește sau sună-ne. Răspundem cu drag la orice întrebare.",
  service,
}: {
  title?: string;
  text?: string;
  service?: string;
}) {
  const href = service ? `/programare/?serviciu=${service}` : "/programare/";
  return (
    <section className="section">
      <div className="container">
        <Reveal className="cta-band">
          <ToothMascot className="cta-band__art float" mood="wink" />
          <div>
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
          <div className="cta-band__actions">
            <Link href={href} className="btn">
              <CalendarIcon /> Programează-te
            </Link>
            <a href={site.phone.href} className="btn btn--light">
              <PhoneIcon /> {site.phone.display}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
