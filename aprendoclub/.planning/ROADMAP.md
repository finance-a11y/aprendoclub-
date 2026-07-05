# Roadmap: aprendoclub — Web

## Milestones

- ✅ **v1.0 Web lista para Google Ads** - Phases 1-5 (shipped 2026-07-04)
- ✅ **v1.1 Refrescamiento UI/UX — design system** - Phases 6-9 (shipped 2026-07-04)
- ✅ **v1.2 Motion design + polish** - Phases 10-12 (shipped 2026-07-05)
- 🚧 **v1.3 Payload CMS — todo editable** - Phases 13-18 (in progress)

## Phases

<details>
<summary>✅ v1.2 Motion design + polish (Phases 10-12) - SHIPPED 2026-07-05</summary>

### Phase 10: Auditoría de motion + pasada base

**Goal**: Cada animación del sitio (26 archivos framer-motion + keyframes de `globals.css`) está clasificada por tipo de motion y sigue el estándar de la skill (easing correcto, duración <300ms, solo transform/opacity), con hover touch-safe en todo comportamiento hover y `prefers-reduced-motion` consistente en todo el motion afinado.
**Requirements**: MOT-01, MOT-04
**Plans**: 6/6 complete

### Phase 11: Microinteracciones pulidas + FAQ accordion

**Goal**: Botones, popover/dropdown/mega-menú de navbar y listas/grids con entrada se sienten físicamente responsivos y pulidos; el accordion de FAQ deja de animar `height` y usa transform/opacity sin romper el comportamiento.
**Requirements**: MOT-02, MOT-03
**Plans**: 2/2 complete

### Phase 12: Polish, performance y pase visual pixel

**Goal**: Se resuelven los pendientes de UX/performance chicos y se cierra el sign-off visual pixel de las 8 páginas nuevas en los 4 breakpoints.
**Requirements**: POL-01, POL-02, POL-03
**Plans**: 3/3 complete

*(Detalle completo de Fases 1-12, incluyendo Goal/Depends on/Success Criteria/Plans de cada una, preservado en el historial de git de este archivo.)*

</details>

### 🚧 v1.3 Payload CMS — todo editable (In Progress)

**Milestone Goal:** Integrar Payload CMS en la misma app Next 16 para que TODO el contenido del sitio sea editable desde el admin, manteniendo el layout/diseño actual pixel-igual. Nada hardcodeado fuera de Payload. Rama `feat/payload-cms`.

- [ ] **Phase 13: Fundación — Next.js 16.2.6+ y Payload instalado** - Bump de Next, Payload 3 + Postgres/Neon + Media/Vercel Blob + plugins corriendo junto al sitio actual, sin regresión.
- [x] **Phase 14: Modelo de contenido — Globals, colecciones, blocks y seed** - Todo el esquema (8 globals + 5 colecciones + blocks) definido en Payload y sembrado con el contenido real de hoy. (completed 2026-07-05)
- [ ] **Phase 15: Shell + primeros cutovers (Programas, Testimonios, Quiénes somos)** - Navbar/footer y las 3 páginas de menor riesgo leen de Payload; Programas es fuente única para menú/cards; revalidación probada.
- [ ] **Phase 16: Cutovers restantes (Diplomado, Reto, Taller)** - Las 3 páginas curadas más complejas (componentes cliente, checkout en vivo) leen de Payload sin regresión.
- [ ] **Phase 17: Cutover de Home + SEO/JSON-LD** - Home migrado al global de Payload; metadata editable con fallback; todos los grafos JSON-LD re-validados; sitemap dinámico.
- [ ] **Phase 18: Blog (Category, Author, BlogPost)** - Blog de aprendoseo.com migrado (~69 posts, 5 categorías, 5 autores) y editable desde Payload.

#### Phase 13: Fundación — Next.js 16.2.6+ y Payload instalado

**Goal**: El admin de Payload existe junto al sitio Next actual, respaldado por Postgres/Neon y Vercel Blob, sin romper ninguna página existente.
**Depends on**: Nothing (primera fase de v1.3)
**Requirements**: INF-01, INF-02, INF-03, INF-04
**Success Criteria** (what must be TRUE):

  1. `npm run build` termina en verde sobre Next 16.2.6+ con Turbopack, y todas las páginas existentes (home, quiénes-somos, testimonios, programas, diplomado, reto, taller, links) renderizan sin cambios visuales.
  2. Visitar `/admin` muestra la pantalla de creación del primer usuario; tras crearlo, el panel carga y lista las colecciones/globals (aún vacíos).
  3. Subir una imagen a la colección Media desde `/admin` la guarda en Vercel Blob (no en disco local) y la URL resultante renderiza vía `next/image` con width/height correctos.
  4. `payload migrate` corre como parte del script de build (antes de `next build`) contra Neon Postgres, y `payload generate:types` genera `payload-types.ts` sin ediciones manuales.
  5. plugin-seo, plugin-redirects, plugin-nested-docs y richtext-lexical están configurados y visibles en el admin (una colección de prueba muestra tab de meta y el editor Lexical).

