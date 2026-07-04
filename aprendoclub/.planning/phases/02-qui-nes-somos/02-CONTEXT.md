# Phase 2: Quiénes somos - Context

**Gathered:** 2026-07-03
**Status:** Ready for planning

<domain>
## Phase Boundary

Construir la página `/quienes-somos` (bajo el shell `(site)`) con la historia, misión y equipo de aprendoclub, y un teaser en el home que enlace a ella. Cubre ABOUT-01 y ABOUT-02. NO toca testimonios (Fase 3) ni programas (Fase 4).
</domain>

<decisions>
## Implementation Decisions

### Estructura de la página
- Secciones: Hero + Historia/misión ("aprendoclub nació para cerrar la brecha") + Fundadora (bio Arianna Lupi) + Equipo (5 personas) + valores/metodología (EPAM) + CTA final hacia programas.
- Equipo: grid de 5 (Arianna Lupi, Diana Rodríguez, Ibraim Zayed, Juan Carlos Angulo, Verónica Romero) con nombre + rol; foto si existe, si no avatar con iniciales.
- Stats reutilizados del home: 2,000+ estudiantes, 30+ empresas, $2M+ generados.

### Contenido y voz — REGLA DURA DE JUAN
- **Todos los textos deben estar basados LITERALMENTE en el contenido real de aprendoseo.com** (ver `.planning/research/CONTENT-INVENTORY.md`) — nada inventado.
- **Todo el copy debe estar HUMANIZADO: cero rastros de IA.** Sin em/en dashes (— / –), sin frases tipo "en el mundo de", "no se trata solo de", "ya sea", listas de tres perfectas, ni cadencia robótica. Voz natural variada, español neutro (no voceo). Aplicar los principios del humanizer skill de Juan a cada bloque de texto antes de darlo por hecho.
- Marca: todo "aprendoclub" (no "aprendoseo"). Reconciliar cifras al valor coherente del home (2,000+ estudiantes, 30+ empresas, $2M+).
- Bio Arianna: basada en la de `InstructorSection` + datos del inventory (Magíster en Big Data Analytics, primera mujer en moderar una conferencia de Google en español, $2M generados, clientes Unilever y HubSpot, fundó en 2022).
- Bios del equipo: obtener el contenido real de las páginas `/autor/*` de aprendoseo.com durante la ejecución (arianna-lupi, diana-rodriguez, ibraim-zayed, juan-angulo, veronica-romero); humanizar. Si una bio no está disponible, usar solo nombre + rol del inventory (no inventar).
- Fotos equipo: usar `public/avatar-1..5.webp` y `public/arianna-lupi.webp` si calzan; si no, avatar con iniciales. No inventar caras.

### Home teaser (ABOUT-02)
- Reutilizar la `InstructorSection` existente del home como teaser de "quiénes somos": agregar un CTA/link "Conoce más sobre nosotros" → `/quienes-somos`.
- No duplicar contenido: solo sumar el enlace, sin crear una sección about paralela.

### Claude's Discretion
- Layout fino de cada sección, orden interno, y componentes concretos, respetando el design system (Montserrat, `#b8f60d`, `var(--bg-primary)`, `container-padding`, `section-spacing`, framer-motion `useInView`).
- Estructura del contenido en la capa `content/` (p. ej. `content/quienes-somos.ts`) siguiendo el patrón data-driven de Fase 1.
</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `components/instructor-section.tsx` — bio de Arianna + stats; base del teaser y de la sección Fundadora.
- `components/testimonios-section.tsx` — patrón de grid de cards (útil para el grid de equipo).
- Shell `(site)` de Fase 1: `app/(site)/layout.tsx` monta navbar+footer; la página vive en `app/(site)/quienes-somos/page.tsx` (hoy placeholder).
- Capa `content/site.ts` — patrón data-driven a seguir con `content/quienes-somos.ts`.
- Assets: `public/arianna-lupi.webp`, `public/avatar-1..5.webp`.
- Tokens/utilities en `app/globals.css`.

### Established Patterns
- Secciones "use client" con framer-motion `useInView`; contenido en objetos tipados.
- Alias `@/`.

### Integration Points
- `app/(site)/quienes-somos/page.tsx` (reemplazar placeholder por página real, con metadata propia).
- Home `app/(site)/page.tsx` → añadir link en la InstructorSection o justo después.
- `content/quienes-somos.ts` nuevo.
</code_context>

<specifics>
## Specific Ideas

- Fuente de contenido: `.planning/research/CONTENT-INVENTORY.md` (JOB 1 about/team + `public/diplomadoseo` "aprendoclub nació para cerrar esa brecha"). Complementar con fetch de `/autor/*` en ejecución.
- Historia verbatim de referencia: *"aprendoclub nació para cerrar esa brecha... Arianna Lupi lo vivió en carne propia cuando gestionaba una agencia SEO."* — humanizar, no pegar tal cual si suena a IA.
- Quote de Arianna verbatim: *"Nuestro norte no es que entiendas SEO — es que lo apliques, lo vendas y construyas una carrera real con él."* (quitar el em dash al humanizar).
</specifics>

<deferred>
## Deferred Ideas

- Testimonios → Fase 3.
- Programas y CTA a programas específicos → los enlaces existirán tras Fase 4; el CTA de esta página puede apuntar a `/programas` (hub placeholder ya existe).
- Páginas `/autor/[slug]` individuales por miembro → fuera de scope v1.0.
</deferred>
