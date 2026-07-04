# Phase 4: Programas - Context

**Gathered:** 2026-07-03
**Status:** Ready for planning

<domain>
## Phase Boundary

Construir la oferta de programas de aprendoclub: hub `/programas`, página del Taller SEO con IA, página del Reto 7 días, rediseño del Diplomado al look aprendoclub bajo el shell `(site)`, y una sección de programas en el home. Cubre PROG-01, PROG-02, PROG-03, PROG-04, PROG-06, PROG-08. Econía/SEOconía (PROG-05) queda DIFERIDO fuera de esta fase. No toca el enlazado cruzado final (Fase 5).
</domain>

<decisions>
## Implementation Decisions

### Hub /programas (PROG-01)
- Hero + grid de 3 cards (Diplomado, Taller SEO con IA, Reto 7 días) con badge/precio/CTA a cada página + CTA final.
- Data-driven en `content/programas.ts`.

### Diplomado — reskin (PROG-02, PROG-08)
- Rediseñar los 13 componentes de `components/diplomado/*` a los tokens de aprendoclub (Montserrat, `var(--bg-primary)`/`var(--bg-secondary)`, accent `#b8f60d`/`var(--accent)`, secondary `#012fd8`, `container-padding`, `section-spacing`), reemplazando los tokens shadcn propios (`bg-background`, `bg-primary`, `#b8ff2b`, `#4338f5`, `font-mono`, `max-w-5xl`).
- Mover `/diplomado` bajo el shell `(site)`: eliminar su `Navbar`/`Footer` propios (`components/diplomado/navbar.tsx`, `footer.tsx`) y dejar que el layout `(site)` provea el chrome. Mantener el resto de secciones y TODO su contenido (16 semanas, EPAM, pricing, equipo, FAQ, CTA).
- Conservar los `id` de anclas (#metodologia, #programa, #equipo, #faq) y el CTA de inscripción externo (checkout).
- Aplicar `useReducedMotion()` donde haya animaciones.

### Taller SEO con IA (PROG-03)
- Ruta `/programas/taller-seo-con-ia`. Contenido de `curso-seo-con-ia` (ver CONTENT-SOURCE): 15 días, 16 módulos, recursos, certificado, precio $49.99, público objetivo. Diseño aprendoclub.

### Reto 7 días (PROG-04)
- Ruta `/reto` (top-level, coincide con la URL del export). Rebuild fiel del contenido de `public/reto/index.html` con diseño aprendoclub: hero, "por qué no escalas", historia de la mentora, agenda 7 días, comparación, incluye, premios (MacBook + becas), pricing $20 (+ bolívares), ganadores (Bregner Herrera, Germán Andrade, Maiberth, Stephany Vivas con `public/reto/ganadores/g1..g4.jpg`), FAQ, CTA. Modo edición ACTIVA / próxima edición (empieza 13 de julio).
- Reusar assets del export: `public/reto/arianna-hero.png`, `arianna-mentora.jpg`, `dias/1..7.jpg`, `premios/macbook.jpg`, `premios/beca.jpg`, `ganadores/g1..g4.jpg`, `testimonios/t1..t9.png` (ya usados en /testimonios). El executor debe LEER `public/reto/index.html` para tomar la copy y las respuestas del FAQ verbatim.

### Home (PROG-06)
- Nueva sección "Programas" en el home (`app/(site)/page.tsx`) con 3 cards → hub/páginas, insertada en un punto visible (p. ej. tras Beneficios o Precios). Data-driven, reusa el patrón de card del hub.

### Rutas y limpieza
- Tras crear las páginas, repuntar los links del footer `content/site.ts`: "Taller SEO con IA" → `/programas/taller-seo-con-ia`, "Reto 7 días" → `/reto`.
- Agregar las rutas nuevas a `app/sitemap.ts`.
- Actualizar los items del hub/nav si aplica.

### Claude's Discretion
- Layout fino de cada página y de las cards, orden de secciones del Diplomado tras el reskin, y estructura interna de `content/programas.ts` / `content/reto.ts` / `content/taller-seo-con-ia.ts`.

### REGLA DE JUAN (dura)
- Todo el copy basado en el contenido real (CONTENT-SOURCE + `public/reto/index.html` + componentes actuales del Diplomado) y HUMANIZADO: español neutro, sin em/en dashes, sin AI tells. Los datos de programa (precios, módulos, agenda) van fieles; el copy propio (hero/secciones) humanizado.
</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `components/diplomado/*` (13 componentes) — contenido del Diplomado a conservar; reskin de tokens.
- Shell `(site)`, `content/site.ts`, patrón de `content/quienes-somos.ts` / `content/testimonios.ts`.
- `components/testimonios-section.tsx`, cards de quienes-somos — patrón de card reusable para hub/home.
- `public/reto/*` — assets e index.html con toda la copy del Reto.
- Tokens en `app/globals.css`.

### Established Patterns
- Secciones "use client" con `useReducedMotion()`, contenido tipado en `content/`, accent solo en eyebrows+CTA, avatar iniciales fallback.

### Integration Points
- `app/(site)/programas/page.tsx` (reemplazar placeholder → hub real).
- `app/(site)/programas/taller-seo-con-ia/page.tsx` (nueva).
- `app/(site)/reto/page.tsx` (nueva) — o mover `/diplomado` y `/reto` dentro del grupo `(site)`.
- `app/diplomado/` → mover a `app/(site)/diplomado/` (o envolver con el layout del grupo) y reskin.
- Home `app/(site)/page.tsx` → nueva sección programas.
- `content/site.ts` (repuntar footer), `app/sitemap.ts` (rutas nuevas).
</code_context>

<specifics>
## Specific Ideas

- Diplomado: el objetivo es que un visitante NO note diferencia de diseño entre `/diplomado` y el resto del sitio (mismo navbar/footer/fonts/colores). Ese es el criterio de éxito de PROG-08.
- Reto: mantener la urgencia real (fecha 13 de julio, cupos, contador) pero sin inventar datos; usar los del export.
- Taller: dejar claro el precio $49.99 y las opciones de pago (tarjeta / Cashea 3 cuotas Venezuela).

</specifics>

<deferred>
## Deferred Ideas

- Econía/SEOconía (PROG-05) → futuro, sin contenido.
- Enlazado cruzado contextual entre páginas → Fase 5.
- Acelerador Freelance SEO, Curso gratis principiantes, Especialista → no están en el nav de v1.0; se pueden sumar al hub luego.
</deferred>
