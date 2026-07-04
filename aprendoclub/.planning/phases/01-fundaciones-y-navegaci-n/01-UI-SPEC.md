---
phase: 1
slug: fundaciones-y-navegacion
status: draft
shadcn_initialized: false
preset: none
created: 2026-07-03
---

# Phase 1 — UI Design Contract

> Contrato visual y de interacción del **shell compartido** (site navbar + footer + route-group `(site)/layout.tsx`) del sitio aprendoclub. Este spec NO cubre contenido de página (Quiénes somos, Testimonios, Programas → Fases 2-4). Documenta el design system YA existente y prescribe cómo el shell debe verse y comportarse para mantener coherencia pixel-perfect con el home actual. Las Fases 2-4 reutilizan este contrato.

---

## Design System

| Property | Value |
|----------|-------|
| Tool | none (Tailwind v4 `@theme`, sin shadcn / sin `components.json`) |
| Preset | not applicable |
| Component library | none (componentes propios + framer-motion) |
| Icon library | `lucide-react` (nav/footer) + SVG inline `currentColor` para logos de marca social (WhatsApp/YouTube/TikTok, ya presentes en `app/links/page.tsx`) |
| Font | Montserrat (`--font-montserrat`, cargada en `app/layout.tsx`, expuesta como `--font-sans`) |
| Animation | framer-motion (`motion`, `AnimatePresence`, `layoutId`) |
| Import alias | `@/` |

**Regla dura:** No introducir dependencias nuevas ni un nuevo lenguaje visual. Reusar `container-padding`, `section-spacing`, tokens CSS de `app/globals.css` y los patrones de `components/navbar.tsx` / `components/footer.tsx`.

---

## Spacing Scale

Escala base 4px. El shell usa un subconjunto; declarada completa para consumo de Fases 2-4.

| Token | Value | Usage en el shell |
|-------|-------|-------------------|
| xs | 4px | Punto activo mobile (`w-1.5 h-1.5` = 6px es la única excepción), separaciones inline |
| sm | 8px | Gap iconos sociales del footer (`gap-3` = 12px, ver excepción) |
| md | 16px | Padding de items del menú mobile (`px-4 py-3`) |
| lg | 24px | `container-padding` base (1.5rem), padding del panel mobile (`p-6`) |
| xl | 32px | Gap nav desktop (`gap-8`), gap columnas footer |
| 2xl | 48px | `container-padding` desktop lateral (3rem en ≥640) |
| 3xl | 64px | Padding vertical footer (`py-16`), `section-spacing` de páginas hijas |

**Excepciones (existentes, se conservan tal cual):**
- Navbar altura fija `h-[72px]`.
- `container-padding` en `≥1024px` = `120px` lateral (no múltiplo de 8; es token establecido del proyecto, se respeta).
- Panel mobile ancho `w-[280px]`.
- Punto de ruta activa mobile `w-1.5 h-1.5` (6px) y underline desktop `h-0.5` (2px).
- Iconos sociales `gap-3` (12px). Se mantiene por coherencia con footer actual.

---

## Typography

Montserrat en todo el shell. Máximo 3 roles activos en el shell.

| Role | Size | Weight | Line Height | Usage |
|------|------|--------|-------------|-------|
| Nav item (desktop) | 14px (`text-sm`) | 500 (`font-medium`) | normal | Links navbar desktop |
| Nav item (mobile) | 16px (`text-base`) | 500 (`font-medium`) | normal | Links del panel slide-in |
| CTA | 14px desktop / 16px mobile | 600 (`font-semibold`) | normal | Botón "Únete ahora" |
| Footer heading | 14px (`text-sm`) | 600 (`font-semibold`) | normal | Títulos de columna |
| Footer link / body | 14px (`text-sm`) | 400 (regular) | relaxed (`leading-relaxed` en blurb) | Links, brand blurb, copyright |

Pesos permitidos en el shell: **400 (regular)** y **500/600**. No usar 700+ en el shell.

---

## Color

