import { Suspense } from "react";
import type { Metadata } from "next";
import { SearchResults } from "@/components/SearchResults";

export const metadata: Metadata = {
  title: "Hledání omalovánek",
};

export default function HledatPage() {
  return (
    <Suspense fallback={<p style={{ padding: "40px" }}>Načítám...</p>}>
      <SearchResults />
    </Suspense>
  );
}
