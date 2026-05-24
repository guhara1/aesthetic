import type { Dictionary } from "@/lib/i18n/dictionaries";
import { SectionHeading } from "./SectionHeading";

export function Approach({ dict }: { dict: Dictionary }) {
  return (
    <section id="approach" className="scroll-mt-24 bg-ivory py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow={dict.approach.eyebrow}
          title={dict.approach.title}
          subtitle={dict.approach.subtitle}
          align="left"
        />

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
