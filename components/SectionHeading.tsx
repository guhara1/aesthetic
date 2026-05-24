type Props = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  tone?: "dark" | "light";
};

// Consistent premium section header: gold flanking rules + eyebrow, serif title.
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  tone = "dark",
}: Props) {
  const centered = align === "center";
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <span
        className={`inline-flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-gold ${
          centered ? "justify-center" : ""
        }`}
      >
        <span className="h-px w-8 bg-gold/40" />
        {eyebrow}
        {centered && <span className="h-px w-8 bg-gold/40" />}
      </span>
      <h2
        className={`mt-6 font-display text-[2.1rem] leading-[1.12] text-balance break-keep sm:text-4xl lg:text-[2.9rem] ${
          tone === "light" ? "text-ivory" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-5 text-base leading-relaxed ${
            tone === "light" ? "text-ivory/70" : "text-ink-soft"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
