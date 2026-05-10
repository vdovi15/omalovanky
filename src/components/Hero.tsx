import type { Dict } from "@/lib/dict";

type HeroDict = Dict["hero"];

export function Hero({ dict }: { dict: HeroDict }) {
  return (
    <section className="hero">
      <p className="eyebrow">{dict.eyebrow}</p>
      <h1>{dict.heading}</h1>
      <p className="hero-text">{dict.text}</p>
    </section>
  );
}
