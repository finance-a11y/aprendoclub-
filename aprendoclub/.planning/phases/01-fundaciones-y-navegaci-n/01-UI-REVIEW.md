# Phase 1 — UI Review

**Audited:** 2026-07-03
**Baseline:** `01-UI-SPEC.md` (design contract, shell compartido)
**Screenshots:** not captured (static code audit per orchestrator instruction; dev server was up at :3000 but browser capture was out of scope)
**Scope:** `components/navbar.tsx`, `components/footer.tsx`, `app/(site)/layout.tsx`, `content/site.ts`, `app/globals.css`

---

## Pillar Scores

| Pillar | Score | Key Finding |
|--------|-------|-------------|
| 1. Copywriting | 4/4 | Toda la copia coincide 1:1 con el Copywriting Contract, español neutro sin voceo |
| 2. Visuals | 4/4 | Focal point (CTA accent) claro; icon-buttons con `aria-label`; SVGs `aria-hidden` |
| 3. Color | 3/4 | Accent solo en los 4 usos reservados, pero hardcodeado como `#b8f60d` existiendo `var(--accent)`/`var(--accent-glow)` sin usar |
| 4. Typography | 4/4 | Solo `text-sm`/`text-base` y `font-medium`/`font-semibold`; sin pesos 700+ |
| 5. Spacing | 4/4 | Escala y excepciones documentadas respetadas al pie de la letra |
| 6. Experience Design | 3/4 | `useReducedMotion` bien implementado, pero panel mobile sin semántica de diálogo/Escape y link `/reto` vía `next/link` a export estático |

**Overall: 22/24**

---

## Top 3 Priority Fixes

1. **Link `/reto` del footer usa `next/link` `<Link>`** (`content/site.ts:64`, renderizado en `footer.tsx:69`) — el spec declara `/reto` como export estático en `public/` FUERA del route-group `(site)` y del App Router; una navegación soft de Next a esa ruta cae en 404 en lugar de servir el export. — Marcar ese link como `external: true` en `footerColumns` y hacer que el Footer lo renderice como `<a href>` (hard navigation) para los destinos que viven en `public/`.
2. **Panel mobile slide-in sin semántica de diálogo ni cierre por teclado** (`navbar.tsx:179-262`) — un panel modal que bloquea el scroll del body no expone `role="dialog"` / `aria-modal="true"`, no cierra con `Escape` y no atrapa/retorna el foco; usuarios de teclado y lectores de pantalla quedan sin salida clara. — Añadir `role="dialog" aria-modal="true"` al panel, listener de `Escape` que llame `setIsMobileMenuOpen(false)`, y focus-trap con retorno de foco al botón hamburguesa al cerrar.
3. **Accent hardcodeado como `#b8f60d` literal** (`navbar.tsx:112,144,201,249`) — existe `--accent: #b8f60d` y `--accent-glow: #b8f60d66` en `globals.css` sin consumirse; el hex literal duplica la fuente de verdad y contradice la normalización que el propio spec aplicó al fondo (`var(--bg-primary)`). — Reemplazar por `bg-[var(--accent)]` (y el glow por `var(--accent-glow)`) para un único token canónico. Advisory: el spec sanciona el literal, pero la incoherencia con el patrón de tokens del fondo lo hace mejorable.

---

## Detailed Findings

### Pillar 1: Copywriting (4/4)
PASS sin observaciones. Contrastado string por string contra el Copywriting Contract:
- CTA nav: "Únete ahora" → `/programas` (`content/site.ts:52-54`). ✔
- Nav items: Inicio · Quiénes somos · Programas · Testimonios (`site.ts:43-48`). ✔
- Headings footer: "Programas" / "aprendoclub" (`site.ts:60,69`). ✔
- Brand blurb: "Academia de SEO + IA. Formación, comunidad y acompañamiento para especialistas." (`site.ts:101-102`). ✔ (reemplaza correctamente el heredado con "mentorías").
- Copyright izq: `© {año} aprendoclub. Todos los derechos reservados.` — render `© {new Date().getFullYear()} {copyrightLeft}` = "© 2026 aprendoclub…" (`footer.tsx:89`). ✔
- Copyright der: "Hecho con 💚 para la comunidad SEO" (`site.ts:104`). ✔
- Blurb panel mobile: "Membresía profesional SEO + IA" (`site.ts:105`, `navbar.tsx:257-259`). ✔
- Empty/error/destructive: not applicable, correcto (el shell no renderiza datos).

### Pillar 2: Visuals (4/4)
- Focal point claro: el CTA verde accent es el único elemento de alto contraste sobre el fondo dark, jerarquía correcta.
- Jerarquía por peso/color: headings footer `font-semibold text-white` vs links `text-gray-500`; nav activo `text-white` vs inactivo `text-gray-400`. ✔
- Icon-only buttons pareados con label: hamburguesa con `aria-label` dinámico (`navbar.tsx:153`); iconos sociales con `aria-label={social.label}` (`footer.tsx:52`); SVGs de marca con `aria-hidden` (`footer.tsx:13,23`). ✔
- Logo con `alt="aprendoclub"` en navbar y footer. ✔

