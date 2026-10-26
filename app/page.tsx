import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { HeroScene } from "@/components/HeroScene";
import { ArrowIcon, CalendarIcon, HeartIcon, PhoneIcon, ShieldIcon, SmileIcon, SparkIcon } from "@/components/icons";
import { Avatar } from "@/components/illustrations/Avatar";
import { BrushMascot, Sparkle, ToothMascot } from "@/components/illustrations/Mascots";
import { Reveal } from "@/components/Reveal";
import { ServiceCard } from "@/components/ServiceCard";
import { CLINIC_NAME, site } from "@/config/site";
import { services } from "@/data/services";
import { team } from "@/data/team";

const reasons = [
  {
    icon: SmileIcon,
    title: "Explicăm tot, pe înțeles",
    text: "Vezi pe ecran ce vedem noi și afli ce urmează înainte să înceapă orice tratament.",
  },
  {
    icon: HeartIcon,
    title: "Prieteni cu cei mici",
    text: "Vizite de acomodare, cabinet colorat și diplome de curaj. Copiii vin cu zâmbetul pe buze.",
  },
  {
    icon: ShieldIcon,
    title: "Blând și sigur",
    text: "Anestezie cu gel înainte de înțepătură, sterilizare atentă și materiale de calitate.",
  },
  {
    icon: SparkIcon,
    title: "Prețuri clare",
    text: "Primești planul de tratament scris, cu prețuri, înainte să începem. Fără surprize.",
  },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__text">
            <span className="eyebrow">Clinică stomatologică în {site.city}</span>
            <h1>
              Zâmbete mari pentru <span className="hero__accent">toată familia</span>
            </h1>
            <p className="lead">
              La {CLINIC_NAME} ne ocupăm de dinții copiilor și ai părinților cu răbdare, blândețe și explicații pe
              înțeles. Fără grabă, fără emoții.
            </p>
            <div className="hero__actions">
              <Link href="/programare/" className="btn btn--sun">
                <CalendarIcon /> Programează-te
              </Link>
              <a href={site.phone.href} className="btn btn--light">
                <PhoneIcon /> Sună acum
              </a>
            </div>
            <ul className="hero__facts">
              <li>Copii de la primul dințișor</li>
              <li>Program și sâmbăta</li>
              <li>Plan de tratament scris</li>
            </ul>
          </div>
          <HeroScene />
        </div>
      </section>

      <section className="section section--teal" aria-labelledby="titlu-servicii">
        <div className="container">
          <Reveal className="section__head">
            <span className="eyebrow">Servicii</span>
            <h2 id="titlu-servicii">Tot ce are nevoie zâmbetul tău</h2>
            <p className="lead">De la controlul de rutină la aparate dentare și implanturi, sub același acoperiș.</p>
          </Reveal>
          <ul className="grid grid--4 plain-list">
            {services.map((s, i) => (
              <Reveal as="li" key={s.slug} delay={(i % 4) * 70}>
                <ServiceCard service={s} />
              </Reveal>
            ))}
            <Reveal as="li" delay={210}>
              <div className="more-card">
                <BrushMascot className="more-card__art" />
                <p>Nu știi ce ți-ar trebui? Începe cu o consultație.</p>
                <Link href="/servicii/" className="link-arrow">
                  Toate serviciile <ArrowIcon />
                </Link>
              </div>
            </Reveal>
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="titlu-de-ce">
        <div className="container">
          <Reveal className="section__head section__head--center">
            <span className="eyebrow">De ce noi</span>
            <h2 id="titlu-de-ce">Un dentist la care chiar vrei să revii</h2>
          </Reveal>
          <ul className="grid grid--4 plain-list">
            {reasons.map((r, i) => (
              <Reveal as="li" key={r.title} delay={i * 80} className="reason">
                <span className={`reason__icon reason__icon--${i}`}>
                  <r.icon />
                </span>
                <h3>{r.title}</h3>
                <p>{r.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--sun" aria-labelledby="titlu-copii">
        <div className="container kids-teaser">
          <Reveal className="kids-teaser__art">
            <ToothMascot className="kids-teaser__tooth float" mood="wink" />
            <Sparkle className="kids-teaser__spark twinkle" color="#FF7A6B" />
          </Reveal>
          <Reveal delay={80}>
            <span className="eyebrow">Pentru copii</span>
            <h2 id="titlu-copii">Prima vizită? O facem distractivă!</h2>
            <p className="lead">
              Dințișor și prietenii lui îi învață pe cei mici cum se periază corect. Află cum pregătești prima vizită,
              ce sfaturi funcționează acasă și încearcă demonstrația de periaj.
            </p>
            <Link href="/pentru-copii/" className="btn">
              Pagina pentru copii <ArrowIcon />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="titlu-echipa">
        <div className="container">
          <Reveal className="section__head">
            <span className="eyebrow">Echipa</span>
            <h2 id="titlu-echipa">Oameni pe care îi știi pe nume</h2>
            <p className="lead">Medici cu domenii diferite, care lucrează împreună pentru zâmbetul tău.</p>
          </Reveal>
          <ul className="team-teaser plain-list">
            {team.slice(0, 4).map((m, i) => (
              <Reveal as="li" key={m.name} delay={i * 70} className="team-teaser__item">
                <Avatar look={m.look} id={`acasa-${i}`} className="team-teaser__avatar" />
                <span className="team-teaser__name">{m.name}</span>
                <span className="team-teaser__role">{m.focus}</span>
              </Reveal>
            ))}
          </ul>
          <Link href="/echipa/" className="link-arrow">
            Cunoaște toată echipa <ArrowIcon />
          </Link>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
