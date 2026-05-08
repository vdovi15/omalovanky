"use client";

import Link from "next/link";

type ArtworkActionsProps = {
  imageUrl: string;
  title: string;
  detailHref?: string;
  compact?: boolean;
};


const IconEye = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const IconPrint = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 6 2 18 2 18 9"/>
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
    <rect x="6" y="14" width="12" height="8"/>
  </svg>
);

const IconDownload = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

export function ArtworkActions({
  imageUrl,
  title,
  detailHref,
  compact = false
}: ArtworkActionsProps) {
  function handlePrint() {
    const absoluteUrl = imageUrl.startsWith("http")
      ? imageUrl
      : `${window.location.origin}${imageUrl}`;

    const style = document.createElement("style");
    style.innerHTML = `@media print { @page { margin: 10mm; } body > *:not(#__pf__) { display: none !important; } html, body { height: auto !important; overflow: hidden !important; margin: 0 !important; padding: 0 !important; } #__pf__ { display: flex !important; align-items: center !important; justify-content: center !important; width: 100% !important; } #__pf__ img { max-width: 100% !important; height: auto !important; } }`;
    document.head.appendChild(style);

    const el = document.createElement("div");
    el.id = "__pf__";
    el.style.cssText = "display:none";
    document.body.appendChild(el);

    const img = new Image();
    img.style.cssText = "max-width:100%;max-height:100vh;object-fit:contain";
    img.alt = title;

    function cleanup() {
      document.body.removeChild(el);
      document.head.removeChild(style);
      window.removeEventListener("afterprint", cleanup);
    }

    img.onload = () => {
      el.appendChild(img);
      window.addEventListener("afterprint", cleanup);
      window.print();
    };

    img.onerror = cleanup;
    img.src = absoluteUrl;
  }

  return (
    <div className={`artwork-actions${compact ? " artwork-actions-compact" : ""}`}>
      {detailHref ? (
        <Link className="icon-button" href={detailHref} title="Zobrazit">
          <IconEye />
        </Link>
      ) : null}
      <button className="icon-button icon-button-primary" type="button" onClick={handlePrint} title="Tisk">
        <IconPrint />
      </button>
      <a className="icon-button" href={imageUrl} download title="Stáhnout">
        <IconDownload />
      </a>
    </div>
  );
}
