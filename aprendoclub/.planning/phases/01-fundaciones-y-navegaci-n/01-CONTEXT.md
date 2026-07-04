# Phase 1: Fundaciones y navegación - Context

**Gathered:** 2026-07-03
**Status:** Ready for planning

<domain>
## Phase Boundary

Establecer la infraestructura navegable del sitio aprendoclub: un shell de página reutilizable (navbar + footer compartidos), navegación real entre páginas, footer sin links muertos, y el patrón de componentes data-driven que hará limpia la migración a Payload en v1.1. NO incluye el contenido de las páginas de Quiénes somos, Testimonios ni Programas (esas son fases 2-4) — solo crea el andamiaje, las rutas placeholder y los patrones que esas fases consumirán.

Cubre: NAV-01 (shell compartido), NAV-02 (navbar con navegación real desktop+mobile), NAV-03 (footer limpio), NAV-04 (sitemap con rutas nuevas), NAV-05 (patrón data-driven Payload-ready).
</domain>

<decisions>
## Implementation Decisions

### Rutas y navegación
- Rutas en español kebab-case: `/quienes-somos`, `/programas`, `/testimonios`.
- Items del navbar: Inicio · Quiénes somos · Programas · Testimonios + botón CTA "Únete ahora".
- Navbar global con links a páginas reales; las secciones del home conservan sus `id` (`#problema`, `#beneficios`, `#precios`, `#faq`) para scroll interno cuando se está en el home.
- El navbar detecta la ruta activa vía `usePathname`; dentro del home puede seguir resaltando secciones por scroll, pero entre páginas resalta la ruta.
- CTA "Únete ahora" apunta a `/programas` (hub de programas), no al `#precios` del home.

### Arquitectura del shell
- Usar un Next.js route group `(site)` con su propio `layout.tsx` que monta navbar + footer compartidos, envolviendo el home y las páginas nuevas (quienes-somos, programas, testimonios).
- Las landing pages con chrome propio (`/diplomado`, y el export `public/reto`) NO entran en este layout — conservan su navbar/footer específicos. No usar un root layout global de navegación que duplicaría el chrome de esas landings.
- Refactorizar el `Navbar` actual (`components/navbar.tsx`) para aceptar los links por props / data y soportar tanto rutas de página como anchors del home. Reusar el estilo glass, framer-motion, menú mobile y lógica de scroll existentes.
- Navbar permanece client component (framer-motion / observers); footer permanece server component.

### Footer limpio
- Reestructurar `components/footer.tsx` a columnas: "Programas" (Diplomado, Taller SEO con IA, Reto 7 días, Econía/SEOconía) y "aprendoclub" (Quiénes somos, Testimonios).
- Eliminar los links muertos actuales: Cursos(#), Precios, Comunidad, Blog, Guías SEO, Herramientas, y la columna Legal (no hay páginas legales en scope; se agregan después).
- Iconos sociales apuntan a las URLs reales usadas en `/links` (Instagram, TikTok, YouTube; LinkedIn si aplica) en vez de `#`.
- Mantener brand blurb + copyright bar.

### Patrón data-driven (Payload-ready)
- Introducir una capa central de contenido en `content/` (o `lib/content/`) con módulos tipados por sección/bloque (p. ej. `content/site.ts` para nav/footer, y módulos por página en fases siguientes). Cada módulo exporta objetos tipados que espejan la forma de un futuro bloque/colección Payload.
- Definir interfaces TypeScript por bloque, de modo que la config de Payload en v1.1 mapee 1:1.
- En Fase 1, migrar el contenido de nav + footer a esta capa como primer ejemplo del patrón. Las secciones existentes del home pueden migrarse incrementalmente.
- Los assets (imágenes/logos) siguen en `public/`.

### Claude's Discretion
- Nombres exactos de archivos/módulos dentro de `content/`, estructura interna de las interfaces, y detalles de refactor del Navbar quedan a discreción, respetando las convenciones existentes (Tailwind v4, framer-motion, lucide, imports `@/`).
</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `components/navbar.tsx` — navbar client con glass scroll effect, IntersectionObserver de sección activa, menú mobile slide-in (framer-motion), CTA. Base a refactorizar para nav por props.
- `components/footer.tsx` — footer server con grid de columnas (data en const `footerColumns`) + iconos sociales + copyright. Base a limpiar/reestructurar.
- `app/layout.tsx` — root layout con Montserrat, GA, Meta Pixel. No monta navbar/footer (los monta `app/page.tsx`).
- `app/page.tsx` — home que compone Navbar + secciones + Footer directamente.
- Design tokens: `var(--bg-primary)`, `var(--bg-secondary)`, `var(--primary)`, accent `#b8f60d`, secondary `#012fd8`, en `app/globals.css`. Utilities `container-padding`, `section-spacing`.
- `app/sitemap.ts` — actualmente lista solo home + /links.
- `components/diplomado/*` — chrome propio de la landing diplomado (navbar/footer separados) → NO tocar con el shell compartido.

### Established Patterns
- Componentes de sección "use client" con framer-motion `useInView`; contenido en `const` arriba del componente (patrón a evolucionar hacia capa `content/`).
- Imports con alias `@/`.
- Estilos inline Tailwind con colores hex directos y CSS vars.

### Integration Points
- Route group `(site)/layout.tsx` nuevo que envuelve home + páginas nuevas.
- Home (`app/page.tsx`) debe moverse/adaptarse para vivir bajo el shell compartido en vez de montar Navbar/Footer inline (evitar doble navbar).
- `app/sitemap.ts` a extender con las rutas nuevas.
- Navbar/footer consumen la nueva capa `content/`.
</code_context>

<specifics>
## Specific Ideas

- Coherencia pixel-perfect con el home: dark `#0a0a0f`, accent `#b8f60d`, Montserrat, glass navbar, animaciones framer-motion.
- Reto 7 días vive hoy como export estático en `public/reto`; en Fase 1 el link de nav/footer puede apuntar a `/reto` (se resuelve en Fase 4). Placeholder aceptable en Fase 1.
- Econía/SEOconía sin fuente de contenido — solo se referencia como ruta futura en nav/footer; la página se construye en Fase 4 con contenido aportado por Juan.
</specifics>

<deferred>
## Deferred Ideas

- Contenido real de Quiénes somos → Fase 2.
- Página y contenido de Testimonios → Fase 3.
- Hub y páginas de Programas + resolución de `/reto` y Econía → Fase 4.
- Enlazado cruzado final entre páginas → Fase 5.
- Páginas legales (Términos, Privacidad) → futuro milestone.
- Migración de secciones del home a la capa `content/` más allá de nav/footer → incremental, no bloqueante.
</deferred>
