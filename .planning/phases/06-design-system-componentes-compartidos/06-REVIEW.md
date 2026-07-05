---
phase: 06-design-system-componentes-compartidos
reviewed: 2026-07-04T20:47:57Z
depth: deep
files_reviewed: 47
files_reviewed_list:
  - aprendoclub/app/(site)/programas/page.tsx
  - aprendoclub/app/(site)/programas/taller-seo-con-ia/page.tsx
  - aprendoclub/app/globals.css
  - aprendoclub/app/links/page.tsx
  - aprendoclub/components/beneficios-section.tsx
  - aprendoclub/components/cta-section.tsx
  - aprendoclub/components/diplomado/audience.tsx
  - aprendoclub/components/diplomado/benefits.tsx
  - aprendoclub/components/diplomado/cta.tsx
  - aprendoclub/components/diplomado/curriculum.tsx
  - aprendoclub/components/diplomado/faq.tsx
  - aprendoclub/components/diplomado/hero.tsx
  - aprendoclub/components/diplomado/how-it-works.tsx
  - aprendoclub/components/diplomado/methodology.tsx
  - aprendoclub/components/diplomado/origin.tsx
  - aprendoclub/components/diplomado/pricing.tsx
  - aprendoclub/components/diplomado/team.tsx
  - aprendoclub/components/faq-section.tsx
  - aprendoclub/components/hero-section.tsx
  - aprendoclub/components/instructor-section.tsx
  - aprendoclub/components/navbar.tsx
  - aprendoclub/components/pricing-section.tsx
  - aprendoclub/components/problema-section.tsx
  - aprendoclub/components/program-card.tsx
  - aprendoclub/components/programas-section.tsx
  - aprendoclub/components/quienes-somos/cta.tsx
  - aprendoclub/components/quienes-somos/equipo.tsx
  - aprendoclub/components/quienes-somos/fundadora.tsx
  - aprendoclub/components/quienes-somos/hero.tsx
  - aprendoclub/components/quienes-somos/historia.tsx
  - aprendoclub/components/quienes-somos/metodologia.tsx
  - aprendoclub/components/quienes-somos/stats.tsx
  - aprendoclub/components/related-links.tsx
  - aprendoclub/components/reto/reto-bottom.tsx
  - aprendoclub/components/reto/reto-mid.tsx
  - aprendoclub/components/reto/reto-top.tsx
  - aprendoclub/components/sticky-cta-mobile.tsx
  - aprendoclub/components/testimonios-section.tsx
  - aprendoclub/components/testimonios/cta.tsx
  - aprendoclub/components/testimonios/grid.tsx
  - aprendoclub/components/testimonios/hero.tsx
  - aprendoclub/components/testimonios/reto-galeria.tsx
  - aprendoclub/components/testimonios/testimonial-avatar.tsx
  - aprendoclub/components/ui/button.tsx
  - aprendoclub/components/ui/card.tsx
  - aprendoclub/components/ui/eyebrow.tsx
  - aprendoclub/DESIGN-SYSTEM.md
findings:
  critical: 0
  warning: 1
  info: 2
  total: 3
status: issues_found
---

# Phase 6: Code Review Report

**Reviewed:** 2026-07-04T20:47:57Z
**Depth:** deep
**Files Reviewed:** 47
**Status:** issues_found

## Summary

Reviewed all 11 Phase 6 commits (b272f0c → c921bca): the three new shared primitives (`components/ui/{eyebrow,button,card}.tsx`), the `globals.css` token/shadow/radius additions, and the ~35-file hex→token sweep across home, diplomado, quienes-somos, reto, testimonios and the programas/taller/links pages.

