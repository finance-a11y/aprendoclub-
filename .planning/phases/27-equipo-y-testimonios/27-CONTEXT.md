# Phase 27: Equipo y testimonios - Context

**Gathered:** 2026-07-11
**Status:** Ready for planning

<domain>
## Phase Boundary

El equipo mostrado en quienes-somos y la sección de testimonios reflejan el estado actual del negocio: Dana Aliaga reemplaza a Diana Rodríguez en el team grid, y se elimina la sección de logos de empresas confiadas de /testimonios. Alcance: `scripts/seed/seed-data/quienes-somos.ts` (team grid), `scripts/seed/seed-data/testimonios.ts` (trustedCompanies/logosBanda), `scripts/seed/pages.ts` (bloque logosRef en buildTestimonios).

</domain>

<decisions>
### Diana → Dana Aliaga (TEAM-01)

- No existe foto de Dana en `public/coaches/` (solo `diana.avif`, que es la cara de otra persona). Usar avatar de iniciales "DA" (fallback ya soportado por el componente TeamMember) hasta que Juan aporte la foto real — NO reusar `diana.avif`.
- Nombre: "Dana Aliaga"
- Rol: mantener "SEO Specialist" (sin info nueva confirmada)
- Bio: mantener el texto genérico actual ("Especialista en SEO, enfocada en ejecución y resultados.") — sin datos reales de Dana no se inventa contenido específico
- Campo `iniciales`: cambiar de "DR" a "DA"
- Campo `foto`: dejar sin foto (usar el mecanismo de fallback a iniciales del componente, no apuntar a un archivo inexistente ni reusar diana.avif)

### Quitar logos de empresas en /testimonios (TESTIM-01)

- Eliminar el bloque `logosRef` completo del array de `buildTestimonios()` en `scripts/seed/pages.ts` (no solo vaciar el array de empresas) — evita renderizar un bloque vacío con eyebrow/texto huérfano
- Borrar el código fuente no usado: `trustedCompanies` (array) y `logosBanda` (texto) de `scripts/seed/seed-data/testimonios.ts`
- NO tocar la colección Payload `ClientesTrabajados` — queda intacta y disponible en /admin, solo se saca la referencia de la página testimonios

### Claude's Discretion

- Formato exacto del objeto TeamMember para Dana sin foto (verificar cómo el componente maneja `foto: undefined` o si requiere string vacío — seguir el patrón que ya usa el componente para fallback de iniciales, revisar TeamMember/coaches component antes de decidir)

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- Componente de team grid en quienes-somos ya soporta avatar de iniciales como fallback (usado hoy con `iniciales: "AL"`, "DR", etc.)
- `scripts/seed/pages.ts:482` función `buildTestimonios()` — array de blocks, incluye `logosRef` en la posición actual (después de `testimonialRef`, antes de `retoGaleria`)

### Established Patterns
- Contenido en objetos TypeScript tipados en `scripts/seed/seed-data/*.ts`, consumido por `scripts/seed/pages.ts` al construir el seed de Payload
- Requiere re-seed (`npm run seed`) para propagar a Postgres/Neon

### Integration Points
- `scripts/seed/pages.ts` línea ~505-512: bloque `logosRef` a eliminar
- La colección `ClientesTrabajados` (Payload) queda sin consumidores de esta página tras el cambio, pero no se toca — puede usarse en otro lugar

</code_context>

<specifics>
## Specific Ideas

Ninguna referencia adicional. Pasar el copy que se mantenga (bio de Dana) por la skill humanizer si se reescribe algo, aunque en este caso el texto se conserva igual (no hay reescritura nueva).

</specifics>

<deferred>
## Deferred Ideas

- Foto real de Dana Aliaga — pendiente de que Juan la aporte, queda como avatar de iniciales mientras tanto
- Rol/bio específicos de Dana si Juan los confirma más adelante — actualmente se mantiene el texto genérico heredado

</deferred>
