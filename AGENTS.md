<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Blog (magazine) content strategy — client preference

When writing new magazine/blog posts, **prefer topics centered on the clinic's
actual treatments** (the home-page treatments grid, registry in
`lib/treatments.ts`): Liposuction, Rhinoplasty, Eye Treatment, Facelift,
Breast Implant, Chin Implant, Body Sculpting, HIFU Lifting, Pico Laser,
Hair Removal, Cell Light Therapy, Whitening Drip, Onda Pro Coolwaves™,
Titanium Ultrasound Lifting. Rotate through these so each treatment gets
supporting long-tail content over time, rather than only general-interest
topics.

Standing rules for every post (established with the client):
- Genuinely useful, information-gain content — no generic filler; follow
  Google's helpful-content/E-E-A-T guidance; YMYL-hedged (defer to the
  surgeon), no doctor names/credentials shown.
- Write all five locales (en/zh/ko/ja/ms) in `dictionaries/*.json`
  (insert via a Python script using `json.dumps(..., ensure_ascii=False,
  indent=2) + "\n"` for additions-only diffs).
- Long-tail internal links (`[label](relative/path)` format) into the
  relevant treatment pages and related magazine posts.
- Branded 16:9 text thumbnail (~30KB WebP) in the Valley Journal card style
  (see scratch scripts pattern: headless Chromium + Cormorant/Jost fonts).
- Date posts using Malaysia local time, register in `lib/magazine.ts`
  (newest first for same-date ties), verify with `next build`, then
  commit → PR to `claude/elegant-tesla-tujcl` → merge (auto-deploys via
  Cloudflare Pages Git integration).