**Plans**: 5 plans

- [x] 13-01-PLAN.md — Bump Next 16.1.6→16.2.10 (Turbopack) + build verde de rutas existentes (INF-01)
- [x] 13-02-PLAN.md — Instalar Payload 3 + payload.config.ts (Users/Postgres/Lexical) + withPayload + tsconfig alias (INF-02)
- [x] 13-03-PLAN.md — Route group (payload) + múltiples root layouts (grupo frontend) + build script migrate + primera migración Neon (INF-02)
- [x] 13-04-PLAN.md — Colección Media + Vercel Blob storage + remotePatterns + plugins seo/redirects/nested-docs (INF-03, INF-04)
- [ ] 13-05-PLAN.md — Verificación integral: build e2e + /admin primer usuario + upload a Blob + SEO/Lexical (INF-02..04)

#### Phase 14: Modelo de contenido — Globals, colecciones, blocks y seed

**Goal**: Cada página y cada tipo de contenido repetible tiene su lugar en el esquema de Payload, poblado con el contenido real de hoy vía seed, sin nada implícitamente hardcodeado en TSX.
**Depends on**: Phase 13
**Requirements**: SCH-01, SCH-02, SCH-03, MIG-01
**Success Criteria** (what must be TRUE):

  1. Los 8 globals (site-settings + 7 globals de página) existen en `/admin`, cada uno editable vía blocks tipados, incluyendo campos para cada sección hoy hardcodeada en home y /diplomado.
  2. Las 5 colecciones nuevas (Testimonios, ClientesTrabajados, Programas, TeamMembers, Faq) existen en `/admin` con CRUD completo (crear/editar/borrar un registro sin tocar código).
  3. Correr el script de seed puebla cada global y colección con el contenido real vigente (24 testimonios, TeamMembers, Programas, entradas de Faq, etc.), verificable navegando `/admin`.
  4. Los blocks (Hero, Pricing, CTA, FeatureGrid, referencia a Faq/Testimonios/TeamMembers) se reutilizan en al menos 2 globals de página distintos sin duplicar definiciones de campos.

**Plans**: 8 plans

- [x] 14-01-PLAN.md — Colecciones (Testimonios, ClientesTrabajados, Programas, TeamMembers, Faq) + config + Media mp4 + redirects real (SCH-02)
- [x] 14-02-PLAN.md — Blocks reutilizables + field helpers (Hero, Pricing, Cta, FeatureGrid, Stats, Prose, *Ref) (SCH-03)
- [x] 14-03-PLAN.md — Globals site-settings + programas-hub + taller (SCH-01)
- [x] 14-04-PLAN.md — Globals quienes-somos + testimonios-page (SCH-01)
- [x] 14-05-PLAN.md — Global reto (SCH-01)
- [x] 14-06-PLAN.md — content/home.ts (extracción verbatim) + global home (SCH-01)
- [x] 14-07-PLAN.md — content/diplomado.ts (extracción verbatim) + global diplomado (SCH-01)
- [x] 14-08-PLAN.md — Script de seed (Media + 5 colecciones + 8 globals, idempotente) (MIG-01)

**REWORK (2026-07-05)** — Pivote a colección `Pages` (page-builder) por revisión de Juan del admin. SCH-01 revisado: reemplazar los 7 page-globals por una colección `Pages` de bloques reordenables/extensibles + SEO por página, con render vía ruta catch-all + block renderer (sin cutover; el cutover per-página es Phases 15-17). Añade 7 planes:

