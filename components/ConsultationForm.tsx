"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { treatments } from "@/lib/treatments";
import { WHATSAPP_NUMBER } from "@/lib/clinic";

export function ConsultationForm({ dict }: { dict: Dictionary }) {
  const f = dict.contactPage.form;
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [treatment, setTreatment] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const lines = [
      dict.contactPage.waPrefill,
      "",
      name && `• ${f.name}: ${name}`,
      contact && `• ${f.contact}: ${contact}`,
      treatment && `• ${f.treatment}: ${treatment}`,
      message && `• ${f.message}: ${message}`,
    ].filter(Boolean);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  const field =
    "mt-2 w-full rounded-sm border border-sand bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-gold";
  const label = "text-xs tracking-[0.1em] uppercase text-taupe";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="cf-name" className={label}>{f.name}</label>
        <input
          id="cf-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={field}
        />
      </div>
      <div>
        <label htmlFor="cf-contact" className={label}>{f.contact}</label>
        <input
          id="cf-contact"
          type="text"
          required
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className={field}
        />
      </div>
      <div>
        <label htmlFor="cf-treatment" className={label}>{f.treatment}</label>
        <select
          id="cf-treatment"
          value={treatment}
          onChange={(e) => setTreatment(e.target.value)}
          className={field}
        >
          <option value="">{f.treatmentDefault}</option>
          {treatments.map((t) => {
            const name = dict.treatmentsMenu.items[t.key as keyof typeof dict.treatmentsMenu.items].name;
            return (
              <option key={t.slug} value={name}>
                {name}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <label htmlFor="cf-message" className={label}>{f.message}</label>
        <textarea
          id="cf-message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={f.messagePlaceholder}
          className={`${field} resize-none`}
        />
      </div>
      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-4 text-xs tracking-[0.14em] uppercase text-white transition-colors hover:bg-gold-deep"
      >
        <WhatsAppMark />
        {f.submit}
      </button>
      <p className="text-xs leading-relaxed text-taupe">{f.note}</p>
    </form>
  );
}

function WhatsAppMark() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 18a8 8 0 01-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1112 20zm4.4-6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.5 6.5 0 01-3.2-2.8c-.1-.2 0-.4.1-.5l.4-.5c.1-.1.1-.3 0-.4l-.7-1.7c-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.6.6-.8 1.4-.8 2.3.1 1.4 1 2.6 1.2 2.8 1.6 2.4 3.4 3.1 4.6 3.5 1.1.3 1.6.2 2 .1.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1l-.4-.2z" />
    </svg>
  );
}
