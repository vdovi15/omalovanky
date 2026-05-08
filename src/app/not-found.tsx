import Link from "next/link";

export default function NotFoundPage() {
  return (
    <section className="empty-state">
      <p className="eyebrow">Stránka nenalezena</p>
      <h1>Tato omalovánka se ztratila.</h1>
      <p>Zkuste některou z kategorií níže.</p>
      <Link className="button button-primary" href="/">
        Zpět na úvod
      </Link>
    </section>
  );
}
