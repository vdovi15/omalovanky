"use client";

import Link from "next/link";
import type { Dict } from "@/lib/dict";
import { track } from "@/lib/analytics";

type ArtworkActionsProps = {
  imageUrl: string;
  title: string;
  detailHref?: string;
  compact?: boolean;
  dict?: Dict["artwork"];
};

const DEFAULT_DICT: Dict["artwork"] = {
  viewTitle: "Zobrazit",
  printTitle: "Tisk",
  downloadTitle: "Stáhnout",
};

const IconEye = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const IconPrint = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

export function ArtworkActions({ imageUrl, title, detailHref, compact = false, dict = DEFAULT_DICT }: ArtworkActionsProps) {
  function handlePrint() {
    const absoluteUrl = imageUrl.startsWith("http")
      ? imageUrl
      : `${window.location.origin}${imageUrl}`;

    track.print(imageUrl, title);

    // Open a new window with just the image — must be synchronous (direct click)
    // so iOS Safari allows it. The onload in the new window triggers print.
    const win = window.open("", "_blank");
    if (win) {
      win.document.write(`<!doctype html><html><head><title>${title}</title><style>*{margin:0;padding:0;box-sizing:border-box}@page{margin:10mm}body{display:flex;align-items:center;justify-content:center;min-height:100vh;background:#fff}img{max-width:100%;max-height:100vh;object-fit:contain;display:block}</style></head><body><img src="${absoluteUrl}" alt="${title}" onload="window.print()" /></body></html>`);
      win.document.close();
      return;
    }

    // Fallback for popup blockers: @media print CSS injection
    const style = document.createElement("style");
    style.innerHTML = `@media print{@page{margin:10mm}body>*:not(#__pf__){display:none!important}html,body{height:auto!important;overflow:hidden!important;margin:0!important;padding:0!important}#__pf__{display:flex!important;align-items:center!important;justify-content:center!important;width:100%!important}#__pf__ img{max-width:100%!important;height:auto!important}}`;
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
        <Link className="icon-button" href={detailHref} title={dict.viewTitle}>
          <IconEye />
        </Link>
      ) : null}
      <button className="icon-button icon-button-primary" type="button" onClick={handlePrint} title={dict.printTitle}>
        <IconPrint />
      </button>
      <a className="icon-button" href={imageUrl} download title={dict.downloadTitle} onClick={() => track.download(imageUrl, title)}>
        <IconDownload />
      </a>
    </div>
  );
}
