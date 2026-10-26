/**
 * Serviciile clinicii. Textele și prețurile se editează aici;
 * paginile /servicii, /servicii/<slug> și /preturi se generează din această listă.
 * Prețurile sunt orientative, în lei.
 */

export type ServiceArtKey =
  | "consultatii"
  | "igienizare"
  | "carii"
  | "ortodontie"
  | "copii"
  | "albire"
  | "implanturi";

export type PriceItem = { label: string; price: string; note?: string };

export type Service = {
  slug: string;
  name: string;
  /** O frază pentru carduri. */
  short: string;
  /** Paragraful de deschidere al paginii serviciului. */
  intro: string;
  forWho: string[];
  steps: { title: string; text: string }[];
  duration: string;
  tip: string;
  art: ServiceArtKey;
  tone: "teal" | "sun" | "coral";
  prices: PriceItem[];
};

export const services: Service[] = [
  {
    slug: "consultatii",
    name: "Consultații",
    short: "Verificăm fiecare dinte, îți explicăm ce vedem și facem împreună un plan clar.",
    intro:
      "Prima întâlnire e despre a ne cunoaște. Ascultăm ce te supără, verificăm dinții și gingiile și îți arătăm pe ecran tot ce găsim. Pleci acasă cu un plan de tratament scris, cu priorități și costuri estimate.",
    forWho: [
      "Ai o durere sau o sensibilitate nouă",
      "Nu ai mai fost la dentist de peste un an",
      "Vrei o a doua opinie pentru un tratament",
    ],
    steps: [
      { title: "Discutăm", text: "Ne spui ce te deranjează și ce îți dorești de la zâmbetul tău." },
      { title: "Verificăm", text: "Examinăm dinții, gingiile și mușcătura; la nevoie facem o radiografie." },
      { title: "Explicăm", text: "Îți arătăm imaginile și îți spunem pe înțeles ce opțiuni ai." },
      { title: "Planificăm", text: "Primești planul scris, cu etape, durate și prețuri estimate." },
    ],
    duration: "30–45 de minute",
    tip: "Adu cu tine lista medicamentelor pe care le iei și radiografiile mai vechi, dacă le ai.",
    art: "consultatii",
    tone: "teal",
    prices: [
      { label: "Consultație și plan de tratament", price: "150 lei" },
      { label: "Radiografie retroalveolară", price: "50 lei" },
      { label: "Radiografie panoramică", price: "120 lei" },
      { label: "A doua opinie (cu analiza radiografiilor aduse)", price: "120 lei" },
    ],
  },
  {
    slug: "igienizare",
    name: "Igienizare",
    short: "Detartraj, periaj profesional și air-flow pentru dinți curați și gingii sănătoase.",
    intro:
      "Chiar și cu periaj atent, tartrul se adună în locurile greu de ajuns. Igienizarea profesională îl îndepărtează blând, lustruiește dinții și te ajută să previi cariile și problemele gingiilor.",
    forWho: [
      "Toată lumea, de două ori pe an",
      "Gingii care sângerează la periaj",
      "Pete de la cafea, ceai sau fumat",
    ],
    steps: [
      { title: "Detartraj", text: "Îndepărtăm tartrul cu ultrasunete, cu grijă la gingii." },
      { title: "Air-flow", text: "Un jet fin de apă și pulbere curăță petele dintre dinți." },
      { title: "Periaj profesional", text: "Lustruim suprafețele ca placa să se prindă mai greu." },
      { title: "Sfaturi", text: "Îți arătăm tehnica de periaj și ața dentară potrivite pentru tine." },
    ],
    duration: "45–60 de minute",
    tip: "După igienizare, evită o oră cafeaua, ceaiul negru și alimentele colorate.",
    art: "igienizare",
    tone: "sun",
    prices: [
      { label: "Igienizare completă (detartraj, air-flow, periaj)", price: "300 lei" },
      { label: "Igienizare pentru copii", price: "180 lei" },
      { label: "Fluorizare", price: "100 lei" },
    ],
  },
  {
    slug: "tratamente-carii",
    name: "Tratamente carii",
    short: "Plombe estetice, de culoarea dintelui, și tratamente de canal fără grabă.",
    intro:
      "Prinsă din timp, o carie se tratează simplu și rapid. Curățăm zona afectată sub anestezie locală și refacem dintele cu materiale compozite, în nuanța dinților tăi. Când nervul e afectat, facem tratament de canal cu instrumente moderne.",
    forWho: [
      "Sensibilitate la dulce, rece sau cald",
      "O pată închisă sau o gaură vizibilă",
      "O plombă veche care s-a fisurat",
    ],
    steps: [
      { title: "Anestezie blândă", text: "Folosim mai întâi un gel care amorțește, apoi anestezia locală." },
      { title: "Curățare", text: "Îndepărtăm doar țesutul afectat și păstrăm cât mai mult din dinte." },
      { title: "Refacere", text: "Construim dintele în straturi, cu material de aceeași culoare." },
      { title: "Lustruire", text: "Verificăm mușcătura și lustruim până se simte natural." },
    ],
    duration: "30–90 de minute, în funcție de carie",
    tip: "Nu mânca până nu trece amorțeala, ca să nu-ți muști obrazul fără să simți.",
    art: "carii",
    tone: "coral",
    prices: [
      { label: "Obturație compozit (plombă) mică", price: "250 lei" },
      { label: "Obturație compozit medie sau mare", price: "350 lei" },
      { label: "Tratament de canal", price: "de la 350 lei", note: "per canal" },
      { label: "Reconstituire dinte după tratament de canal", price: "400 lei" },
    ],
  },
  {
    slug: "ortodontie",
    name: "Ortodonție",
    short: "Aparate dentare fixe, estetice sau gutiere transparente, pentru copii și adulți.",
    intro:
      "Dinții aliniați arată bine, dar mai ales se curăță mai ușor și se uzează mai puțin. Evaluăm mușcătura și alegem împreună soluția potrivită: aparat fix metalic, ceramic sau gutiere transparente.",
    forWho: [
      "Dinți înghesuiți sau cu spații între ei",
      "Copii de la 7 ani, pentru o evaluare timpurie",
      "Adulți care vor o soluție discretă",
    ],
    steps: [
      { title: "Evaluare", text: "Fotografii, radiografii și amprente sau scanare digitală." },
      { title: "Plan", text: "Îți arătăm cum se vor muta dinții și cât durează tratamentul." },
      { title: "Montare", text: "Montăm aparatul și îți explicăm cum îl îngrijești." },
      { title: "Controale", text: "Ne vedem cam o dată pe lună pentru ajustări." },
    ],
    duration: "de obicei 12–24 de luni",
    tip: "Cu aparat fix, o periuță interdentară mică devine cea mai bună prietenă.",
    art: "ortodontie",
    tone: "teal",
    prices: [
      { label: "Consultație ortodontică și studiu de caz", price: "250 lei" },
      { label: "Aparat fix metalic", price: "3.000 lei", note: "per arcadă" },
      { label: "Aparat fix ceramic (estetic)", price: "4.000 lei", note: "per arcadă" },
      { label: "Gutiere transparente", price: "de la 9.000 lei" },
      { label: "Control și activare aparat", price: "200 lei" },
    ],
  },
  {
    slug: "copii",
    name: "Copii (pedodonție)",
    short: "Vizite fără emoții pentru cei mici: joacă, explicații pe înțeles și multă răbdare.",
    intro:
      "Pentru copii, prima experiență la dentist contează enorm. Începem cu o vizită de acomodare, în care cel mic se joacă pe scaun, numără dinții cu oglinjoara și cunoaște instrumentele. Tratamentele vin abia după ce se simte în siguranță.",
    forWho: [
      "Copii de la primul dințișor (cam de la 1 an)",
      "Copii care au emoții sau o experiență neplăcută",
      "Prevenție: sigilări și fluorizare",
    ],
    steps: [
      { title: "Acomodare", text: "Facem cunoștință, ne jucăm și numărăm dinții împreună." },
      { title: "Spune, arată, fă", text: "Explicăm, arătăm pe deget sau pe o jucărie, apoi facem." },
      { title: "Prevenție", text: "Sigilăm șanțurile dinților noi și aplicăm fluor." },
      { title: "Lăudăm", text: "Fiecare vizită se termină cu o diplomă de curaj." },
    ],
    duration: "20–40 de minute",
    tip: "Vorbiți acasă despre dentist cu cuvinte liniștite și evitați „nu o să doară”.",
    art: "copii",
    tone: "sun",
    prices: [
      { label: "Vizită de acomodare", price: "80 lei" },
      { label: "Consultație copii", price: "100 lei" },
      { label: "Sigilare", price: "120 lei", note: "per dinte" },
      { label: "Obturație dinte de lapte", price: "180 lei" },
      { label: "Extracție dinte de lapte", price: "120 lei" },
    ],
  },
  {
    slug: "albire",
    name: "Albire",
    short: "Dinți cu câteva nuanțe mai deschise, în siguranță, în cabinet sau acasă.",
    intro:
      "Albirea profesională deschide nuanța dinților fără să le afecteze smalțul. Verificăm mai întâi dinții și facem igienizarea, apoi alegem între albirea în cabinet, rapidă, și cea acasă, cu gutiere făcute pe măsura ta.",
    forWho: [
      "Adulți cu dinți sănătoși",
      "Dinți îngălbeniți în timp sau de la cafea",
      "Înainte de un eveniment important",
    ],
    steps: [
      { title: "Verificare", text: "Ne asigurăm că nu există carii sau sensibilitate netratată." },
      { title: "Igienizare", text: "Dinții curați se albesc uniform." },
      { title: "Albire", text: "În cabinet, cam o oră; sau acasă, cu gutiere, 1–2 săptămâni." },
      { title: "Menținere", text: "Îți spunem ce să eviți ca rezultatul să dureze." },
    ],
    duration: "aproximativ 90 de minute în cabinet",
    tip: "Plombele și coroanele nu se albesc; discutăm dinainte dacă e cazul.",
    art: "albire",
    tone: "coral",
    prices: [
      { label: "Albire în cabinet", price: "1.200 lei" },
      { label: "Albire acasă (gutiere + gel)", price: "900 lei" },
      { label: "Gel suplimentar pentru întreținere", price: "150 lei" },
    ],
  },
  {
    slug: "implanturi",
    name: "Implanturi",
    short: "Înlocuim dinții lipsă cu implanturi și coroane care arată și se simt natural.",
    intro:
      "Un implant este o rădăcină artificială din titan, pe care se fixează o coroană. Planificăm totul cu tomografie 3D, ca intervenția să fie precisă și cât mai confortabilă, apoi te însoțim până la coroana finală.",
    forWho: [
      "Unul sau mai mulți dinți lipsă",
      "O punte sau o proteză care nu mai e confortabilă",
      "Adulți cu o stare generală de sănătate bună",
    ],
    steps: [
      { title: "Planificare 3D", text: "Tomografia ne arată exact osul disponibil." },
      { title: "Inserare", text: "Fixăm implantul sub anestezie locală, de obicei în sub o oră." },
      { title: "Vindecare", text: "Așteptăm 3–4 luni să se integreze; între timp poți avea un dinte provizoriu." },
      { title: "Coroana", text: "Montăm coroana finală, în nuanța dinților tăi." },
    ],
    duration: "3–6 luni de la început până la coroana finală",
    tip: "În primele zile după intervenție, mestecă pe partea cealaltă și evită fumatul.",
    art: "implanturi",
    tone: "teal",
    prices: [
      { label: "Consultație implantologie și tomografie 3D", price: "300 lei" },
      { label: "Implant dentar (fără coroană)", price: "de la 2.500 lei" },
      { label: "Coroană pe implant", price: "de la 2.000 lei" },
      { label: "Adiție osoasă", price: "de la 1.500 lei" },
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
