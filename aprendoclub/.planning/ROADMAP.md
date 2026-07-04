# Roadmap: aprendoclub — Web

## Overview

El home suelto de aprendoclub se convierte en un sitio navegable listo para Google Ads. Se parte de una base de navegación real (shell compartido, navbar entre páginas, footer limpio, patrón de componentes data-driven y sitemap), y sobre esa base se construyen las páginas de confianza migradas de aprendoseo.com: quiénes somos, testimonios y el hub de programas con sus páginas individuales. Un cierre final teje el enlazado interno cruzado para que un visitante de Ads pueda recorrer todo el sitio sin callejones sin salida.

## Phases

**Phase Numbering:**

- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Fundaciones y navegación** - Shell compartido, navbar real, footer limpio, patrón data-driven y sitemap
- [x] **Phase 2: Quiénes somos** - Página `/quienes-somos` con historia y bio de la fundadora + teaser en el home (completed 2026-07-04)
- [ ] **Phase 3: Testimonios** - Página `/testimonios` migrada + sección visible desde el home
- [ ] **Phase 4: Programas** - Hub `/programas` + páginas individuales de los cuatro programas
- [ ] **Phase 5: Enlazado interno** - Cross-linking coherente entre todas las páginas para navegación y SEO interno

## Phase Details

### Phase 1: Fundaciones y navegación

**Goal**: Establecer la infraestructura navegable del sitio — un shell de página reutilizable, navegación real entre páginas, footer sin links muertos y el patrón de componentes data-driven que hará limpia la migración a Payload en v1.1.
**Depends on**: Nothing (first phase)
**Requirements**: NAV-01, NAV-02, NAV-03, NAV-04, NAV-05
**Success Criteria** (what must be TRUE):

  1. Cualquier página nueva se monta sobre un shell compartido con el mismo navbar y footer del home (dark `#0a0a0f`, accent `#b8f60d`, Montserrat).
  2. Un visitante puede navegar entre Inicio, Quiénes somos, Programas y Testimonios desde el header, en desktop y mobile, con el estilo glass actual.
  3. El footer solo muestra enlaces a páginas/secciones que existen (sin Precios, Blog, Guías SEO, Herramientas, Testimonios roto ni Comunidad).
  4. `app/sitemap.ts` lista todas las rutas del sitio, incluyendo las que se crearán en las fases siguientes.
  5. Las secciones se construyen con el contenido en objetos/consts separados de la presentación, listo para convertirse en bloques Payload.

**Plans**: 3 plans

  - [ ] 01-01-PLAN.md — Capa de contenido data-driven (content/site.ts) + sitemap
  - [ ] 01-02-PLAN.md — Refactor navbar (rutas reales, ruta activa, reduced-motion) + footer limpio
  - [ ] 01-03-PLAN.md — Route group (site) + mover home + placeholders + build

**UI hint**: yes

### Phase 2: Quiénes somos

**Goal**: Dar credibilidad al sitio con una página de quiénes somos que cuenta la historia y misión de aprendoclub y presenta a la fundadora, enlazada desde un teaser en el home.
**Depends on**: Phase 1
**Requirements**: ABOUT-01, ABOUT-02
**Success Criteria** (what must be TRUE):

  1. Un visitante puede abrir `/quienes-somos` y leer la historia, misión y propuesta de aprendoclub más la bio de Arianna Lupi (contenido migrado de aprendoseo.com).
  2. El home muestra un teaser de "quiénes somos" que enlaza a la página completa.
  3. La página `/quienes-somos` usa el shell compartido y el patrón data-driven de la Phase 1.

**Plans**: 2 plans

  - [x] 02-01-PLAN.md — content/quienes-somos.ts (copia verbatim) + secciones Hero, Historia, Fundadora, Equipo
  - [x] 02-02-PLAN.md — Secciones EPAM, Stats, CTA + ensamblaje de la página con metadata + teaser en el home

**UI hint**: yes

### Phase 3: Testimonios

**Goal**: Reunir las pruebas sociales del proyecto en una página de testimonios navegable y hacerlas visibles desde el home para reforzar la conversión.
**Depends on**: Phase 1
**Requirements**: TEST-01, TEST-02
**Success Criteria** (what must be TRUE):

  1. Un visitante puede abrir `/testimonios` y ver los testimonios migrados de aprendoseo.com y de `public/reto/testimonios`.
  2. La sección de testimonios del home es visible y enlaza a la página completa `/testimonios`.
  3. La página usa el shell compartido y su contenido vive en objetos/consts (data-driven).

**Plans**: 1 plan

  - [ ] 03-01-PLAN.md — content/testimonios.ts (verbatim) + página /testimonios (hero, grid, banda de logos, galería del Reto, CTA) + botón "Ver todos" en el home
**UI hint**: yes

### Phase 4: Programas

**Goal**: Presentar la oferta educativa completa — un hub `/programas` que introduce y enlaza los cuatro programas, con página propia para cada uno y visibilidad desde el home. Incluye integrar el Diplomado existente al shell y diseño de aprendoclub.
**Depends on**: Phase 1
**Requirements**: PROG-01, PROG-02, PROG-03, PROG-04, PROG-05, PROG-06, PROG-08
**Success Criteria** (what must be TRUE):

  1. Un visitante puede abrir `/programas` y ver presentados y enlazados los cuatro programas (Diplomado, Taller SEO con IA, Reto 7 días, Econía/SEOconía).
  2. Desde el hub y la navegación se llega al Diplomado (`/diplomado` existente), a la página del Taller de SEO con IA y a la página del Reto de 7 días (editable para reflejar si el reto no está activo).
  3. Existe la página de Econía/SEOconía con su contenido publicado.
  4. El home muestra/enlaza la sección de programas, visible sin scroll profundo.
  5. El Diplomado (`/diplomado`) usa el mismo navbar/footer del shell `(site)` y el diseño de aprendoclub (Montserrat, `#b8f60d`, `var(--bg-primary)`), sin rastro del navbar/footer/tokens propios anteriores, conservando su contenido.

**Plans**: TBD
**UI hint**: yes
**Content note**: PROG-05 (Econía/SEOconía) NO tiene fuente de contenido en aprendoseo.com ni en `public/`. Juan debe aportar el contenido al momento de ejecutar esta fase; hasta entonces la página no puede completarse.

### Phase 5: Enlazado interno

**Goal**: Cerrar el sitio tejiendo enlaces cruzados entre todas las páginas para que un visitante recorra el sitio sin callejones sin salida y se refuerce el SEO interno.
**Depends on**: Phase 2, Phase 3, Phase 4
**Requirements**: LINK-01
**Success Criteria** (what must be TRUE):

  1. Desde programas, testimonios, quiénes somos y home un visitante puede saltar a cualquiera de las otras páginas mediante enlaces contextuales.
  2. No queda ninguna página huérfana ni enlace muerto en el recorrido del sitio.
  3. Los enlaces internos usan anchor text descriptivo (no "clic aquí") para SEO interno.

**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Fundaciones y navegación | 0/3 | Not started | - |
| 2. Quiénes somos | 2/2 | Complete   | 2026-07-04 |
| 3. Testimonios | 0/1 | Not started | - |
| 4. Programas | 0/TBD | Not started | - |
| 5. Enlazado interno | 0/TBD | Not started | - |