- [x] 14-R01-PLAN.md — 29 bloques bespoke (un tipo por sección única) + barrel allBlocks[] (SCH-01)
- [x] 14-R02-PLAN.md — Colección Pages (slug+layout+SEO) + eliminar 7 page-globals + migración + seoPlugin→pages (SCH-01)
- [ ] 14-R03-PLAN.md — RenderBlocks + ruta catch-all segura/aditiva + adaptadores + render de bloques de referencia (SCH-01)
- [ ] 14-R04-PLAN.md — Render home + quienes-somos + testimonios + taller + genéricos Hero/FeatureGrid/Pricing (SCH-01)
- [ ] 14-R05-PLAN.md — Render diplomado (audience, curriculum 16 semanas, howItWorks, team, benefits, pricing) (SCH-01)
- [ ] 14-R06-PLAN.md — Render reto (barra urgencia, hero, mentora, agenda, premios, ganadores, etc.) (SCH-01)
- [ ] 14-R07-PLAN.md — Seed revisado → 7 Pages de bloques (idempotente) + pipeline + verificación en /admin (MIG-01)

**UI hint**: yes

#### Phase 15: Shell + primeros cutovers (Programas, Testimonios, Quiénes somos)

**Goal**: El navbar/footer y las tres páginas de menor riesgo leen en vivo desde Payload sin cambio visual, probando el patrón de cutover para el resto de la migración.
**Depends on**: Phase 14
**Requirements**: MIG-02, MIG-03, MIG-04
**Success Criteria** (what must be TRUE):

  1. Navbar y footer renderizan desde el global `site-settings` (Local API), y el mega-menú de programas + el hub `/programas` + la sección de programas del home derivan sus cards de la colección `Programas` (sin arrays duplicados).
  2. Agregar un Programa nuevo en `/admin` lo hace aparecer como card en el mega-menú y en el hub sin cambio de código; visitar `/programas/[slug]` para ese programa nuevo renderiza la plantilla genérica de bloques.
  3. `/programas`, `/testimonios` y `/quienes-somos` son pixel-idénticas a su versión pre-migración comparadas lado a lado, y sus `content/*.ts` correspondientes fueron eliminados.
  4. Editar un Testimonio o una entrada de Faq en `/admin` y publicar dispara `revalidatePath` en cada ruta afectada (ej. `/testimonios` y el teaser del home), y el cambio se ve sin redeploy.

**Plans**: TBD
**UI hint**: yes

#### Phase 16: Cutovers restantes (Diplomado, Reto, Taller)

**Goal**: Las tres páginas de programa curadas — incluyendo las interacciones cliente más complejas — leen en vivo desde Payload sin regresión visual ni funcional.
**Depends on**: Phase 15
**Requirements**: MIG-02 (continuación — Patrón B y el resto del orden de cutover iniciado en la Fase 15)
**Success Criteria** (what must be TRUE):

  1. El acordeón de curriculum y el FAQ de `/diplomado` (componentes cliente) reciben su data como prop desde un global obtenido en el servidor, con el mismo comportamiento de motion/aria-expanded/reduced-motion que antes de migrar.
  2. El checkout en vivo de Apturio Bolívares en `/reto` sigue funcionando de punta a punta tras la migración (mismo flujo, misma data de precios, ahora desde Payload).
  3. `/taller-seo-con-ia` renderiza desde su global de Payload sin diferencia visual respecto a la versión pre-migración.
  4. `content/diplomado.ts` (o su equivalente extraído), `content/reto.ts` y `content/taller-seo-con-ia.ts` se eliminan una vez verificada cada página; `npm run build` se mantiene verde durante todo el proceso.

**Plans**: TBD
**UI hint**: yes

#### Phase 17: Cutover de Home + SEO/JSON-LD

**Goal**: El home — la página de mayor tráfico y más densa en contenido — está completamente migrado a Payload, y la metadata y el structured data de todas las páginas son editables y verificados sin regresión.
**Depends on**: Phase 16
**Requirements**: MIG-02 (continuación — home cierra el orden de cutover), SEO-01, SEO-02, SEO-03
**Success Criteria** (what must be TRUE):

  1. El home renderiza cada sección (hero, problema, beneficios, precios, testimonios, instructor, faq, cta) desde el global `home` de Payload, pixel-idéntico a antes, con el contenido inline previamente hardcodeado eliminado del código.
  2. Editar el title/description/OG image de una página vía plugin-seo en `/admin` cambia el `<title>`/meta tags renderizados en esa página; dejar los campos vacíos usa el fallback hardcodeado existente.
  3. Cada grafo JSON-LD (`organization`, `website`, `course`, `homeGraph`, `aboutGraph`, `programasGraph`, `faqGraph`, `testimoniosGraph`) revalida limpio en Google Rich Results Test tras re-conectarse a datos de Payload vía mappers por página, con `lib/schema.ts` intacto como lógica pura.
  4. `app/sitemap.ts` lista todos los slugs de páginas y programas leyéndolos de Payload en vez de una lista estática.
  5. Una auditoría lado a lado de SEO (metadata + JSON-LD) en todas las páginas migradas muestra cero regresión respecto al sitio pre-migración.

