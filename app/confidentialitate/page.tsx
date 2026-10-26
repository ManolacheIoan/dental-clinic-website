import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { ShieldIcon } from "@/components/icons";
import { CLINIC_NAME, site } from "@/config/site";

export const metadata: Metadata = {
  title: "Politica de confidențialitate și cookie-uri",
  description: `Cum folosește ${CLINIC_NAME} datele personale și ce cookie-uri are site-ul.`,
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        title="Confidențialitate și cookie-uri"
        lead="Pe scurt: cerem doar datele de care avem nevoie ca să te programăm, nu le vindem nimănui și site-ul nu folosește cookie-uri de urmărire."
        art={
          <span className="privacy-art">
            <ShieldIcon />
          </span>
        }
      />
      <section className="section section--teal">
        <div className="container container--narrow prose">
          <p className="small">Ultima actualizare: octombrie 2026</p>

          <h2>1. Cine suntem</h2>
          <p>
            Operatorul datelor este clinica {CLINIC_NAME}, din {site.city}. Ne poți contacta pentru orice întrebare
            despre datele tale la <a href={`mailto:${site.email}`}>{site.email}</a> sau la{" "}
            <a href={site.phone.href}>{site.phone.display}</a>.
          </p>

          <h2>2. Ce date colectăm prin site</h2>
          <p>Doar când completezi formularul de programare:</p>
          <ul>
            <li>numele și prenumele;</li>
            <li>numărul de telefon;</li>
            <li>serviciul dorit și ziua preferată;</li>
            <li>mesajul opțional, dacă alegi să ne scrii ceva.</li>
          </ul>
          <p>
            Te rugăm să nu ne trimiți prin formular detalii medicale. Le discutăm la consultație, unde sunt protejate
            de secretul medical.
          </p>

          <h2>3. De ce le folosim</h2>
          <p>
            Folosim datele doar ca să te sunăm și să stabilim programarea. Temeiul legal este consimțământul tău și
            demersurile făcute la cererea ta înainte de un tratament (art. 6 alin. (1) lit. (a) și (b) din
            Regulamentul (UE) 2016/679, „GDPR”).
          </p>

          <h2>4. Cât timp le păstrăm</h2>
          <p>
            Datele din cererile de programare le păstrăm cel mult 6 luni, apoi le ștergem. Dacă devii pacient,
            fișa medicală se păstrează pe durata prevăzută de legislația medicală în vigoare.
          </p>

          <h2>5. Cu cine le împărtășim</h2>
          <p>
            Nu vindem și nu închiriem datele nimănui. Pentru a primi cererile de programare putem folosi un furnizor
            de formulare online sau de email, care prelucrează datele doar în numele nostru și conform unui contract.
          </p>

          <h2>6. Drepturile tale</h2>
          <p>
            Ai dreptul să ceri acces la date, rectificarea sau ștergerea lor, restricționarea prelucrării, să te opui
            prelucrării și să îți retragi consimțământul oricând. Ne poți scrie la adresa de mai sus. De asemenea, poți
            depune o plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal
            (ANSPDCP).
          </p>

          <h2 id="cookie-uri">7. Cookie-uri</h2>
          <p>
            Acest site <strong>nu folosește cookie-uri</strong> de analiză, de publicitate sau de urmărire și nu
            încarcă scripturi de la terți. Fonturile și ilustrațiile sunt găzduite pe același server ca site-ul, deci
            vizita ta nu este raportată altor companii. Din acest motiv nu îți cerem acordul pentru cookie-uri.
          </p>
          <p>
            Dacă vom adăuga vreodată instrumente care folosesc cookie-uri, vom actualiza această pagină și îți vom cere
            acordul înainte.
          </p>

          <h2>8. Modificări</h2>
          <p>
            Putem actualiza această politică; data ultimei modificări apare la începutul paginii. Pentru întrebări,{" "}
            <Link href="/contact/">contactează-ne</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
