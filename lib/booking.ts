/** Validarea și pregătirea cererii de programare (fără dependențe de browser). */

export type BookingData = {
  nume: string;
  telefon: string;
  serviciu: string;
  zi: string;
  mesaj: string;
  acord: boolean;
};

export type BookingErrors = Partial<Record<keyof BookingData, string>>;

export const days = ["Luni", "Marți", "Miercuri", "Joi", "Vineri", "Sâmbătă", "Oricând"] as const;

/** Acceptă 07xx xxx xxx, 02xx/03xx xxx xxx, cu sau fără +40, spații, puncte sau cratime. */
export function normalizePhone(raw: string) {
  return raw.replace(/[\s.\-()]/g, "").replace(/^0040/, "+40");
}

export function isValidPhone(raw: string) {
  return /^(\+40|0)[237]\d{8}$/.test(normalizePhone(raw));
}

export function validateBooking(d: BookingData): BookingErrors {
  const e: BookingErrors = {};
  const name = d.nume.trim();
  if (!name) e.nume = "Scrie-ne numele tău.";
  else if (name.length < 3) e.nume = "Numele pare prea scurt.";
  else if (!/^[\p{L}\s.'-]+$/u.test(name)) e.nume = "Numele poate conține doar litere, spații și cratime.";

  if (!d.telefon.trim()) e.telefon = "Avem nevoie de un număr de telefon ca să te sunăm.";
  else if (!isValidPhone(d.telefon)) e.telefon = "Numărul nu pare corect. Exemplu: 0722 123 456.";

  if (!d.serviciu) e.serviciu = "Alege un serviciu (sau „Nu știu încă”).";
  if (!d.zi) e.zi = "Alege ziua care ți se potrivește.";
  if (d.mesaj.length > 500) e.mesaj = "Mesajul poate avea cel mult 500 de caractere.";
  if (!d.acord) e.acord = "Bifează acordul ca să te putem contacta.";
  return e;
}

export function bookingSummary(d: BookingData, serviceName: string) {
  return [
    `Nume: ${d.nume.trim()}`,
    `Telefon: ${normalizePhone(d.telefon)}`,
    `Serviciu: ${serviceName}`,
    `Zi preferată: ${d.zi}`,
    d.mesaj.trim() ? `Mesaj: ${d.mesaj.trim()}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}
