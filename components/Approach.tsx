import type { Dictionary } from "@/lib/i18n/dictionaries";

export function Approach({ dict }: { dict: Dictionary }) {
  return (
    <section id="approach" className="scroll-mt-24 bg-ivory py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-[11px] tracking-[0.28em] uppercase text-gold">
            {dict.approach.eyebrow}
          </p>
          <h2 className="mt-5 font-display text-4xl leading-tight text-ink text-balance lg:text-5xl">
            {dict.approach.title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-soft">
            {dict.approach.subtitle}
          </p>
        </div>

        <ol className="mt-16 grid gap-px overflow-hidden rounded-sm border border-sand bg-sand sm:grid-cols-2 lg:grid-cols-4">
          {dict.approach.steps.map((step, i) => (
            <li key={i} className="flex flex-col bg-ivory p-8">
              <span className="font-display text-3xl text-gold/50">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-2xl leading-tight text-ink">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-taupe">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
