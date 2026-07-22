# Phase 28: Rebranding del diplomado - Context

**Gathered:** 2026-07-11
**Status:** Ready for planning

<domain>
## Phase Boundary

El diplomado se presenta de forma consistente bajo su nuevo nombre "Diplomado de SEO + AIO" en todas las páginas y datos donde aparece "Diplomado de Cero a SEO". Alcance: `scripts/seed/seed-data/diplomado.ts` (badgeText, alt de imagen), `scripts/seed/seed-data/testimonios.ts` (mención en testimonio), `scripts/seed/collections.ts` (nombre del programa en el hub, nav/programMenu), `scripts/seed/seed-data/home.ts` (CTA de WhatsApp). Incluye además un fix colateral fuera del scope original de Phase 26: "Práctica real" en `collections.ts:20`.

</domain>

<decisions>
### Renombrar el diplomado (BRAND-01)

Nombre nuevo confirmado por Juan: **"Diplomado de SEO + AIO"**. Reemplazo literal de "Diplomado de Cero a SEO" (case-insensitive, respetando mayúsculas de cada ocurrencia) en:
- `scripts/seed/seed-data/diplomado.ts:41` (`badgeText`)
- `scripts/seed/seed-data/diplomado.ts:80` (alt de imagen del certificado)
- `scripts/seed/seed-data/testimonios.ts:146` (mención en testimonio — "el Diplomado de Cero a SEO de Ari" → "el Diplomado de SEO + AIO de Ari")
- `scripts/seed/collections.ts:18` (`nombre` del programa en la colección `programas`)
- `scripts/seed/collections.ts:58` (`label` en `programMenu`, usado para nav)

### Fix colateral: "Práctica real" (collections.ts:20)

Quedó fuera del barrido de Phase 26 porque esa fase solo tocó `seed-data/*.ts` + `globals.ts`, no `collections.ts`. Se corrige ahora ya que Phase 28 toca este mismo archivo: "Práctica real, coaching en vivo y certificación" → "Práctica aplicada, coaching en vivo y certificación" (mismo criterio de Phase 26: cortar el adjetivo por algo concreto).

### CTA de WhatsApp (home.ts:294)

El mensaje prellenado del botón de WhatsApp menciona "...ingresar al Diplomado de SEO para convertirme..." (texto URL-encoded). Se actualiza a "...ingresar al Diplomado de SEO + AIO para convertirme..." por consistencia con el nuevo nombre, aunque no sea visible en pantalla hasta que se abre WhatsApp.

### Lo que NO se toca

- `programMenu[0].desc` ("16 semanas para convertirte en especialista SEO") y `programas[0].descripcion` (contiene "especialista SEO") — describen la especialidad que se aprende, no son tagline de posicionamiento de marca. Mismo criterio de exclusión rol/dominio usado en Phase 26.
- Cualquier otra mención genérica de "Diplomado" sin el nombre completo "de Cero a SEO" (ej. "el Diplomado puede ayudarte", "Diplomado completo de SEO") — no es el nombre formal del programa, es referencia genérica; ya cubierto por el de-énfasis de SEO de Phase 26.

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `scripts/seed/collections.ts` define `programas[]` (fuente de la colección Payload `Programas`, consumida por el hub `/programas` y el grid de home) y `programMenu[]` (fuente de `menuDesc`/`menuBadge` del nav — el shell ya no lee de este archivo, lee de la colección Payload).

### Established Patterns
- Igual que Phase 26/27: edición de objetos TypeScript en `scripts/seed/`, requiere `npm run seed` para propagar a Postgres/Neon.

### Integration Points
- `scripts/seed/collections.ts` alimenta tanto la colección `programas` (Payload) como el nav vía seed — un solo cambio de nombre en `nombre`/`label` cubre ambos.

</code_context>

<specifics>
## Specific Ideas

Nombre exacto confirmado por Juan: "Diplomado de SEO + AIO". No inventar variantes.

</specifics>

<deferred>
## Deferred Ideas

Ninguna — todo lo identificado se resuelve en esta fase.

</deferred>
