import Link from "next/link";
import { CLINIC_NAME, nav, site } from "@/config/site";
import { ClockIcon, MailIcon, PhoneIcon, PinIcon } from "./icons";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="footer">
      <svg className="footer__wave" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path d="M0 30c120-20 240-20 360 0s240 20 360 0 240-20 360 0 240 20 360 0v30H0Z" fill="currentColor" />
      </svg>
      <div className="footer__body">
        <div className="container footer__grid">
          <div>
            <Logo />
            <p className="footer__about">
              Stomatologie blândă pentru copii și adulți, în {site.city}. Explicăm tot, pas cu pas, ca nimeni să nu
              mai aibă emoții la dentist.
            </p>
          </div>
          <div>
            <h2 className="footer__title">Contact</h2>
            <ul className="footer__list">
              <li>
                <PhoneIcon />
                <a href={site.phone.href}>{site.phone.display}</a>
              </li>
              <li>
                <MailIcon />
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <PinIcon />
                <span>{site.area}</span>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="footer__title">Program</h2>
            <ul className="footer__list">
              {site.hours.map((h) => (
                <li key={h.days}>
                  <ClockIcon />
                  <span>
                    {h.days}: <strong>{h.time}</strong>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <nav aria-label="Subsol">
            <h2 className="footer__title">Pagini</h2>
            <ul className="footer__links">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href}>{n.label}</Link>
                </li>
              ))}
              <li>
                <Link href="/programare/">Programare</Link>
              </li>
              <li>
                <Link href="/confidentialitate/">Confidențialitate și cookie-uri</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="container footer__bottom">
          <p>
            © {new Date().getFullYear()} {CLINIC_NAME}. Toate drepturile rezervate.
          </p>
        </div>
      </div>
    </footer>
  );
}