Paleta dark existente (`app/globals.css` `:root`). El shell hereda el split 60/30/10 del home.

| Role | Value | Usage |
|------|-------|-------|
| Dominant (60%) | `#0a0f14` (`var(--bg-primary)`) | Fondo de página, fondo del panel mobile, fondo del footer |
| Secondary (30%) | `bg-black/60` + `backdrop-blur-xl` (glass) | Navbar en estado scrolled; superficies translúcidas sobre el fondo |
| Accent (10%) | `#b8f60d` (`var(--accent)`) | Ver lista reservada abajo |
| Secondary brand | `#012fd8` (`var(--primary)`) | Outline de focus en inputs/links no-CTA, skip-link background |
| Destructive | not applicable | El shell no contiene acciones destructivas |

**Accent `#b8f60d` reservado EXCLUSIVAMENTE para:**
1. Fondo del botón CTA "Únete ahora" (desktop y mobile) — texto en negro (`text-black`).
2. Glow hover del CTA desktop (`hover:shadow-[0_0_20px_rgba(184,246,13,0.3)]`).
3. Indicador de ruta/sección activa: underline desktop (`h-0.5 bg-[#b8f60d]`) y punto mobile (`bg-[#b8f60d]`).

El accent NUNCA se usa para texto de links normales, iconos del footer, ni bordes de superficie.

**Text scale (existente):**
- `text-white` / `var(--text-primary)`: item activo, headings footer, logo alt.
- `text-gray-400`: nav items inactivos (hover → `text-white`).
- `text-gray-500`: links y blurb del footer (hover → `text-white`).
- `text-gray-600`: copyright bar.

**Bordes glass:** `border-white/5` (navbar scrolled), `border-white/10` (panel mobile, divisores mobile), `border-white/[0.06]` (footer top y copyright bar).

**Nota de normalización:** el token canónico de fondo es `var(--bg-primary)` = `#0a0f14`. El panel mobile del navbar actual hardcodea `bg-[#0a0a0f]`; en el refactor **usar `bg-[var(--bg-primary)]`** para unificar con el footer y el home. No introducir un tercer hex de fondo.

---

## Layout & Structure Contract

### Route-group `(site)/layout.tsx`
- Nuevo route group `app/(site)/` con su `layout.tsx` que monta `<Navbar />` + `{children}` + `<Footer />`.
- El skip-link (`Ir al contenido principal`, ya en `app/page.tsx`) se mueve al layout del grupo, apuntando a `#main` (o al `<main>` del layout). Se conserva su estilo: `sr-only focus:not-sr-only ... focus:bg-[var(--primary)] focus:text-white`.
- Estructura: `<a skip-link/>` → `<Navbar/>` → `<main id="main" className="flex min-h-screen w-full flex-col">{children}</main>` → `<Footer/>`.
- El home (`app/page.tsx`) se mueve bajo `app/(site)/` y **deja de montar `Navbar`/`Footer` inline** (evita doble chrome). Conserva `<StickyCTAMobile/>` si aplica al home.
- `/diplomado` y los exports en `public/` (incl. `reto`) **NO entran** en `(site)`; conservan su chrome propio. No crear root layout de navegación global.
- Navbar = client component (`"use client"`, scroll listener + observers + estado menú). Footer = server component (sin `"use client"`).

### Navbar (refactor de `components/navbar.tsx`)
Reusa 1:1 el look-and-feel actual. Cambios: links por data y detección de ruta activa.

