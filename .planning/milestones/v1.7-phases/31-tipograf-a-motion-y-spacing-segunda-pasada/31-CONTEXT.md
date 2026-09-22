# Phase 31: Tipografía, motion y spacing (segunda pasada) - Context

**Gathered:** 2026-07-22
**Status:** Ready for planning (ejecutado inline durante `/gsd-autonomous`)
**Mode:** Fase 100% código (sin dependencia de Payload/Neon) — se pudo ejecutar completa pese al bloqueo de seed de la Fase 30.

<domain>
## Phase Boundary

Home, Diplomado, Taller y Reto: Montserrat Bold consistente en headings, motion más notorio, spacing reducido (segunda pasada sobre lo ya hecho en v1.5).
</domain>

<decisions>
## Implementation Decisions

### TYPO-01 — alcance de "Bold"

El contrato tipográfico de v1.1 definía 3 pesos (regular/medium/semibold); el hero del home ya usa Bold desde v1.5 (HERO-01). Juan pidió "Usar Montserrat Bold" de forma general en este feedback — se interpretó como: llevar TODOS los H2 de sección (patrón `text-[1.75rem] md:text-4xl font-semibold...`, duplicado sin componente compartido en 29 archivos de `components/blocks/render/`) y los H1 de Diplomado/Taller/Reto (`Hero.tsx`, `TallerHero.tsx`, `RetoHero.tsx`) de `font-semibold` a `font-bold`. No se tocaron pesos de body text, h3 de cards, ni el blog (fuera del alcance del feedback de Juan sobre home/programas).

### LAY-02 — punto único de cambio

`section-spacing` (utility en `app/globals.css`, usado por 45 componentes) baja de `4rem/6rem` (mobile/desktop) a `2.75rem/4rem`. Como el gap visible entre dos secciones es padding-bottom + padding-top, esto reduce el hueco de 128px/192px a 88px/128px en todo el sitio de un solo cambio — mismo patrón que v1.1 uso para tokens compartidos.

### TYPO-02 — motion más notorio

Se reforzó el primitivo compartido `Card` (`components/ui/card.tsx`, usado por ProgramCard/testimonios/equipo) y el hover propio de `FeatureGrid.tsx`: de `hover:-translate-y-1` a `hover:-translate-y-1.5 hover:scale-[1.01] hover:shadow-[var(--shadow-lg)]`. Se agregó `group-hover:scale-110` al ícono de las cards de imagen (nuevo desde Fase 30). No se tocaron los keyframes de fondo (`float-slow`/`pulse-blob`/`shimmer`, ya existentes) ni el patrón BlurFade/stagger — están bien y extenderlos a más secciones es una mejora visual que conviene validar viendo el resultado en vivo antes de decidir dónde más aplicarla, no algo para inventar a ciegas.
</decisions>

<code_context>
## Existing Code Insights

- `app/globals.css`: `section-spacing` (línea ~132) es el único punto de control de padding vertical de sección, usado por 45 archivos.
- 29 archivos en `components/blocks/render/` duplican el mismo string de clases para el H2 de sección (dos variantes de orden de clases, mismo resultado visual) — no hay un componente `SectionTitle` compartido; se actualizaron ambas variantes.
- `components/ui/card.tsx`: primitivo compartido de hover (`lift`/`liftAccent`/`none`), usado por `ProgramCard`, `TestimonialRef`, `TeamGridRef`, entre otros.
- `next.config.ts` ya trae `--shadow-lg` como token en `globals.css`, reutilizado para el hover nuevo.
</code_context>

<specifics>
## Specific Ideas

Ninguna — alcance derivado de la auditoría de código, no de preferencias específicas de Juan sobre el detalle de la animación.
</specifics>

<deferred>
## Deferred Ideas

- Extender los keyframes ambientales (`float-slow`/`pulse-blob`) más allá de `CtaBanner` a otras secciones del home, si Juan lo pide después de ver el resultado en vivo.
</deferred>
