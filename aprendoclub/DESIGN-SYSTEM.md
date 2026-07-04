# aprendoclub — Design System

Canonical reference for tokens, scales, typography, iconography and shared component APIs. Generated for Phase 6 (design system + componentes compartidos), consumed by Phases 7-9 as source of truth.

Tokens live in `app/globals.css` (`:root` + `@theme inline`, Tailwind v4). No TypeScript token file — this is a locked decision, do not introduce one.

---

## Spacing Scale

Tailwind v4 is base-4 already. Semantic scale:

| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Icon-to-label gaps, tag padding |
| sm | 8px | Compact stacks (badge internal padding, chip gaps) |
| md | 16px | Default element spacing, card internal gaps (`gap-4`) |
| lg | 24px | Card padding (compact), grid gaps (`gap-6`) |
| xl | 32px | Card padding (default, e.g. ProgramCard `p-8`), layout gaps |
| 2xl | 48px | Header-to-content gap within a section (`gap-12`) |
| 3xl | 64px | `section-spacing` mobile value |
| 4xl | 96px | Reserved for hero-only breathing room, use sparingly |

**Section-level utilities (already in `globals.css`, keep as-is):**
- `.section-spacing` — `py-24` mobile (6rem) / `py-32` md+ (8rem). The ONLY section vertical rhythm allowed. Migrate every ad-hoc `py-16/20/24/28/32` to this.
- `.container-padding` — `1.5rem` / `3rem` (sm+) / `120px` (lg+). Canonical horizontal gutter.
- `.measure-prose` — `max-width: 65ch`. Cap for prose blocks (testimonial quotes, bios, FAQ answers). Not for headings, labels or short UI copy.

**Exceptions:**
- Touch targets: icon-only interactive elements (nav toggles, modal close buttons) must be ≥44×44px hit area even if the visible icon is 16-24px.
- Grid gaps between cards (`gap-6` = 24px) are a deliberate exception to the `md` default, consistent across ProgramCard, testimonial cards and team cards — keep as `lg` token.

---

## Typography

4 roles, 2 weights.

| Role | Size | Weight | Line Height |
|------|------|--------|-------------|
| Label / Eyebrow | 12px (`text-xs`) | 600 semibold | 1.4, `tracking-[0.15em]` uppercase |
| Body | 16px (`text-base`) | 400 regular | 1.6 |
| Heading (h2/h3, section titles) | 28px → 36px responsive (`text-[1.75rem] md:text-4xl`) | 600 semibold | 1.2 |
| Display (h1, hero only) | 40px → 56px responsive (`text-4xl md:text-5xl lg:text-6xl`) | 600 semibold | 1.1 |

**Weight consolidation (exactly 2 weights):**
- **400 regular** — body copy, paragraphs, quotes, bios, descriptions.
- **600 semibold** — everything else: eyebrows, headings h1-h6, buttons/CTAs, card titles, nav links, stat numbers.
- Migrate `font-bold` (700) and `font-extrabold` (800) down to `font-semibold` (600). Do not introduce a third weight. `font-medium` (500) folds into semibold (emphasis) or drops the class (body/regular).

**Auxiliary size (documented exception, not a new role):** `text-sm` (14px) remains valid ONLY for secondary/meta text beside body copy at reduced visual weight (timestamps, role captions, price notes) — never for primary reading content or headings.

**Measure:** cap prose blocks at 65ch using `.measure-prose`. Headings and labels are exempt.

---

## Color

Canonical values live in `app/globals.css` `:root`.

| Role | Value | Usage |
|------|-------|-------|
| Dominant (60%) | `#0a0f14` (`--bg-primary`) | Page background, primary section surface |
| Secondary (30%) | `#111827` (`--bg-secondary`), `#0d1117` (`--surface-card`) | Alternating section backgrounds / card & panel surfaces |
| Accent (10%) | `#b8f60d` (`--accent`) | See reserved-for list below |
| Destructive | `#ef4444` (`--destructive`) | Reserved for future form validation errors only — no destructive actions exist in current scope |

