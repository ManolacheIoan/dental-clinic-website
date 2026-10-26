import type { Metadata } from "next";
import Link from "next/link";
import { BrushingDemo } from "@/components/BrushingDemo";
import { Checklist } from "@/components/Checklist";
import { CtaBand } from "@/components/CtaBand";
import { BrushMascot, DentistMascot, Sparkle, ToothMascot } from "@/components/illustrations/Mascots";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Pentru copii",
  description: "Prima vizită la dentist pas cu pas, sfaturi pentru părinți, demonstrație de periaj și o listă de bifat pentru acasă.",
};

const tips = [
  { title: "De la primul dințișor", text: "Periați dinții bebelușului de cum apare primul, cu o periuță moale și o urmă de pastă." },
  { title: "Mazăre, nu munte", text: "Pentru copiii de peste 3 ani, ajunge pastă cu fluor cât un bob de mazăre." },
  { title: "Două minute, de două ori", text: "Dimineața și seara. O melodie preferată ține exact cât trebuie." },
  { title: "Adultul verifică", text: "Până pe la 7–8 ani, un adult repetă periajul sau măcar verifică." },
  { title: "Apa e cea mai bună", text: "Sucurile și ceaiurile îndulcite între mese hrănesc microbii care fac carii." },
  { title: "Gustări prietenoase", text: "Brânză, morcovi, mere: crocante și bune pentru dinți." },
  { title: "Vorbe liniștite", text: "Evitați „nu doare” sau „dacă nu te speli, te duc la dentist”. Dentistul e un prieten." },
  { title: "Control la 6 luni", text: "Vizitele dese și scurte îl obișnuiesc pe copil și prind problemele din timp." },
];

const firstVisit = [
  { title: "Povestim acasă", text: "Citiți împreună o poveste despre dinți sau jucați-vă „de-a dentistul” cu o jucărie." },
  { title: "Facem cunoștință", text: "Copilul ne cunoaște pe noi și pe Dințișor, se plimbă prin cabinet și pune întrebări." },
  { title: "Călătoria cu scaunul", text: "Scaunul urcă și coboară ca un lift. Lumina e „soarele” care ne ajută să vedem." },
  { title: "Numărăm dinții", text: "Cu oglinjoara, numărăm dinții. Copilul poate ține și el o oglindă în mână." },
  { title: "Diplomă de curaj", text: "La final, primește diploma și un sticker. Tratamentele, dacă sunt necesare, vin la vizita următoare." },
];

export default function KidsPage() {
  return (
    <>
      <PageHero
        title="Pentru copii"
        eyebrow="Dințișor și prietenii lui"
        lead="Vrem ca fiecare copil să plece de la noi zâmbind și să abia aștepte vizita următoare. Aici găsești tot ce te ajută să-l pregătești."
        art={
          <div className="kids-hero">
            <ToothMascot className="kids-hero__tooth float" />
            <BrushMascot className="kids-hero__brush float" />
            <Sparkle className="kids-hero__spark twinkle" />
          </div>
        }
      />

      <section className="section section--sun" aria-labelledby="titlu-prima-vizita">
        <div className="container service-detail">
          <Reveal>
            <span className="eyebrow">Pas cu pas</span>
            <h2 id="titlu-prima-vizita">Prima vizită</h2>
            <p className="lead">
              Prima vizită e doar de cunoaștere: fără ace, fără freză. Recomandăm să vină la noi cam de la 1 an sau
              când apare primul dințișor.
            </p>
            <DentistMascot className="first-visit__art float" />
          </Reveal>
          <Reveal delay={80}>
            <ol className="steps">
              {firstVisit.map((s) => (
                <li key={s.title} className="steps__item">
                  <h3 className="steps__title">{s.title}</h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="titlu-periaj">
        <div className="container">
          <Reveal className="section__head section__head--center">
            <span className="eyebrow">Hai să încercăm</span>
            <h2 id="titlu-periaj">Cum ne spălăm pe dinți</h2>
            <p className="lead">Urmărește periuța și vezi cum pleacă microbii, zonă cu zonă.</p>
          </Reveal>
          <Reveal>
            <BrushingDemo />
          </Reveal>
        </div>
      </section>

      <section className="section section--teal" aria-labelledby="titlu-sfaturi">
        <div className="container">
          <Reveal className="section__head">
            <span className="eyebrow">Pentru părinți</span>
            <h2 id="titlu-sfaturi">Sfaturi care chiar funcționează</h2>
          </Reveal>
          <ul className="grid grid--4 plain-list">
            {tips.map((t, i) => (
              <Reveal as="li" key={t.title} delay={(i % 4) * 70} className="tip-card">
                <span className="tip-card__num" aria-hidden="true">
                  {i + 1}
                </span>
                <h3>{t.title}</h3>
                <p>{t.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="titlu-lista">
        <div className="container service-detail">
          <Reveal>
            <span className="eyebrow">Pentru acasă</span>
            <h2 id="titlu-lista">Lista lui Dințișor</h2>
            <p className="lead">
              Bifați împreună în fiecare seară. Când toate sunt bifate, Dințișor face cu ochiul!
            </p>
            <p>
              Ai întrebări despre dinții celui mic? Vezi <Link href="/intrebari-frecvente/">întrebările frecvente</Link>{" "}
              sau află mai multe despre <Link href="/servicii/copii/">stomatologia pentru copii</Link>.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <Checklist />
          </Reveal>
        </div>
      </section>

      <CtaBand title="Programează vizita de acomodare" text="O jumătate de oră de joacă și cunoaștere, fără niciun tratament." service="copii" />
    </>
  );
}
