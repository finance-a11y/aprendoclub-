# Phase 35: Páginas programáticas de ciudad - Context

**Gathered:** 2026-09-22
**Status:** Ready for planning

<domain>
## Phase Boundary

Implementar las 10 páginas programáticas de ciudad de aprendoseo.com en aprendoclub mediante un modelo estructurado en Payload CMS (`CiudadesSeo`) y una ruta dedicada en Next.js (`/cursos-seo/[ciudad]`), adaptando los datos de salario, país y FAQs a cada mercado local, promocionando el Diplomado de SEO + AIO (`/programas/diplomado`), e incorporando las 10 redirecciones 301 tanto al CSV de Cloudflare Bulk Redirects como al fallback interno en `next.config.ts`.

</domain>

<decisions>
## Implementation Decisions

### Modelo en Payload y Patrón de URLs
- **Patrón de URL**: `/cursos-seo/[ciudad]` (ej: `/cursos-seo/valencia`, `/cursos-seo/cdmx`, `/cursos-seo/caracas`). Limpio, moderno y con mejor jerarquía que el `/cursos-seo/curso-seo-*` anterior.
- **Modelo en Payload**: Colección dedicada `CiudadesSeo` (o `ciudades-seo`) con campos específicos:
  - `nombre`: Nombre legible de la ciudad (ej: "Valencia", "Ciudad de México", "Caracas").
  - `slug`: Identificador URL en minúsculas (ej: "valencia", "cdmx", "caracas").
  - `pais`: País ("España", "México", "Venezuela").
  - `gentilicio`: Opcional para contextualizar copy ("en Valencia", "para profesionales en CDMX").
  - `salarioPromedio`: Texto con rango salarial adaptado a la moneda local.
  - `salarioNota`: Explicación del mercado laboral (ej: empresas locales vs. trabajo remoto internacional).
  - `faqs`: Lista de preguntas frecuentes con respuestas específicas de la ciudad (modalidad online en vivo adaptada al huso horario, oportunidades laborales).
  - `meta`: Metadatos SEO específicos (título, descripción, open graph).
- **Programa promovido**: Diplomado de SEO + AIO (`/programas/diplomado`), posicionado como la mejor ruta para aprender la disciplina y conseguir empleo o clientes de alto valor.
- **Redirecciones 301**:
  - Actualizar `.planning/deliverables/v1.8/redirects-phase33-cloudflare.csv` añadiendo las 10 filas de aprendoseo.com hacia las nuevas rutas en aprendoclub.com.
  - Agregar reglas de fallback en `next.config.ts` para capturar cualquier solicitud directa entrante a `/cursos-seo/curso-seo-*`.

### Contenido, Enriquecimiento SEO y Renderizado
- **Estructura de la plantilla**:
  - Hero enfocado en la ciudad: "Curso de SEO en {Ciudad} — Domina el posicionamiento web y la IA".
  - Sección de Salarios y Demanda Laboral: Datos reales del mercado de {Ciudad}/{País} para perfiles SEO junior/mid/senior.
  - La Solución: Presentación del Diplomado de SEO + AIO de aprendoclub (16 semanas, en vivo, proyectos reales).
  - Comparativa Local vs Remoto: Por qué formarte con aprendoclub te permite competir localmente en {Ciudad} o ganar en dólares para el exterior.
  - Testimonios relevantes y FAQs con respuestas personalizadas para {Ciudad}.
  - CTA principal hacia `/programas/diplomado`.
- **Monedas y Salarios Calibrados**:
  - **España** (Alicante, Bilbao, Málaga, Toledo, Valencia): Rango €24.000 – €38.000 / año (fuente: Glassdoor / Michael Page España).
  - **México** (CDMX, Guadalajara, Puebla): Rango $22,000 – $45,000 MXN / mes.
  - **Venezuela** (Caracas, Maracaibo): Rango $600 – $1,800 USD / mes (enfocado en talento SEO para agencias internacionales y clientes remotos).
- **Implementación Técnica en Next.js**:
  - Ruta `app/(frontend)/(site)/cursos-seo/[ciudad]/page.tsx`.
  - `generateStaticParams` para pre-renderizar las 10 ciudades en build time.
  - `generateMetadata` dinámico para OpenGraph, Canonical y Twitter Cards.
  - Schema.org JSON-LD de tipo `Course` y `EducationalOccupationalProgram` con ubicación contextual.
- **Prevención de Thin Content**:
  - Canonical explícito autorreferencial por ciudad.
  - Textos adaptados al contexto local y económico.

### the agent's Discretion
- Diseño de los componentes visuales de la plantilla utilizando los tokens de `DESIGN-SYSTEM.md` y Tailwind existentes.
- Seed data exacto para las 10 ciudades.

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `app/(frontend)/(site)/layout.tsx`: Layout principal con navbar y footer globales.
- `components/ui/button.tsx`, `components/ui/eyebrow.tsx`, `components/blocks/`: Bloques existentes del design system.
- `lib/schema.ts` y `components/json-ld.tsx`: Mapeadores de schema markup JSON-LD.
- `.planning/deliverables/v1.8/redirects-phase33-cloudflare.csv`: CSV base para incorporar las 10 redirecciones.

### Established Patterns
- Colecciones de Payload con `admin.group = 'Contenido'` o `'Programas'`.
- Hook `afterChange` con `context: { disableRevalidate: true }` para scripts CLI.

### Integration Points
- `aprendoclub/payload.config.ts`: Registrar la nueva colección `CiudadesSeo`.
- `aprendoclub/app/(frontend)/(site)/cursos-seo/[ciudad]/page.tsx`: Nueva ruta pública.
- `aprendoclub/next.config.ts`: Reglas 301 para URLs antiguas.
- `.planning/deliverables/v1.8/redirects-phase33-cloudflare.csv`: Agregar 10 filas.

</code_context>

<specifics>
## Specific Ideas

Las 10 ciudades exactas que deben existir:
1. Alicante (`alicante`) - España
2. Bilbao (`bilbao`) - España
3. Caracas (`caracas`) - Venezuela
4. CDMX (`cdmx`) - México
5. Guadalajara (`guadalajara`) - México
6. Málaga (`malaga`) - España
7. Maracaibo (`maracaibo`) - Venezuela
8. Puebla (`puebla`) - México
9. Toledo (`toledo`) - España
10. Valencia (`valencia`) - España

</specifics>

<deferred>
## Deferred Ideas

- Expansión futura a más ciudades (ej: Bogotá, Buenos Aires, Santiago, Lima, Madrid, Barcelona) una vez validado el rendimiento SEO de las 10 iniciales.

</deferred>