**Accent (`--accent` #b8f60d) reserved for — explicit list, nothing else:**
1. Eyebrow/badge text (`<Eyebrow>` component)
2. Primary `<Button variant="primary">` background (text stays black on accent)
3. Card hover border accent (`hover:border-[var(--accent)]/30`) — ProgramCard pattern, via `<Card hover="liftAccent">`
4. Focus ring on buttons/links (`button:focus-visible, a:focus-visible` in `globals.css`)
5. Icon highlight in bullet/benefit lists where a single accent icon calls out a key point

Never use `--accent` as a background for large surfaces, hero backgrounds, or section fills.

**New semantic surface tokens:**
```css
--surface-card: #0d1117;
--border-card: #ffffff1a; /* white/10 */
```

---

## Radius Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-md` | 8px | Small chips, inline badges |
| `--radius-lg` | 12px | Buttons, form inputs, small panels |
| `--radius-xl` | 16px | Cards (ProgramCard, testimonial card, team card), primary containers |
| `--radius-2xl` | 24px | Modals, large panels (navbar mega-menu dropdown), pricing card |
| `--radius-full` | 9999px | Avatars, pills, icon-only circular buttons |

Consolidate loose `rounded-lg/xl/2xl/3xl/full` classes to these tokens. The single `rounded-3xl` occurrence found in the codebase maps down to `--radius-2xl` (24px) — no `--radius-3xl` token added.

---

## Shadow Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.4)` | Subtle lift on inputs, small chips |
| `--shadow-md` | `0 4px 12px rgba(0,0,0,0.5)` | Default card elevation, dropdown panels |
| `--shadow-lg` | `0 12px 32px rgba(0,0,0,0.6)` | Modals, mega-menu, elevated overlays (replaces bare `shadow-2xl`) |

**Accent glow exception (not part of the shadow scale):** the primary CTA hover glow (`hover:shadow-[0_0_40px_rgba(184,246,13,0.3)]`) is a deliberate brand micro-interaction tied to the accent color. It lives inline on `<Button variant="primary">` only — never applied to cards or non-CTA elements.

---

## Icon Contract

| Size | Class | Usage |
|------|-------|-------|
| 16px | `h-4 w-4` | Inline with body/small text, buttons, CTA arrow icons |
| 20px | `h-5 w-5` | Default standalone icon (nav, list bullets, card icons) — most common site-wide |
| 24px | `h-6 w-6` | Section header icons, feature callouts |

- Library: `lucide-react` only, default `stroke-width` (2) — do not mix stroke weights.
- All structural icons (checkmarks, arrows, bullets) must be lucide SVGs — zero emoji icons.
- Icon-only interactive elements (nav toggle, modal close) require `aria-label` and a ≥44×44px tappable hit area regardless of the 16-24px visible icon size.
- Sizes outside 16/20/24 in decorative/illustrative contexts (avatars `h-10`-`h-16`, background blobs `h-64`/`h-96`) are not icons — out of scope for this contract.

---

## Shared Component APIs

### `<Eyebrow>`
```tsx
import { Eyebrow } from "@/components/ui/eyebrow";

<Eyebrow>TESTIMONIOS</Eyebrow>
<Eyebrow as="p">TESTIMONIOS</Eyebrow>
```
| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `children` | `ReactNode` | required | |
| `as` | `"span" \| "p"` | `"span"` | |
| `className` | `string` | — | merged after base classes |

Renders `text-xs font-semibold uppercase tracking-[0.15em] text-[var(--accent)]`. No variants — always accent, always uppercase, always this size/weight.

### `<Button>`
```tsx
import { Button } from "@/components/ui/button";

<Button href="/programas" variant="primary" size="lg" icon>
  Empieza ahora
</Button>
```
| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `href` | `string` | required | `http(s):`/`tel:`/`mailto:` → `<a>`, else Next `<Link>` |
| `variant` | `"primary" \| "secondary" \| "ghost"` | `"primary"` | |
| `size` | `"default" \| "lg"` | `"default"` | `lg` = `px-8 py-4 text-lg` |
| `icon` | `boolean` | `false` | trailing `ArrowRight` (16px), translates on hover |
| `className` | `string` | — | merged after base/variant classes |
| `target`, `rel` | `string` | — | forwarded to `<a>`/`<Link>` |

| Variant | Background | Text | Border | Hover |
|---------|-----------|------|--------|-------|
| `primary` | `var(--accent)` | black | none | `brightness-110` + accent glow shadow |
| `secondary` | `var(--surface-card)` | white | `1px solid var(--border-card)` | `border-white/20` |
| `ghost` | transparent | white | `1px solid white/20` | `border-white/40` + `bg-white/5` |

Base: `inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-300`. Press states (if added) must use `transform`/`opacity` only, never layout-shifting properties.

### `<Card>`
```tsx
import { Card } from "@/components/ui/card";

<Card padding="default" hover="liftAccent">
  {children}
</Card>
```
| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `padding` | `"default" \| "compact"` | `"default"` | `default` = `p-8`, `compact` = `p-6` |
| `hover` | `"lift" \| "liftAccent" \| "none"` | `"lift"` | `lift` = neutral hover (testimonial/team cards), `liftAccent` = accent border hover (ProgramCard, conversion-focused) |
| `children` | `ReactNode` | required | |
| `className` | `string` | — | merged after base classes |

Surface: `bg-[var(--surface-card)] border border-[var(--border-card)] rounded-xl transition-all duration-300`. Renders a plain `<div>` — never a link. CTA/click affordance lives inside as a `<Button>` or wrapping `<Link>` at the call site.

---

## Hex → Token Migration Map

| Hex | Token |
|-----|-------|
| `#0a0f14` / `#0d0f14` / `#111` / `#12161f` / `#0e1428` | `var(--bg-primary)` |
| `#0d1117` | `var(--surface-card)` |
| `#111827` | `var(--bg-secondary)` |
| `#1f2937` / `#1e2330` / `#232836` / `#2e3547` | `var(--bg-tertiary)` |
| `#b8f60d` / `#c8f135` / `#d9ff3d` | `var(--accent)` (near-duplicate greens intentionally consolidate; use `brightness-110` for hover-lighten) |
| `#012fd8` / `#2f4ee0` | `var(--primary)` |
| `#0360e5` | `var(--primary-medium)` |
| `#0495f1` / `#3d5cf5` | `var(--primary-light)` |
| `#b0b8cc` / `#8892a4` / `#555` | `var(--text-muted)` |
| white/10 card border | `var(--border-card)` |

**Rule for any hex not listed:** map to the nearest existing semantic token by role (bg / surface / accent / primary / text). Purely decorative gradient/glow rgba blobs may remain if they are background decoration only — document as an exception at the call site.

---

## Section Container Contract

- Every top-level `<section>` uses `container-padding section-spacing` plus a background token (`bg-[var(--bg-primary)]` or `bg-[var(--bg-secondary)]`) for alternating rhythm.
- Header block within a section: `flex flex-col items-center gap-4`, max-width `700px` for the eyebrow+heading pair, centered.

---

## Component Migration Notes

- **ProgramCard**: refactors internals to compose `<Card padding={compact ? "compact" : "default"} hover="liftAccent">`, `<Eyebrow>`, and `<Button variant="primary">` — pixel-identical output, no regression.
- **Testimonial card / Team card**: wrap content in `<Card padding="compact" hover="lift">` — no accent hover (trust/testimonial content, not conversion CTAs; `liftAccent` stays reserved for ProgramCard).
- Avatar sizing (`h-12 w-12` testimonial, `h-16 w-16` team) is out of scope for the icon contract — these are images, not icons.
