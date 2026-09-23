# Phase 36: Páginas de programa nuevas - Context

**Gathered:** 2026-09-22
**Status:** Ready for planning

<domain>
## Phase Boundary

Publicar las 2 páginas de programas restantes de aprendoseo.com en aprendoclub:
1. **Curso SEO RDSS** (taller intensivo de 2 horas con Arianna Lupi, $30 USD).
2. **Curso Básico de SEO** (curso introductorio gratuito de 4 módulos, $0 USD).

Ambas páginas se integran en la colección `pages` de Payload CMS bajo los slugs `/programas/curso-seo-rdss` y `/programas/curso-basico-de-seo`, se dan de alta en la colección `programas` para que aparezcan en el catálogo general, se enlazan con Schema.org `Course`, y sus URLs anteriores (`/curso-seo-rdss` y `/curso-basico-de-seo`) se redirigen vía 301 tanto en Cloudflare como en `next.config.ts`.

</domain>

<decisions>
## Implementation Decisions

### URLs y Modelado
- **Rutas Canónicas**:
  - `/programas/curso-seo-rdss` (slug en `pages`: `programas/curso-seo-rdss`)
  - `/programas/curso-basico-de-seo` (slug en `pages`: `programas/curso-basico-de-seo`)
- **Colección `pages`**: Ambas páginas se construyen usando los bloques nativos del page-builder de Payload (`hero`, `featureGrid`, `faqAccordion`, `testimonialRef`, `ctaBanner`).
- **Colección `programas`**: Se crean dos nuevos documentos en `programas` para que ambos figuren en el índice general `/programas`:
  - `curso-seo-rdss`: Badge "Taller Intensivo 2h", Precio "$30 USD", `ctaHref: '/programas/curso-seo-rdss'`.
  - `curso-basico-de-seo`: Badge "Curso Gratuito", Precio "$0 USD (Gratis)", `ctaHref: '/programas/curso-basico-de-seo'`.
- **Precios y Acciones**:
  - Curso SEO RDSS: $30 USD.
  - Curso Básico de SEO: Gratuito ($0 USD).

### Contenido y Voz de Marca
- **Curso SEO RDSS**:
  - Enfoque: Taller práctico intensivo de 2 horas para aprender a auditar y optimizar sitios web de clientes o propios con metodología ágil.
  - Instructor: Arianna Lupi.
  - Secciones: Hero con propuesta de valor, Lo que aprenderás en 2h (auditoría exprés, quick wins SEO, priorización de cambios técnicos), Testimonios, FAQs y botón de compra de $30 USD.
- **Curso Básico de SEO**:
  - Enfoque: Puerta de entrada al posicionamiento web para principiantes sin conocimientos técnicos.
  - 4 Objetivos de Aprendizaje:
    1. Entender los mecanismos de rastreo, indexación y renderizado de los motores de búsqueda.
    2. Realizar una investigación de palabras clave (keyword research) identificando la intención de búsqueda.
    3. Aplicar optimizaciones On-Page esenciales (títulos, encabezados, URLs y metadatos).
    4. Medir e interpretar el rendimiento básico en Google Search Console.
  - Secciones: Hero con acceso gratuito, Los 4 objetivos explicados, Testimonios de alumnos que empezaron de cero, Temario resumido y CTA a registrarse gratis.

### Schema.org y SEO
- Se configuran en `aprendoclub/lib/schema-mappers.ts` dentro de `COURSES` con tipos de schema `Course`:
  - `"programas/curso-seo-rdss"` (price: 30 USD)
  - `"programas/curso-basico-de-seo"` (price: 0 USD)
- Metadatos con canonical propio autorreferencial y OpenGraph optimizado.

### Redirecciones 301
- Se agregan las 2 filas correspondientes al CSV de Cloudflare Bulk Redirects:
  - `https://www.aprendoseo.com/curso-seo-rdss,https://www.aprendoclub.com/programas/curso-seo-rdss,301,true`
  - `https://www.aprendoseo.com/curso-basico-de-seo,https://www.aprendoclub.com/programas/curso-basico-de-seo,301,true`
- Se configuran los redirects internos en `aprendoclub/next.config.ts`:
  - `{ source: "/curso-seo-rdss", destination: "/programas/curso-seo-rdss", permanent: true }`
  - `{ source: "/curso-basico-de-seo", destination: "/programas/curso-basico-de-seo", permanent: true }`

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `aprendoclub/app/(frontend)/(site)/[...slug]/page.tsx`: Catch-all que automáticamente renderiza páginas de la colección `pages` buscando por `where: { slug: { equals: slug } }`.
- `aprendoclub/lib/schema-mappers.ts`: Mapeo de `COURSES` para inyección de datos estructurados.
- Bloques de Payload: `hero`, `featureGrid`, `faqAccordion`, `testimonialRef`, `ctaBanner`.

### Established Patterns
- Slugs anidados en `pages` con prefijo `programas/`.
- Uso de `context: { disableRevalidate: true }` en scripts de seed.

### Integration Points
- Colección `pages` y `programas` en Neon DB
- `aprendoclub/next.config.ts`
- `aprendoclub/lib/schema-mappers.ts`
- `.planning/deliverables/v1.8/redirects-phase33-cloudflare.csv`

</code_context>

<specifics>
## Specific Ideas

- Ninguna de las dos páginas debe tener enlaces rotos a la antigua web de aprendoseo.
- El catch-all de Next.js resolverá ambas rutas limpiamente en `/programas/curso-seo-rdss` y `/programas/curso-basico-de-seo`.

</specifics>

<deferred>
## Deferred Ideas

- Sistema de plataforma LMS o portal de estudiantes integrado (el acceso a lecciones se gestiona externamente o vía email).

</deferred>
