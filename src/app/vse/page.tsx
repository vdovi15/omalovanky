import type { Metadata } from "next";
import { ColoringGrid } from "@/components/ColoringGrid";
import { getColoringPages } from "@/lib/content";

export const metadata: Metadata = {
  robots: { index: false },
  title: "Všechny omalovánky zdarma k tisku",
  description: "Procházejte všechny omalovánky zdarma ke stažení a tisku. Zvířata, auta, dinosauři, vesmír a dalších 10 kategorií pro děti.",
};

export default function VsePage() {
  const pages = getColoringPages();

  return (
    <div className="page-stack">
      <section className="category-hero">
        <p className="eyebrow">Kolekce</p>
        <h1>Všechny omalovánky</h1>
        <p>Celkem {pages.length} omalovánek zdarma ke stažení a tisku.</p>
      </section>

      <section className="section">
        <ColoringGrid pages={pages} lang="cs" />
      </section>
    </div>
  );
}
