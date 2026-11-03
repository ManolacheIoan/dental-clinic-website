import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { ViewTransition } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MobileCallBar } from "@/components/MobileCallBar";
import { CLINIC_NAME, site } from "@/config/site";
import "./globals.css";

// Fonturi găzduite local: Baloo 2 (titluri rotunjite) și Nunito Sans (text). Ambele au ă, â, î, ș, ț.
// Fiecare are fișier „latin” + „latin-ext” (pentru ă, ș, ț). Fișierul „latin” nu are font de rezervă,
// altfel browserul ar lua diacriticele din Arial în loc să treacă la fișierul „latin-ext”.
const display = localFont({
  src: "./fonts/baloo-2-latin-wght-normal.woff2",
  weight: "400 800",
  variable: "--font-display-latin",
  display: "swap",
  fallback: [],
  adjustFontFallback: false,
});
const displayExt = localFont({
  src: "./fonts/baloo-2-latin-ext-wght-normal.woff2",
  weight: "400 800",
  variable: "--font-display-ext",
  display: "swap",
});
const text = localFont({
  src: "./fonts/nunito-sans-latin-wght-normal.woff2",
  weight: "200 1000",
  variable: "--font-text-latin",
  display: "swap",
  fallback: [],
  adjustFontFallback: false,
});
const textExt = localFont({
  src: "./fonts/nunito-sans-latin-ext-wght-normal.woff2",
  weight: "200 1000",
  variable: "--font-text-ext",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: `${CLINIC_NAME} — ${site.tagline}`, template: `%s | ${CLINIC_NAME}` },
  description: `${CLINIC_NAME}: stomatologie prietenoasă pentru copii și adulți în ${site.city}. Consultații, igienizare, ortodonție, pedodonție, albire și implanturi.`,
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  icons: { icon: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/icon.svg` },
};

export const viewport: Viewport = {
  themeColor: "#FFF8EE",
  colorScheme: "light",
};

const fontVars = [display, displayExt, text, textExt].map((f) => f.variable).join(" ");

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro" className={fontVars} suppressHydrationWarning>
      <head>
        {/* Marchează că JavaScript rulează, ca animațiile de apariție să nu ascundă nimic fără JS. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a href="#continut" className="skip-link">
          Sari la conținut
        </a>
        <Header />
        <ViewTransition default="pagina">
          <main id="continut" tabIndex={-1}>
            {children}
          </main>
        </ViewTransition>
        <Footer />
        <MobileCallBar />
      </body>
    </html>
  );
}