- **Contenedor:** `motion.nav` `fixed top-0 left-0 right-0 z-50 h-[72px]`, entrada `initial={{ y:-100, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ duration:0.5, ease:"easeOut" }}`.
- **Glass scroll state:** `scrollY > 50` → `bg-black/60 backdrop-blur-xl border-b border-white/5`; si no → `bg-transparent`. `transition-all duration-300`.
- **Inner:** `flex h-full items-center justify-between container-padding max-w-7xl mx-auto`.
- **Logo:** `<img src="/logo.svg" alt="aprendoclub" className="h-8 w-auto" />` enlazado a `/`.
- **Nav items (desktop):** `hidden md:flex items-center gap-8`. Cada item `text-sm font-medium`, inactivo `text-gray-400 hover:text-white`, activo `text-white` con underline `motion.div layoutId="activeNav"` (`absolute -bottom-1 left-0 right-0 h-0.5 bg-[#b8f60d]`, spring `stiffness:380 damping:30`). Renombrar `layoutId` a `activeNav`.
- **CTA desktop:** `hidden md:flex items-center justify-center rounded-lg bg-[#b8f60d] px-5 py-2.5 text-sm font-semibold text-black hover:shadow-[0_0_20px_rgba(184,246,13,0.3)] transition-all duration-300`. `href="/programas"`.
- **Botón mobile:** `md:hidden w-10 h-10 rounded-lg text-white hover:bg-white/10`, iconos `Menu`/`X` de lucide (`h-6 w-6`), `aria-label` dinámico "Abrir menú" / "Cerrar menú".

### Navbar — items de navegación (data-driven)
Items del shell (migrar a capa `content/`, p.ej. `content/site.ts`, tipados Payload-ready):

| Label | Type | Target | Ruta activa |
|-------|------|--------|-------------|
| Inicio | route | `/` | activo cuando `pathname === "/"` |
| Quiénes somos | route | `/quienes-somos` | `pathname === "/quienes-somos"` |
| Programas | route | `/programas` | `pathname.startsWith("/programas")` |
| Testimonios | route | `/testimonios` | `pathname === "/testimonios"` |
| **Únete ahora** (CTA) | route | `/programas` | no participa en indicador activo |

- Detección de ruta activa vía `usePathname()` (next/navigation).
- **Comportamiento dual:** en el home (`pathname === "/"`) el IntersectionObserver de secciones (`#problema`, `#beneficios`, `#precios`, `#faq`) puede seguir resaltando por scroll; entre páginas el resaltado se decide por `pathname`. El observer solo se activa cuando `pathname === "/"`.
- Links de tipo `route` usan `next/link` `<Link>`; anchors internos del home usan `<a href="#...">`. El item soporta ambos vía su `type`.

### Navbar — menú mobile (slide-in, se conserva)
- `AnimatePresence`. Backdrop `fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden`, fade `duration:0.2`, cierra al click.
- Panel `fixed top-0 right-0 bottom-0 z-50 w-[280px] bg-[var(--bg-primary)] border-l border-white/10 md:hidden`, entrada `initial={{ x:"100%" }} animate={{ x:0 }} exit={{ x:"100%" }}` spring `damping:25 stiffness:200`.
- Interior `flex flex-col h-full p-6 pt-20`. Items con stagger `delay: index * 0.1`, `initial={{ opacity:0, x:20 }}`.
- Item mobile: `px-4 py-3 rounded-lg text-base font-medium`; activo `bg-white/10 text-white` + punto `ml-auto w-1.5 h-1.5 rounded-full bg-[#b8f60d]`; inactivo `text-gray-400 hover:bg-white/5 hover:text-white`.
- CTA mobile: `mt-6 rounded-lg bg-[#b8f60d] px-5 py-3 text-base font-semibold text-black`, `delay:0.4`, `href="/programas"`.
- Footer info del panel: `mt-auto pt-6 border-t border-white/10`, `text-sm text-gray-500` con blurb "Membresía profesional SEO + IA".
- Al navegar o click en item/CTA → `setIsMobileMenuOpen(false)`.
- Body scroll lock mientras el menú está abierto (`document.body.style.overflow = "hidden"`), se conserva.

### Footer (refactor de `components/footer.tsx`)
Server component. Estructura y clases del footer actual, con columnas limpias.

- **Contenedor:** `<footer className="w-full bg-[var(--bg-primary)] border-t border-white/[0.06]">`.
- **Grid:** `container-padding py-16` → `grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-16 max-w-6xl mx-auto`.
- **Brand (col-span-2 md:col-span-1):** logo `h-6 w-auto` → `/`, blurb `text-sm leading-relaxed text-gray-500`, iconos sociales `flex items-center gap-3 mt-2`.
- **Blurb actualizado (reemplaza "Cursos, comunidad y mentorías" de aprendoseo):** ver Copywriting.
- **Columnas (2), migradas a `content/site.ts`:**

