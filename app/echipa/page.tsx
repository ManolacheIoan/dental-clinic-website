import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { Avatar } from "@/components/illustrations/Avatar";
import { DentistMascot } from "@/components/illustrations/Mascots";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CLINIC_NAME } from "@/config/site";
import { team } from "@/data/team";

export const metadata: Metadata = {
  title: "Echipa",
  description: `Medicii și echipa ${CLINIC_NAME}: pedodonție, ortodonție, endodonție, implantologie și igienă dentară.`,
};

export default function TeamPage() {
  return (
    <>
      <PageHero
        title="Echipa"
        eyebrow="Oameni blânzi, mâini sigure"
        lead="Suntem o echipă mică, așa că ne cunoaștem pacienții pe nume. Fiecare medic are domeniul lui, iar cazurile mai complicate le discutăm împreună."
        art={<DentistMascot className="float" />}
      />
      <section className="section section--teal">
        <div className="container">
          <ul className="grid grid--3 plain-list">
            {team.map((m, i) => (
              <Reveal as="li" key={m.name} delay={(i % 3) * 80}>
                <article className="member">
                  <Avatar look={m.look} id={`echipa-${i}`} className="member__avatar" />
                  <h2 className="member__name">{m.name}</h2>
                  <p className="member__role">{m.role}</p>
                  <p className="member__focus">
                    <span>Se ocupă de:</span> {m.focus}
                  </p>
                  <p>{m.bio}</p>
                  <p className="member__fun">
                    <strong>Știai că?</strong> {m.fun}
                  </p>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand title="Vino să ne cunoști" text="Spune-ne la programare dacă preferi un anumit medic. Ne organizăm cu drag." />
    </>
  );
}