### Pillar 3: Color (3/4)
- Split 60/30/10 heredado: fondo `var(--bg-primary)`, glass `bg-black/60 backdrop-blur-xl`, accent puntual. ✔
- Accent `#b8f60d` aparece exactamente 4 veces, todas en usos reservados por el spec: underline desktop (`navbar.tsx:112`), glow+fondo CTA desktop (`:144`), punto mobile (`:201`), fondo CTA mobile (`:249`). Sin fugas a texto de links, iconos de footer ni bordes. ✔
- Normalización de fondo aplicada: panel mobile usa `bg-[var(--bg-primary)]` (`navbar.tsx:188`), no el `#0a0a0f` heredado. ✔ Footer idem (`footer.tsx:32`).
- Bordes glass correctos: `border-white/5` navbar, `border-white/10` panel, `border-white/[0.06]` footer. ✔
- **WARNING (advisory):** accent y su glow hardcodeados como hex/rgba literales existiendo `--accent`/`--accent-glow` sin usar en `globals.css:14-15`. El spec prescribe el literal, pero es una incoherencia de tokenización frente al fondo ya normalizado. Ver Fix #3.

### Pillar 4: Typography (4/4)
- Tamaños en uso: solo `text-sm` (8x) y `text-base` (2x). Dentro de los 3 roles del contrato. ✔
- Pesos: solo `font-medium` (2x) y `font-semibold` (3x). Cero pesos 700+. ✔
- Roles correctos: nav desktop `text-sm font-medium`; nav mobile `text-base font-medium`; CTA `font-semibold`; footer headings `text-sm font-semibold`; links/blurb `text-sm` regular con `leading-relaxed` en blurb. ✔
- Montserrat heredado vía `--font-sans` (`globals.css:36`). ✔

### Pillar 5: Spacing (4/4)
- Escala base respetada: `gap-8` nav desktop, `gap-10 lg:gap-16` columnas footer, `py-16` footer, `p-6 pt-20` panel, `px-4 py-3` items mobile, `px-5 py-2.5`/`py-3` CTA. ✔
- Excepciones documentadas presentes y correctas: `h-[72px]` navbar, `w-[280px]` panel, `w-1.5 h-1.5` punto activo, `h-0.5` underline, `gap-3` sociales, `container-padding` con 120px en `≥1024` (definido en `globals.css:79-82`). ✔
- Contenedores máximos: navbar `max-w-7xl` (`navbar.tsx:96`), footer `max-w-6xl` (`footer.tsx:35,87`). ✔
- Sin valores arbitrarios fuera de los sancionados por el spec.

### Pillar 6: Experience Design (3/4)
Estados/interacción:
- **Reduced-motion (obligatorio):** implementado correctamente vía `useReducedMotion()` — `initial={false}` en navbar (`:87`), panel (`:180`) y CTA mobile (`:241`); stagger y offsets omitidos (`motionProps = {}`, `:203-204`); transición del underline a `duration:0` (`:80-82`). Backdrop y glass conservan fade corto, permitido por el spec. ✔
- Skip-link presente en el layout del grupo apuntando a `#main`, con estilo `sr-only focus:not-sr-only ... focus:bg-[var(--primary)]` conservado (`layout.tsx:11-16`). ✔
- `aria-current="page"` en item activo, desktop y mobile (`navbar.tsx:121,131,215,227`). ✔
- Enlaces externos sociales con `target="_blank" rel="noopener noreferrer"` (`footer.tsx:50-51`). ✔
- Body scroll lock con cleanup mientras el menú está abierto (`navbar.tsx:69-78`). ✔
- Shell wiring correcto: `app/(site)/page.tsx` ya no monta Navbar/Footer inline (solo `StickyCTAMobile`), sin doble chrome; `/diplomado` y `/links` conservan chrome propio fuera de `(site)`; no hay root layout de navegación global. ✔
- **BLOCKER (borderline WARNING):** link `/reto` del footer navega vía `next/link` `<Link>` a un export estático de `public/` que no existe en el App Router → 404 en soft-nav. Ver Fix #1. Nota: `/diplomado` sí es ruta real (`app/diplomado/page.tsx`), y `/programas/taller-seo-con-ia` + `/programas/econia` son placeholders intencionales de Fase 4; el defecto activo es `/reto`.
- **WARNING:** panel mobile sin `role="dialog"`/`aria-modal`, sin cierre por `Escape` ni focus-trap/retorno de foco. Ver Fix #2.
- **Minor:** botón hamburguesa sin `aria-expanded`/`aria-controls` (el spec solo exigió `aria-label` dinámico, que sí está; mejora recomendada para exponer el estado del panel a lectores de pantalla).

---

## Registry Safety
Sin registries. `components.json` ausente, proyecto sin shadcn; el UI-SPEC declara "not applicable" para todos los registries. Registry audit: 0 bloques de terceros, sin flags. Skipped por contrato.

---

## Files Audited
- `.planning/phases/01-fundaciones-y-navegaci-n/01-UI-SPEC.md` (baseline)
- `components/navbar.tsx`
- `components/footer.tsx`
- `app/(site)/layout.tsx`
- `content/site.ts`
- `app/globals.css`
- `app/(site)/page.tsx` (verificación de doble-chrome)
- Árbol de rutas `app/**` (verificación de route-group y exports fuera de `(site)`)
