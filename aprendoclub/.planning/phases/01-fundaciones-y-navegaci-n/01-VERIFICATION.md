---
phase: 01-fundaciones-y-navegacion
verified: 2026-07-03T00:00:00Z
status: human_needed
score: 5/5 must-haves verified
overrides_applied: 0
deferred:
  - truth: "Footer links a /programas/taller-seo-con-ia y /programas/econia (hoy 404)"
    addressed_in: "Phase 4"
    evidence: "Phase 4 Success Criteria 1-3: crear /programas/taller-seo-con-ia y Econía/SEOconía. UI-SPEC y CONTEXT marcan estos hrefs como placeholders que resuelven en Fase 4."
  - truth: "Sitemap no lista sub-rutas de programas (taller-seo-con-ia, econia, reto)"
    addressed_in: "Phase 4"
    evidence: "Decisión 01-01: sub-rutas Fase 4 no se publican en sitemap para evitar URLs rotas; se añaden al resolverse."
human_verification:
  - test: "Abrir el home en el navegador (desktop) y hacer scroll >50px"
    expected: "El navbar cambia a estado glass (bg-black/60 + backdrop-blur-xl + borde inferior). En el tope es transparente."
    why_human: "Apariencia visual y comportamiento de scroll en tiempo real no verificables por grep."
  - test: "En desktop, navegar entre Inicio, Quiénes somos, Programas y Testimonios desde el header"
    expected: "Cada destino carga su página (sin 404) y el item activo muestra el underline verde #b8f60d que se desliza entre items."
    why_human: "El resaltado animado (layoutId) y la ausencia de 404 percibida son UX de render en vivo."
  - test: "En viewport mobile (<768px), abrir el botón hamburguesa"
    expected: "Panel slide-in de 280px desde la derecha con backdrop, links + CTA, punto verde en item activo; cierra al navegar o tocar el backdrop; el body queda bloqueado de scroll."
    why_human: "Interacción de menú, animación spring y lock de scroll requieren navegador."
  - test: "Activar 'prefers-reduced-motion' en el SO y recargar"
    expected: "El navbar aparece sin slide/stagger; el panel mobile y el underline no animan offsets."
    why_human: "Comportamiento condicionado a media query del sistema; no verificable estáticamente."
  - test: "Verificar que /diplomado conserva su chrome propio (no doble navbar/footer del shell)"
    expected: "/diplomado muestra su navbar/footer de landing, NO el navbar/footer compartido de (site)."
    why_human: "Confirmación visual de que la landing quedó fuera del route group."
---

# Phase 1: Fundaciones y navegación — Verification Report

**Phase Goal:** Establecer la infraestructura navegable del sitio — shell reutilizable, navegación real entre páginas, footer sin links muertos y patrón data-driven Payload-ready.
**Verified:** 2026-07-03
**Status:** human_needed
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths

| # | Truth (ROADMAP Success Criteria) | Status | Evidence |
|---|---|---|---|
| 1 | Toda página nueva se monta sobre un shell compartido con navbar/footer del home | ✓ VERIFIED | `app/(site)/layout.tsx` monta `<Navbar/>` + `<main id="main">` + `<Footer/>`; home movido a `app/(site)/page.tsx` sin chrome inline (grep `Navbar|Footer` en home = NONE); `app/page.tsx` eliminado. |
| 2 | Un visitante navega entre Inicio, Quiénes somos, Programas y Testimonios desde el header (desktop y mobile, glass) | ✓ VERIFIED (código) | `components/navbar.tsx` mapea `siteNav`/`siteCta`, items `route` con `next/link`, ruta activa por `usePathname`, `aria-current`, menú mobile slide-in, glass en `scrollY>50`. Build resuelve las 4 rutas (sin 404). Render UX → human. |
| 3 | El footer solo enlaza a páginas existentes (sin links muertos) | ✓ VERIFIED | `components/footer.tsx` mapea `footerColumns`; grep `href="#"` = NONE; eliminadas columnas Recursos/Legal y links rotos. 2 hrefs a páginas de Fase 4 → ver Deferred. |
| 4 | `app/sitemap.ts` lista las rutas del sitio (sin URLs rotas) | ✓ VERIFIED | `app/sitemap.ts` lista `/`, `/quienes-somos`, `/programas`, `/testimonios`, `/diplomado`, `/links`. Sub-rutas Fase 4 diferidas para no publicar URLs rotas. |
| 5 | Contenido en objetos/consts separados de la presentación (Payload-ready) | ✓ VERIFIED | `content/site.ts` con interfaces tipadas (`NavItem`, `FooterColumn`, `SocialLink`) + exports `siteNav`, `siteCta`, `footerColumns`, `footerSocials`, `footerMeta`; sin JSX. Consumido por navbar (client) y footer (server). |

**Score:** 5/5 truths verified (en código; el criterio 2 exige confirmación de UX en navegador — ver Human Verification).

### Deferred Items

| # | Item | Addressed In | Evidence |
|---|---|---|---|
| 1 | Footer enlaza `/programas/taller-seo-con-ia` y `/programas/econia` (hoy 404) | Phase 4 | UI-SPEC/CONTEXT los declaran placeholders; Phase 4 crea esas páginas. |
| 2 | Sitemap no incluye sub-rutas de programas ni `/reto` | Phase 4 | Decisión 01-01: se añaden al resolverse para evitar URLs rotas. |

### Required Artifacts