Verification performed beyond reading:
- `npm run build` (Next 16 / Turbopack) — compiles clean, no TS errors, no new ESLint errors (only pre-existing `no-img-element` warnings unrelated to this phase).
- Cross-checked every `<Button>` call site's `href`/`target`/`rel` combination against `Button`'s `EXTERNAL_HREF_PATTERN` routing logic — no internal href mis-routed to `<a>`, no external href mis-routed to `next/link`, no `target="_blank"` without `rel="noopener noreferrer"`.
- Grepped the full diff range for residual literal hex (`#xxxxxx`) in `.tsx` — none found outside the documented accent-glow/gradient exceptions already called out in `DESIGN-SYSTEM.md`.
- Inspected the compiled CSS (`.next/static/chunks/*.css`) to confirm the project's custom `--radius-*`/`--accent`/`--primary` root tokens resolve as intended relative to Tailwind's own internal theme layer (unlayered `:root` correctly wins over Tailwind's `@layer theme`), and that the one deliberate `Eyebrow` color override (`reto-bottom.tsx`'s FAQ label, explicitly documented in `06-06-SUMMARY.md`) does resolve to the intended `--primary` blue in the generated stylesheet.
- Checked `Card`/`Button`/`Eyebrow` for "use client" — all three are correctly plain server components (no state/handlers), consistent with their doc comments; client boundaries in `navbar.tsx`/`sticky-cta-mobile.tsx`/animated sections are unaffected and correctly scoped.
- Checked icon-only interactive elements for `aria-label` — none of the `<Button icon>` usages are icon-only (all carry visible text), so no a11y gap there. Focus-visible styling for all `<Button>`/`<Link>`/`<a>` instances is handled globally in `globals.css` (`button:focus-visible, a:focus-visible`), so the primitives don't need to (and don't) duplicate it.

Only one genuine defect was found (a leftover literal color that slipped through the otherwise-thorough hex sweep). Two minor Info-level consistency notes are included for completeness. No blockers, no security issues, no dead code, no broken routing.

## Warnings

### WR-01: WhatsApp icon fill regressed from mapped token to a hardcoded named color

**File:** `aprendoclub/components/pricing-section.tsx:124`
**Issue:** During the 06-04 hex sweep (`400fd2d`), the WhatsApp SVG icon's `fill="#111"` was changed to `fill="black"` instead of being mapped to `var(--bg-primary)` like every other `#111`/`#0a0f14`/`#0d0f14` occurrence in this same file (per `DESIGN-SYSTEM.md`'s own migration map, `#111` → `var(--bg-primary)`). `--bg-primary` is `#0a0f14` (a very dark blue-black), not pure `#000`, so this is a small but real, provable color drift introduced by the sweep itself — and it breaks the "every hex color is a token reference" invariant the rest of the phase enforces (confirmed: this is the only `fill="black"`/hardcoded-color introduced across all swept commits).
**Fix:**
```tsx
<svg width="20" height="20" viewBox="0 0 24 24" fill="var(--bg-primary)" xmlns="http://www.w3.org/2000/svg">
```

## Info

### IN-01: Ad-hoc CTA buttons in `navbar.tsx` and `sticky-cta-mobile.tsx` duplicate `<Button>` markup instead of composing it

**File:** `aprendoclub/components/navbar.tsx:226-231,339-345`; `aprendoclub/components/sticky-cta-mobile.tsx:39`
**Issue:** Both files were touched by the sweep (hex → `var(--accent)`) but their CTA `<Link>`/`<a>` markup was left as hand-rolled `rounded-lg bg-[var(--accent)] ... text-black` blocks rather than being composed from the new `<Button variant="primary">` primitive introduced in this same phase. This isn't a functional bug (the classes are correct and consistent with `Button`'s primary variant) but it's the one place in the sweep where the stated goal — consolidate CTA styling onto the shared primitive — wasn't applied, leaving two more copies of the same markup to keep in sync by hand going forward.
**Fix:** Compose `<Button href={siteCta.href} variant="primary">{siteCta.label}</Button>` (navbar desktop/mobile CTA) and `<Button href={...} variant="primary" className="w-full">` (sticky mobile CTA) once these components' hover/glow requirements are confirmed to match the shared variant.

### IN-02: `Button`'s `baseClasses` hardcodes `rounded-lg` with no per-instance radius escape hatch

**File:** `aprendoclub/components/ui/button.tsx:10-11`
**Issue:** Several pre-refactor CTAs (e.g. `diplomado/hero.tsx`, `diplomado/cta.tsx`, `diplomado/pricing.tsx`) used `rounded-xl` (16px, resolves via the project's `--radius-xl` token) before being converted to `<Button>`, which is fixed at `rounded-lg` (12px, via `--radius-lg`). This is called out as the intended target state in `DESIGN-SYSTEM.md`'s radius table ("Buttons → `--radius-lg`"), so it's a deliberate consolidation rather than an accident, but it does mean those specific CTAs now render with a visibly smaller corner radius than before the refactor. Flagging so it gets an explicit visual sign-off rather than being caught later as a "regression."
**Fix:** No code change needed if the radius standardization is accepted; otherwise expose an optional `radius` prop on `Button` for the handful of call sites that need to opt out.

---

_Reviewed: 2026-07-04T20:47:57Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: deep_
