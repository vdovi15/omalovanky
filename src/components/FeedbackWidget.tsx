"use client";

import { useRef, useState, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import { useSelection } from "@/components/SelectionContext";
import { track } from "@/lib/analytics";
import type { Locale } from "@/lib/i18n";
import type { Dict } from "@/lib/dict";

const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";
const RATINGS = ["😍", "🙂", "😐", "🙁"] as const;

type Status = "idle" | "sending" | "sent" | "error";

type Props = {
  dict: Dict["feedback"];
  lang: Locale;
};

export function FeedbackWidget({ dict, lang }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  const { items } = useSelection();
  const [rating, setRating] = useState<string>("");
  const [status, setStatus] = useState<Status>("idle");

  if (!ACCESS_KEY) return null;

  function open() {
    if (status === "sent") {
      setStatus("idle");
      setRating("");
    }
    dialogRef.current?.showModal();
  }

  function close() {
    dialogRef.current?.close();
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("botcheck")) return;

    data.append("access_key", ACCESS_KEY);
    data.append("subject", `Feedback (${lang}) – ${rating || "bez hodnocení"}`);
    data.append("from_name", "Omalovánky feedback");
    data.append("rating", rating);
    data.append("page", pathname);
    data.append("lang", lang);

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
      const json: { success?: boolean } = await res.json();
      if (!json.success) throw new Error("submit failed");
      setStatus("sent");
      form.reset();
      track.feedback(rating);
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <button
        className={`feedback-fab${items.length > 0 ? " feedback-fab-raised" : ""}`}
        type="button"
        onClick={open}
        aria-haspopup="dialog"
      >
        <span aria-hidden="true">💬</span>
        <span className="feedback-fab-label">{dict.button}</span>
      </button>

      <dialog
        ref={dialogRef}
        className="feedback-dialog"
        aria-labelledby="feedback-title"
        onClick={e => { if (e.target === e.currentTarget) close(); }}
      >
        <div className="feedback-panel">
          <button className="feedback-close" type="button" onClick={close} aria-label={dict.close}>×</button>
          <h2 id="feedback-title" className="feedback-title">{dict.title}</h2>

          {status === "sent" ? (
            <div className="feedback-done">
              <p>{dict.thanks}</p>
              <button className="button button-primary" type="button" onClick={close}>{dict.close}</button>
            </div>
          ) : (
            <form className="feedback-form" onSubmit={handleSubmit}>
              <p className="feedback-intro">{dict.intro}</p>

              <fieldset className="feedback-rating">
                <legend>{dict.ratingLabel}</legend>
                {RATINGS.map(r => (
                  <button
                    key={r}
                    type="button"
                    className={`feedback-rating-option${rating === r ? " is-active" : ""}`}
                    aria-pressed={rating === r}
                    onClick={() => setRating(rating === r ? "" : r)}
                  >
                    {r}
                  </button>
                ))}
              </fieldset>

              <label className="feedback-field">
                <span>{dict.messageLabel}</span>
                <textarea name="message" required maxLength={2000} rows={5} placeholder={dict.messagePlaceholder} />
              </label>

              <label className="feedback-field">
                <span>{dict.emailLabel}</span>
                <input name="email" type="email" autoComplete="email" placeholder={dict.emailPlaceholder} />
              </label>

              <input type="checkbox" name="botcheck" className="feedback-honeypot" tabIndex={-1} autoComplete="off" />

              {status === "error" && <p className="feedback-error" role="alert">{dict.error}</p>}

              <button className="button button-primary" type="submit" disabled={status === "sending"}>
                {status === "sending" ? dict.sending : dict.submit}
              </button>
            </form>
          )}
        </div>
      </dialog>
    </>
  );
}
