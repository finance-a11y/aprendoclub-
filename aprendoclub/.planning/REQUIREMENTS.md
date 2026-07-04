# Requirements: aprendoclub — Web

**Defined:** 2026-07-03
**Core Value:** Que un visitante de Google Ads encuentre una web creíble y navegable (quiénes somos, testimonios, programas) que convierta a inscripción.

## v1 Requirements

Requisitos del milestone v1.0 (Web lista para Google Ads). Cada uno mapea a una fase del roadmap.

### Fundaciones y navegación (NAV)

- [ ] **NAV-01**: Todas las páginas nuevas usan un shell compartido con el mismo navbar y footer, coherente con el diseño del home.
- [ ] **NAV-02**: El navbar ofrece navegación real entre páginas (Inicio, Quiénes somos, Programas, Testimonios) además del CTA, funcionando en desktop y mobile con el estilo glass actual.
- [ ] **NAV-03**: El footer queda limpio: se eliminan los links muertos (Precios, Blog, Guías SEO, Herramientas, Testimonios roto, Comunidad) y solo apunta a páginas/secciones existentes.
- [ ] **NAV-04**: `app/sitemap.ts` incluye todas las rutas nuevas del sitio.
- [ ] **NAV-05**: Los componentes de sección se construyen data-driven (contenido separado de la presentación, en objetos/consts) para permitir la migración a bloques Payload en v1.1.

### Quiénes somos (ABOUT)

- [x] **ABOUT-01**: Existe la página `/quienes-somos` con la historia, misión y propuesta de aprendoclub (contenido migrado de aprendoseo.com) y la bio de la fundadora Arianna Lupi.
- [x] **ABOUT-02**: El home muestra una sección/teaser de "quiénes somos" que enlaza a la página completa.

### Testimonios (TEST)

- [x] **TEST-01**: Existe la página `/testimonios` con los testimonios migrados de aprendoseo.com y de `public/reto/testimonios`.
- [x] **TEST-02**: La sección de testimonios del home queda visible y enlaza a la página completa de testimonios.

### Programas (PROG)

- [ ] **PROG-01**: Existe la página hub `/programas` que presenta y enlaza los programas.
- [ ] **PROG-02**: El Diplomado (ruta `/diplomado` existente) queda enlazado desde el hub y la navegación.
- [ ] **PROG-03**: Existe la página del Taller de SEO con IA con su contenido migrado de aprendoseo.com.
- [ ] **PROG-04**: Existe la página del Reto de 7 días como ruta Next.js, editable para reflejar si el reto no está activo.
- [ ] **PROG-06**: El home muestra/enlaza la sección de programas (visible desde el home).
- [ ] **PROG-08**: El Diplomado (`/diplomado`) se integra al shell compartido `(site)` y adopta por completo el diseño de aprendoclub (mismo navbar/footer, Montserrat, tokens `var(--bg-primary)`/`#b8f60d`/`#012fd8`, `container-padding`/`section-spacing`), conservando su contenido (16 semanas, EPAM, pricing, equipo, FAQ). Reemplaza su navbar/footer/tokens propios (shadcn `bg-background`/`bg-primary`, `#b8ff2b`, `font-mono`).

### Enlazado interno (LINK)

- [ ] **LINK-01**: Las páginas se enlazan entre sí de forma cruzada (programas ↔ testimonios ↔ quiénes somos ↔ home) para navegación coherente y SEO interno.

## v2 Requirements

Diferido a milestones futuros. Reconocido pero fuera del roadmap actual.

### CMS (Payload) — v1.1

- **CMS-01**: Secciones dinámicas/editables desde Payload CMS.
- **CMS-02**: Componentes de sección convertidos a bloques Payload.
- **CMS-03**: Blog de aprendoseo migrado a Payload con categorías y authors.

### Programas adicionales

- **PROG-05**: Página de Econía / SEOconía (sección de economía). Diferida: sin fuente de contenido en aprendoseo.com ni en el repo. Se retoma cuando Juan aporte el contenido.
- **PROG-07**: Páginas de SEO para redes sociales.

## Out of Scope

Excluido explícitamente para prevenir scope creep.

| Feature | Reason |
|---------|--------|
| CMS / contenido editable | Diferido a v1.1 (Payload). v1.0 es estático para salir rápido a Google Ads. |
| Blog | Llega con Payload en v1.1. |
| Páginas SEO redes sociales | Se agregan después. |
| HTML plano en `public/` | Rompe el design system; todo se construye como rutas Next.js. |
| Backend / auth / pagos | El sitio v1.0 es informativo/marketing; inscripción se maneja por enlaces externos existentes. |

## Traceability

Mapeo completo a fases del roadmap v1.0.

| Requirement | Phase | Status |
|-------------|-------|--------|
| NAV-01 | Phase 1 | Pending |
| NAV-02 | Phase 1 | Pending |
| NAV-03 | Phase 1 | Pending |
| NAV-04 | Phase 1 | Pending |
| NAV-05 | Phase 1 | Pending |
| ABOUT-01 | Phase 2 | Complete |
| ABOUT-02 | Phase 2 | Complete |
| TEST-01 | Phase 3 | Complete |
| TEST-02 | Phase 3 | Complete |
| PROG-01 | Phase 4 | Pending |
| PROG-02 | Phase 4 | Pending |
| PROG-03 | Phase 4 | Pending |
| PROG-04 | Phase 4 | Pending |
| PROG-06 | Phase 4 | Pending |
| PROG-08 | Phase 4 | Pending |
| LINK-01 | Phase 5 | Pending |

**Coverage:**

- v1 requirements: 16 total (PROG-05 Econía diferido a futuro)
- Mapped to phases: 16 ✓
- Unmapped: 0 ✓

---
*Requirements defined: 2026-07-03*
*Last updated: 2026-07-03 after roadmap creation (v1.0)*
