import { Suspense } from "react";
import type { Metadata } from "next";
import { SearchResults } from "@/components/SearchResults";
import csDict from "@/i18n/cs.json";

export const metadata: Metadata = { title: "Hledání omalovánek", robots: { index: false } };

export default function HledatPage() {
  return (
    <Suspense fallback={<p style={{ padding: "40px" }}>Načítám...</p>}>
      <SearchResults
        lang="cs"
        dict={csDict.search}
        dictCategories={csDict.categories}
        dictAgeLabels={csDict.ageLabels}
      />
    </Suspense>
  );
}
