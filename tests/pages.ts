import { services } from "../data/services";

/** Toate paginile site-ului. */
export const pages = [
  "/",
  "/servicii/",
  ...services.map((s) => `/servicii/${s.slug}/`),
  "/pentru-copii/",
  "/echipa/",
  "/preturi/",
  "/intrebari-frecvente/",
  "/programare/",
  "/contact/",
  "/confidentialitate/",
];
