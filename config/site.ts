/**
 * Datele clinicii — singurul loc unde se schimbă numele, telefonul, zona și programul.
 */

/** Numele clinicii. Schimbă-l aici și se schimbă pe tot site-ul. */
export const CLINIC_NAME = "Zâmbet Mare";

export const site = {
  name: CLINIC_NAME,
  tagline: "Clinică stomatologică pentru toată familia, în Galați",
  city: "Galați",
  area: "Cartierul Țiglina, Galați",
  areaNote: "Ușor de găsit, cu parcare în apropiere. Indicațiile exacte le primești la confirmarea programării.",
  phone: {
    display: "0236 000 456",
    href: "tel:+40236000456",
  },
  email: "programari@zambetmare.example",
  hours: [
    { days: "Luni – Vineri", time: "09:00 – 19:00" },
    { days: "Sâmbătă", time: "09:00 – 13:00" },
    { days: "Duminică", time: "Închis" },
  ],
  /**
   * Adresa unde se trimit cererile de programare (de ex. un formular Formspree).
   * Se setează la build prin variabila de mediu NEXT_PUBLIC_BOOKING_ENDPOINT.
   * Dacă lipsește, formularul nu trimite nimic și oferă email/telefon.
   */
  bookingEndpoint: process.env.NEXT_PUBLIC_BOOKING_ENDPOINT ?? "",
} as const;

export const nav = [
  { href: "/", label: "Acasă" },
  { href: "/servicii/", label: "Servicii" },
  { href: "/pentru-copii/", label: "Pentru copii" },
  { href: "/echipa/", label: "Echipa" },
  { href: "/preturi/", label: "Prețuri" },
  { href: "/intrebari-frecvente/", label: "Întrebări" },
  { href: "/contact/", label: "Contact" },
] as const;