| Artifact | Expected | Status | Details |
|---|---|---|---|
| `content/site.ts` | Capa de contenido tipada | ✓ VERIFIED | 107 líneas, interfaces + 5 exports, sin `href="#"`. |
| `app/sitemap.ts` | Sitemap extendido | ✓ VERIFIED | 6 rutas resolubles; sub-rutas diferidas con nota. |
| `components/navbar.tsx` | Navbar data-driven, ruta activa, reduced-motion | ✓ VERIFIED | usePathname + useReducedMotion + aria-current + menú mobile. |
| `components/footer.tsx` | Footer limpio data-driven | ✓ VERIFIED | Server component, sin links muertos, socials reales con `rel=noopener`. |
| `app/(site)/layout.tsx` | Shell compartido | ✓ VERIFIED | skip-link + Navbar + main#main + Footer. |
| `app/(site)/page.tsx` | Home bajo el shell | ✓ VERIFIED | Sin Navbar/Footer inline; conserva secciones + StickyCTAMobile. |
| `app/(site)/{quienes-somos,programas,testimonios}/page.tsx` | Placeholders navegables | ✓ VERIFIED | Server components con metadata y copy "Contenido próximamente". |

### Key Link Verification

| From | To | Via | Status |
|---|---|---|---|
| navbar.tsx | content/site.ts | `import { siteNav, siteCta, footerMeta }` + `.map()` | ✓ WIRED |
| footer.tsx | content/site.ts | `import { footerColumns, footerSocials, footerMeta }` + `.map()` | ✓ WIRED |
| (site)/layout.tsx | Navbar/Footer | import + render | ✓ WIRED |
| home → shell | (site)/layout.tsx | home vive dentro del route group; chrome inline eliminado | ✓ WIRED |

### Data-Flow Trace (Level 4)

| Artifact | Data Variable | Source | Produces Real Data | Status |
|---|---|---|---|---|
| navbar.tsx | siteNav/siteCta | content/site.ts consts | Sí (labels + hrefs reales) | ✓ FLOWING |
| footer.tsx | footerColumns/footerSocials | content/site.ts consts | Sí (URLs sociales reales, columnas) | ✓ FLOWING |

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
|---|---|---|---|
| Build de producción pasa y genera rutas | `npm run build` | Compiled successfully; rutas `/`, `/diplomado`, `/links`, `/programas`, `/quienes-somos`, `/testimonios`, `/sitemap.xml` | ✓ PASS |
| Sin `href="#"` en shell | grep footer/navbar/content | NONE | ✓ PASS |
| Home sin doble chrome | grep `Navbar\|Footer` en home | NONE | ✓ PASS |
| /reto resoluble (export estático) | `ls public/reto/index.html` | existe | ✓ PASS |
| /diplomado fuera de (site) | `find app` | `app/diplomado`, no `app/(site)/diplomado` | ✓ PASS |

### Requirements Coverage

| Requirement | Description | Status | Evidence |
|---|---|---|---|
| NAV-01 | Shell compartido navbar/footer | ✓ SATISFIED | `(site)/layout.tsx` + home movido sin chrome inline |
| NAV-02 | Navbar navegación real desktop+mobile glass | ✓ SATISFIED (UX→human) | navbar.tsx data-driven + rutas resueltas en build |
| NAV-03 | Footer sin links muertos | ✓ SATISFIED | footer sin `href="#"`, columnas rotas eliminadas |
| NAV-04 | sitemap con rutas nuevas | ✓ SATISFIED | sitemap.ts con las rutas resolubles |
| NAV-05 | Data-driven Payload-ready | ✓ SATISFIED | content/site.ts tipado consumido por shell |

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|---|---|---|---|---|
| app/sitemap.ts | 43 | `TODO Fase 4` | ℹ️ Info | Referencia a fase formal de seguimiento (Fase 4); no es deuda sin auditar. |
| content/site.ts | 63-65 | comentarios `// resuelve Fase 4` | ℹ️ Info | Deferral documentado hacia Fase 4. |

Ningún marcador TBD/FIXME/XXX. Sin blockers.

### Human Verification Required

1. **Glass navbar en scroll** — Scroll >50px en el home; esperar cambio a `bg-black/60 backdrop-blur-xl`.
2. **Navegación desktop + underline activo** — Recorrer las 4 rutas; el underline verde se desliza al item activo, sin 404.
3. **Menú mobile slide-in** — En <768px abrir hamburguesa; panel 280px, punto activo, cierre y lock de scroll.
4. **prefers-reduced-motion** — Con movimiento reducido activo, no hay slide/stagger.
5. **/diplomado conserva chrome propio** — Confirmar que no aparece el navbar/footer del shell compartido.

### Gaps Summary

No hay gaps bloqueantes. Las 5 verdades observables están implementadas y cableadas en el código, el build de producción pasa y todas las rutas de navegación se resuelven sin 404. Dos enlaces del footer (taller-seo-con-ia, econia) y las sub-rutas del sitemap se difieren explícitamente a la Fase 4 según UI-SPEC/CONTEXT (no son links `#` muertos, sino páginas planificadas). El estado es `human_needed` porque el criterio 2 (navegación glass en desktop/mobile) y la coherencia visual del shell son UX de render en vivo que requieren confirmación en navegador; la lógica y el markup ya están completos.

---

_Verified: 2026-07-03_
_Verifier: Claude (gsd-verifier)_
