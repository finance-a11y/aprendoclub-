# Phase 5: Enlazado interno - Context

**Gathered:** 2026-07-04
**Status:** Ready for planning
**Mode:** Auto-decidido (fase mecánica de bajo riesgo, sin discuss interactivo)

<domain>
## Phase Boundary

Tejer enlaces internos cruzados entre todas las páginas del sitio para que no haya callejones sin salida ni páginas huérfanas, con anchor text descriptivo (SEO interno). Cubre LINK-01. No crea páginas nuevas ni contenido; solo agrega/ajusta enlaces contextuales en las páginas ya construidas (home, /quienes-somos, /testimonios, /programas, /programas/taller-seo-con-ia, /reto, /diplomado).
</domain>

<decisions>
## Implementation Decisions

### Enlaces cruzados a agregar (contextuales, anchor text descriptivo)
- **/quienes-somos** → enlace a `/testimonios` (p. ej. desde stats/equipo: "mira las historias de nuestros estudiantes") y ya tiene CTA a `/programas`.
- **/testimonios** → enlace a `/quienes-somos` ("conoce al equipo detrás de aprendoclub") además del CTA a `/programas` existente.
- **/programas** (hub) → cada card ya enlaza su página; agregar un enlace a `/testimonios` ("lee lo que dicen quienes ya pasaron por aquí") o a `/quienes-somos`.
- **Páginas de programa** (Diplomado, Taller, Reto) → agregar enlaces de retorno contextuales: a `/programas` ("ver todos los programas") y a `/testimonios` donde tenga sentido (prueba social).
- **Home** → ya enlaza a quienes-somos, testimonios y programas (teasers de fases 2-4). Verificar que estén todos y sean descriptivos.

### Reglas
- Anchor text descriptivo, nunca "clic aquí" ni "aquí".
- Reusar estilos de enlace/CTA existentes del design system (accent solo en CTAs; enlaces inline con subrayado/hover coherente).
- No romper el build; mantener el patrón data-driven donde el enlace viva en `content/`.
- Verificar que ninguna página quede huérfana (todas alcanzables desde el navbar/footer + enlaces contextuales) y que no haya enlaces muertos.

### Claude's Discretion
- Ubicación exacta y redacción (humanizada, español neutro, sin em-dashes) de cada enlace contextual.
</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- Todas las páginas de fases 1-4 ya construidas bajo el shell `(site)`.
- `content/*.ts` con la copy; agregar enlaces ahí o en los componentes según corresponda.
- CTAs existentes: quienes-somos → /programas, testimonios → /programas, hub cards → páginas.

### Integration Points
- Componentes de sección de cada página (CTA/cierre) donde insertar los enlaces cruzados.
- Verificación final: `npm run build` + revisión de que cada ruta enlaza al menos a otras 2 páginas del sitio.
</code_context>

<specifics>
## Specific Ideas

- Priorizar enlaces que refuercen conversión: prueba social (testimonios) y confianza (quiénes somos) desde las páginas de programa.
</specifics>

<deferred>
## Deferred Ideas

- Breadcrumbs estructurados / schema BreadcrumbList → opcional, futuro.
- Blog/recursos interlinking → v1.1 con Payload.
</deferred>