| Columna | Links (label → href) |
|---------|----------------------|
| **Programas** | Diplomado → `/diplomado` · Taller SEO con IA → `/programas/taller-seo-con-ia` · Reto 7 días → `/reto` (placeholder, resuelve Fase 4) · Econía / SEOconía → `/programas/econia` (placeholder, Fase 4) |
| **aprendoclub** | Quiénes somos → `/quienes-somos` · Testimonios → `/testimonios` |

- **Links de columna:** `text-sm text-gray-500 hover:text-white transition-colors`. Títulos `text-sm font-semibold text-white`.
- **Eliminar (links muertos actuales):** columna "Recursos" completa (Blog, Guías SEO, Herramientas, FAQ), columna "Legal" completa (Términos, Privacidad, Cookies), y los links rotos "Cursos"/"Precios"/"Comunidad"/"Testimonios(#)". No hay páginas legales en scope.
- **Iconos sociales (URLs reales de `app/links/page.tsx`):**

| Red | href | Icono |
|-----|------|-------|
| YouTube | `https://www.youtube.com/@aprendoclub` | lucide `Youtube` o SVG inline existente |
| TikTok | `https://tiktok.com/@aprendo.club` | SVG inline existente en `links/page.tsx` (lucide no trae TikTok) |
| WhatsApp | `https://api.whatsapp.com/send?phone=13055728892` | SVG inline existente |

  - **Instagram y LinkedIn se OMITEN** (no existen en `/links`; no crear iconos con `href="#"`). Cada icono: `<a href aria-label={red} className="text-gray-500 hover:text-white transition-colors">`, icono `h-5 w-5`. Enlaces externos → `target="_blank" rel="noopener noreferrer"`.
- **Copyright bar:** `border-t border-white/[0.06] container-padding py-6` → `max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4`. Izq: `© {año} aprendoclub. Todos los derechos reservados.` (`text-sm text-gray-600`). Der: ver Copywriting.

---

## Responsive Behavior

| Breakpoint | Navbar | Footer |
|------------|--------|--------|
| `< 768px` (mobile) | Logo + botón hamburguesa; nav y CTA ocultos; menú slide-in 280px desde la derecha | Grid `grid-cols-2`; brand ocupa `col-span-2`; copyright apilado (`flex-col`) |
| `≥ 768px` (`md`) | Nav horizontal `gap-8` + CTA visibles; botón hamburguesa oculto | Grid `md:grid-cols-4`; copyright en fila (`sm:flex-row`) |
| `≥ 1024px` (`lg`) | `container-padding` lateral 120px | `gap-16` entre columnas |

Contenedores máximos: navbar `max-w-7xl`, footer `max-w-6xl`.

---

## Accessibility

- **Skip link:** existe y se conserva en `(site)/layout.tsx`, `sr-only focus:not-sr-only`, apunta a `#main`.
- **Focus visible (global, `globals.css`):** links/botones → `outline: 2px solid #b8f60d; outline-offset: 2px`; otros → `outline: 2px solid #012fd8`. No sobrescribir.
- **Aria labels:** botón hamburguesa `aria-label` dinámico; cada icono social con `aria-label` (nombre de la red); SVGs de marca con `aria-hidden`.
- **Estado activo de ruta:** además del color/underline, exponer `aria-current="page"` en el item de nav cuyo `pathname` coincide (desktop y mobile).
- **Contraste:** `text-gray-400` sobre `#0a0f14` para nav inactivo; texto del CTA en negro sobre accent verde (alto contraste). Copyright `text-gray-600` es texto secundario, aceptable a 14px.
- **Enlaces externos:** `rel="noopener noreferrer"` + `target="_blank"` en socials.
- **Touch targets mobile:** botón hamburguesa `w-10 h-10` (40px) e items `py-3` cumplen el mínimo táctil.

