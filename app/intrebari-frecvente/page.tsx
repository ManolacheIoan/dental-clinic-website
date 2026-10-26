import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { FaqList } from "@/components/FaqList";
import { BrushMascot } from "@/components/illustrations/Mascots";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Întrebări frecvente",
  description: "Răspunsuri despre programări, copii, tratamente, albire, implanturi și plată.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        title="Întrebări frecvente"
        eyebrow="Întreabă-ne orice"
        lead="Am adunat aici întrebările pe care le auzim cel mai des. Dacă nu găsești răspunsul, sună-ne."
        art={<BrushMascot className="float" />}
      />
      <section className="section section--teal">
        <div className="container container--narrow">
          <FaqList />
        </div>
      </section>
      <CtaBand title="Ai altă întrebare?" text="Sună-ne în timpul programului. Îți răspundem cu drag, fără să te grăbim." />
    </>
  );
}
