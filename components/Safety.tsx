import type { Dictionary } from "@/lib/i18n/dictionaries";

export function Safety({ dict }: { dict: Dictionary }) {
  return (
    <section id="safety" className="scroll-mt-24 bg-ink py-24 text-ivory lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-5">
          <p className="text-[11px] tracking-[0.28em] uppercase text-gold">
            {dict.safety.eyebrow}
          </p>
          <h2 className="mt-5 font-display text-4xl leading-tight text-ivory text-balance lg:text-5xl">
            {dict.safety.title}
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ivory/70">
            {dict.safety.body}
          </p>
        </div>

        <div className="lg:col-span-7">
          <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {dict.safety.items.map((item, i) => (
              <div key={i} className="border-t border-ivory/15 pt-5">
                <div className="flex items-center gap-3">
                  <span className="text-gold">✦</span>
                  <h3 className="font-display text-xl text-ivory">{item.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ivory/65">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