---

## Motion

- **Entrada navbar:** slide-down + fade, `duration:0.5 ease:"easeOut"`.
- **Glass scroll:** `transition-all duration-300`.
- **Underline activo:** `motion.div layoutId="activeNav"`, spring `stiffness:380 damping:30` (transición suave entre items).
- **Menú mobile:** panel spring `damping:25 stiffness:200`; backdrop fade `0.2`; items stagger `index * 0.1`; CTA `delay:0.4`.
- **Hover CTA:** glow `transition-all duration-300`.
- **prefers-reduced-motion:** **obligatorio.** Cuando el usuario prefiere movimiento reducido, desactivar la entrada slide/stagger y las transiciones de `layout` (render en estado final sin animar). Implementar vía `useReducedMotion()` de framer-motion: si `true`, usar `initial={false}` / omitir `x`/`y` offsets y stagger. El backdrop y el cambio de glass pueden mantenerse como fade instantáneo/corto.

---

## Copywriting Contract

Español neutro (sin voceo). Humanizar toda copia nueva antes de entregar.

| Element | Copy |
|---------|------|
| Primary CTA (nav) | **Únete ahora** → `/programas` |
| Nav items | Inicio · Quiénes somos · Programas · Testimonios |
| Footer heading col 1 | **Programas** |
| Footer heading col 2 | **aprendoclub** |
| Footer brand blurb | Academia de SEO + IA. Formación, comunidad y acompañamiento para especialistas. |
| Footer copyright (izq) | © {año} aprendoclub. Todos los derechos reservados. |
| Footer copyright (der) | Hecho con 💚 para la comunidad SEO |
| Panel mobile blurb | Membresía profesional SEO + IA |
| Empty state | not applicable (el shell no renderiza datos; las páginas hijas definen sus vacíos en Fases 2-4) |
| Error state | not applicable (sin data-fetching en el shell) |
| Destructive confirmation | not applicable (sin acciones destructivas) |

**Nota:** el blurb propuesto reemplaza el actual "La plataforma educativa para especialistas en SEO. Cursos, comunidad y mentorías." (heredado, menciona mentorías no confirmadas). Juan puede ajustar el texto exacto; mantener 1-2 frases, tono profesional neutro.

---

## Data-Driven Pattern (Payload-ready)

El shell estrena la capa de contenido. Prescripción de forma (nombres finales a discreción, respetar convención existente):

- Módulo `content/site.ts` (o `lib/content/site.ts`) exporta objetos tipados:
  - `siteNav: NavItem[]` — items del navbar.
  - `siteCta: NavItem` — CTA "Únete ahora".
  - `footerColumns: FooterColumn[]` — columnas Programas / aprendoclub.
  - `footerSocials: SocialLink[]` — YouTube, TikTok, WhatsApp.
  - `footerMeta` — blurb + copyright.
- Interfaces TypeScript por bloque, forma 1:1 con un futuro bloque/colección Payload. Sugerido:

```ts
type NavItemType = "route" | "anchor";
interface NavItem { label: string; href: string; type: NavItemType; }
interface FooterColumn { title: string; links: { label: string; href: string; external?: boolean }[]; }
interface SocialLink { id: string; label: string; href: string; }
```

- Navbar (client) y Footer (server) importan de esta capa. Assets (logo) siguen en `public/`.

---

## Registry Safety

| Registry | Blocks Used | Safety Gate |
|----------|-------------|-------------|
| shadcn official | ninguno (proyecto sin shadcn) | not applicable |
| third-party | ninguno | not applicable |

Sin registries. Todos los componentes son propios del repo.

---

## Checker Sign-Off

- [ ] Dimension 1 Copywriting: PASS
- [ ] Dimension 2 Visuals: PASS
- [ ] Dimension 3 Color: PASS
- [ ] Dimension 4 Typography: PASS
- [ ] Dimension 5 Spacing: PASS
- [ ] Dimension 6 Registry Safety: PASS

**Approval:** pending
