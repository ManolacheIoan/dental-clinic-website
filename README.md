# Zâmbet Mare — site de prezentare pentru o clinică stomatologică

> **Proiect demonstrativ (portofoliu).** Clinica „Zâmbet Mare”, medicii, prețurile, telefonul,
> adresa de email și programul sunt **fictive**. Site-ul arată ca unul final, dar nu aparține
> unei clinici reale. Paginile au `noindex`, ca să nu apară în motoarele de căutare.
> Textul politicii de confidențialitate este un model generic și trebuie verificat de un jurist
> înainte de folosirea reală.

Site static (Next.js 16, export static), în limba română, gândit întâi pentru telefon. Identitate
proprie: turcoaz, galben-soare și coral pe crem, logo original și trei mascote desenate în SVG
(Dințișor, Periuța și Doctorița Zâmbet). Nu folosește imagini de pe internet, scripturi de la
terți sau cookie-uri.

## Pagini

| Adresă | Conținut |
| --- | --- |
| `/` | Acasă: hero animat, servicii, de ce noi, copii, echipa |
| `/servicii/` și `/servicii/<slug>/` | Ansamblu + câte o pagină pentru fiecare dintre cele 7 servicii |
| `/pentru-copii/` | Prima vizită pas cu pas, demonstrație animată de periaj, sfaturi, listă de bifat |
| `/echipa/` | Medici fictivi cu avatare ilustrate |
| `/preturi/` | Tabel de prețuri orientative, pe servicii |
| `/intrebari-frecvente/` | Întrebări cu căutare și stare „nimic găsit” |
| `/programare/` | Formular cu validare (vezi mai jos) |
| `/contact/` | Telefon click-to-call, email, program, hartă ilustrată (fără hărți externe) |
| `/confidentialitate/` | Politica de confidențialitate și cookie-uri (model generic) |
| orice altă adresă | Pagina 404 jucăușă |

## Structura proiectului

```
app/                 paginile (App Router), globals.css, fonturi locale în app/fonts
components/          antet, subsol, bara „Sună acum”, carduri, formular, demonstrație periaj
components/illustrations/
  Mascots.tsx        Dințișor, Periuța, Doctorița Zâmbet, steluțe, bule
  ServiceArt.tsx     ilustrația fiecărui serviciu
  Avatar.tsx         avatarele echipei (generate din parametri)
  MapArt.tsx         harta stilizată de la Contact
config/site.ts       NUMELE clinicii, telefon, email, zonă, program, meniu
data/services.ts     serviciile: texte, pași, sfaturi, prețuri
data/team.ts         echipa: nume, rol, descriere, aspectul avatarului
data/faq.ts          întrebări frecvente
lib/booking.ts       validarea formularului de programare
tests/               teste Playwright + axe
scripts/serve.mjs    server local pentru folderul out/ (teste și Lighthouse)
```

## Editarea conținutului

- **Telefon, email, zonă, program:** `config/site.ts`.
- **Servicii și prețuri:** `data/services.ts`. Fiecare serviciu are `prices`; pagina
  `/preturi/` și secțiunea de prețuri a serviciului se actualizează singure. Un serviciu nou
  are nevoie și de o ilustrație: adaugă cheia în `ServiceArtKey` și desenul în `ServiceArt.tsx`.
- **Echipa:** `data/team.ts`. Aspectul avatarului se alege din `look` (piele, păr, coafură,
  culoarea halatului, ochelari, barbă).
- **Întrebări frecvente:** `data/faq.ts`.
- **Culori:** variabilele de la începutul `app/globals.css`. Pentru text pe fundal deschis
  se folosesc nuanțele închise (`--teal-ink`, `--coral-ink`), care respectă contrastul WCAG AA.

## Redenumirea clinicii

Numele apare dintr-o singură constantă:

```ts
// config/site.ts
export const CLINIC_NAME = "Zâmbet Mare";
```

Schimbă textul, apoi refă build-ul. Titlurile paginilor, logo-ul, subsolul și textele se
actualizează automat. Dacă schimbi și adresa de email, modific-o tot în `config/site.ts`.

## Formularul de programare

Câmpuri: nume, telefon (format românesc), serviciu, ziua preferată, mesaj opțional și acord.
Validarea se face în browser, cu mesaje lângă fiecare câmp, iar focusul trece pe primul câmp greșit.

- **Implicit nu trimite date nicăieri.** După completare, spune clar că cererea nu a fost
  trimisă și oferă un email gata completat (`mailto:`) și butonul de apel.
- **Pentru trimitere reală** (de ex. [Formspree](https://formspree.io)), setează la build
  variabila de mediu `NEXT_PUBLIC_BOOKING_ENDPOINT` cu adresa formularului
  (de ex. `https://formspree.io/f/abcdwxyz`), din setările găzduirii sau din terminal:

  ```bash
  NEXT_PUBLIC_BOOKING_ENDPOINT=https://formspree.io/f/abcdwxyz npm run build
  ```

  Formularul trimite atunci JSON prin `POST`. Dacă trimiterea eșuează, arată un mesaj de eroare
  cu aceleași variante de rezervă (email și telefon).

## Comenzi

```bash
npm install
npm run dev          # dezvoltare: http://localhost:3000
npm run clean        # șterge .next și out
npm run build        # export static în out/
npm run serve        # servește out/ pe http://localhost:4173 (cu compresie)
npm run lint
npm run typecheck
npm test             # Playwright + axe (pe out/, deci rulează întâi build)
```

Testele verifică: accesibilitatea (axe, WCAG 2.2 AA) pe toate paginile și pe 404, formularul de
programare (erori, focus, succes fără trimitere de date, precompletarea serviciului), faptul că
**nicio pagină nu face cereri externe**, `noindex`, navigarea cu tastatura, bara „Sună acum”,
mișcarea redusă și demonstrația de periaj. Rulează pe un profil de telefon și pe unul de desktop.

Lighthouse (pe build-ul servit local):

```bash
npm run serve &
npx lighthouse http://localhost:4173/ --view
```

Scorul SEO e mai mic intenționat, din cauza `noindex`.

## Animații și accesibilitate

- Personaje care plutesc, steluțe care sclipesc, apariții la derulare, „wiggle” pe cardurile
  de servicii, demonstrație de periaj și tranziții între pagini (View Transitions, prin React).
- Toate animațiile sunt dezactivate când sistemul cere **mișcare redusă**
  (`prefers-reduced-motion`). Demonstrația de periaj pornește doar la cerere și are buton de pauză.
- Conținutul ascuns pentru animația de apariție rămâne vizibil fără JavaScript.
- Link „Sari la conținut”, meniu accesibil cu tastatura (Escape îl închide), focus vizibil,
  mesaje anunțate cititoarelor de ecran.

## Fonturi

Fredoka (titluri) și Nunito Sans (text), găzduite local în `app/fonts`, licență SIL Open Font
License (fișierele `OFL-*.txt`). Includ diacriticele românești (ă, â, î, ș, ț).

## Publicare

Folderul `out/` poate fi pus pe orice găzduire statică (Netlify, Vercel, Cloudflare Pages,
GitHub Pages). Pentru pagina 404, găzduirea trebuie să servească `out/404.html`.
