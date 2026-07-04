# Phase 3: Testimonios - Context

**Gathered:** 2026-07-03
**Status:** Ready for planning

<domain>
## Phase Boundary

Construir la página `/testimonios` (bajo el shell `(site)`) con los testimonios migrados de aprendoseo.com y las imágenes del Reto, y hacer visible/enlazada la sección de testimonios desde el home. Cubre TEST-01 y TEST-02. No toca programas (Fase 4).
</domain>

<decisions>
## Implementation Decisions

### Página /testimonios
- Estructura: Hero + grid de cards de testimonios (estilo `TestimoniosSection` del home) + banda de logos "empresas como" + galería "Historias del Reto" (imágenes t1-t9) + CTA final → /programas.
- Incluir los 24 testimonios con nombre/país verbatim de `/comunidad/testimonios` + los 3 con foto del home (Johanna Ramírez, Nataly Domínguez, Marco García con sus quotes ricos). Dedupe: para Johanna/Nataly/Marco usar la versión rica del home (con foto), no la corta de comunidad.
- Fotos: los 3 del home usan `/testimonio-1..3.webp`; el resto usa avatar con iniciales (no inventar caras). El Reto se muestra como galería de imágenes `public/reto/testimonios/t1..t9.png`.
- Marca: cambiar "Aprendoseo/aprendoseo" → "aprendoclub" solo donde el quote nombra la marca (misma academia rebrandeada). El resto del quote queda verbatim.

### Contenido y voz
- Los quotes son de personas reales: van VERBATIM (son inherentemente humanos, no reescribir). Solo el copy propio de la página (hero, títulos de sección, CTA) debe estar humanizado, español neutro, sin em-dashes ni AI tells.
- Fuente: `03-CONTENT-SOURCE.md` (verbatim).

### Home (TEST-02)
- La `TestimoniosSection` del home ya existe y es visible. Agregar un botón "Ver todos los testimonios" → `/testimonios`. Mantener los 3 actuales en el home; los 24 viven en la página completa.

### Claude's Discretion
- Layout del grid (masonry vs columnas), paginación/"ver más" si son muchos, y diseño de la galería del Reto (lightbox opcional), respetando el design system.
- Estructura de `content/testimonios.ts` (data-driven, Payload-ready).
</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `components/testimonios-section.tsx` — card de testimonio (avatar+nombre+rol+estrellas+quote), banda de logos "empresas como", framer-motion `useInView`. Base directa para la página y para el botón TEST-02.
- Shell `(site)`; página en `app/(site)/testimonios/page.tsx` (placeholder actual).
- Patrón `content/site.ts` / `content/quienes-somos.ts` a seguir con `content/testimonios.ts`.
- Assets: `public/testimonio-1..3.webp`, `public/reto/testimonios/t1..t9.png`, logos `public/logo-*.svg`.

### Established Patterns
- Secciones "use client" con `useReducedMotion()` guard, contenido en objetos tipados, accent `#b8f60d`/`var(--accent)` solo en eyebrows+CTA.

### Integration Points
- `app/(site)/testimonios/page.tsx` (reemplazar placeholder, metadata SEO).
- `components/testimonios-section.tsx` → añadir botón "Ver todos" (TEST-02).
- `content/testimonios.ts` nuevo; posible `components/testimonios/*`.
</code_context>

<specifics>
## Specific Ideas

- Reusar la card exacta del home para coherencia.
- Galería del Reto: grid de imágenes con `alt` descriptivo; las imágenes son capturas (sin texto extraíble), tratarlas como pruebas visuales.
- Estrellas 5/5 como en el home (los quotes no traen rating numérico).
</specifics>

<deferred>
## Deferred Ideas

- Ganadores del Reto (g1-g4) y premios → opcional, mejor en la página del Reto (Fase 4).
- OCR de las imágenes del Reto para texto → no necesario en v1.0.
- Video testimonials → fuera de scope v1.0 (solo texto + imágenes).
</deferred>