**Plans**: TBD
**UI hint**: yes

#### Phase 18: Blog (Category, Author, BlogPost)

**Goal**: El blog de aprendoseo.com existe nativamente en aprendoclub, migrado con su contenido, estructura y SEO intactos, y es completamente editable desde Payload de ahí en adelante.
**Depends on**: Phase 17
**Requirements**: BLG-01, BLG-02, BLG-03
**Success Criteria** (what must be TRUE):

  1. Las colecciones `Category`, `BlogPost` y `Author` existen en `/admin`, cada una editable/CRUD, con los ~69 posts, 5 categorías y 5 autores migrados con title/slug/meta/hero image/body/fecha/relaciones correctos.
  2. Visitar un post migrado en su URL `/{categoria}/{slug}` renderiza el body Lexical con la tipografía del sitio (`.measure-prose`), un reading-time/TOC calculado en el render, y el embed de formulario Kajabi reemplazado por un `CtaFormBlock` funcional.
  3. El índice del blog y las páginas de categoría listan los posts correctamente, y `app/sitemap.ts` incluye cada URL de blog.
  4. Editar el título, body o categoría de un BlogPost en `/admin` actualiza la página en vivo tras publicar (revalidación), sin imágenes rotas ni relaciones muertas en el conjunto completo.

**Plans**: TBD
**UI hint**: yes

## Requirement Coverage (v1.3)

| Requirement | Phase |
|-------------|-------|
| INF-01 | Phase 13 |
| INF-02 | Phase 13 |
| INF-03 | Phase 13 |
| INF-04 | Phase 13 |
| SCH-01 | Phase 14 |
| SCH-02 | Phase 14 |
| SCH-03 | Phase 14 |
| MIG-01 | Phase 14 |
| MIG-02 | Phase 15 (continúa en Fases 16-17) |
| MIG-03 | Phase 15 |
| MIG-04 | Phase 15 |
| BLG-01 | Phase 18 |
| BLG-02 | Phase 18 |
| BLG-03 | Phase 18 |
| SEO-01 | Phase 17 |
| SEO-02 | Phase 17 |
| SEO-03 | Phase 17 |

**Coverage:** 17/17 v1.3 requirements mapped. No orphans, no duplicates.

## Execution Order

Phase 13 → Phase 14 → Phase 15 → Phase 16 → Phase 17 → Phase 18 (estrictamente secuencial: cada fase depende de que la anterior deje el patrón/infraestructura probados — no instalar Payload antes del bump de Next, no migrar páginas antes de que el esquema/seed exista, no cerrar SEO/JSON-LD antes de que todas las páginas curadas estén migradas, y el blog es greenfield al final por tener un perfil de riesgo y una fuente de datos completamente distintos).

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|-----------------|--------|-----------|
| 1-5. v1.0 Web lista para Google Ads | 15/15 | Complete | 2026-07-04 |
| 6-9. v1.1 Refrescamiento UI/UX | 23/23 | Complete | 2026-07-04 |
| 10. Auditoría de motion + pasada base | 6/6 | Complete | 2026-07-05 |
| 11. Microinteracciones pulidas + FAQ accordion | 2/2 | Complete | 2026-07-05 |
| 12. Polish, performance y pase visual pixel | 3/3 | Complete | 2026-07-05 |
| 13. Fundación — Next.js 16.2.6+ y Payload instalado | 4/5 | In Progress|  |
| 14. Modelo de contenido — Globals, colecciones, blocks y seed | 10/15 | In Progress|  |
| 15. Shell + primeros cutovers (Programas, Testimonios, Quiénes somos) | 0/TBD | Not started | - |
| 16. Cutovers restantes (Diplomado, Reto, Taller) | 0/TBD | Not started | - |
| 17. Cutover de Home + SEO/JSON-LD | 0/TBD | Not started | - |
| 18. Blog (Category, Author, BlogPost) | 0/TBD | Not started | - |

---
*Roadmap created: 2026-07-04 for milestone v1.2. Updated: 2026-07-05 for milestone v1.3 (Phases 13-18 added, starting after v1.2's Phase 12).*
