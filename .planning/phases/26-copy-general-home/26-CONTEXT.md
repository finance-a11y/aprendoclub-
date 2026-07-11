# Phase 26: Copy general + Home - Context

**Gathered:** 2026-07-11
**Status:** Ready for planning

<domain>
## Phase Boundary

El copy general del sitio deja de usar "real"/"reales" y de-enfatiza la palabra "SEO" en favor de "marketing/IA/tecnología"; el home refleja subtítulo y cifra de estudiantes actualizados. Alcance: `scripts/seed/seed-data/*.ts` (todos los archivos) + `scripts/seed/globals.ts` (meta description global). No incluye equipo/testimonios (Phase 27), nombre del diplomado (Phase 28) ni FAQs (Phase 29).

</domain>

<decisions>
### Reemplazo de "real"/"reales" (21 ocurrencias de copy visible al usuario, ver code_context)

- Frases tipo "proyectos reales"/"casos reales" (contexto práctico): cortar el adjetivo, dejar que el sustantivo hable solo — "proyectos", "casos de estudiantes actuales"
- Frases tipo "una carrera real"/"especialización real"/"necesidad real" (abstracto/aspiracional): reformular sin el adjetivo — "una carrera con salida laboral", "una especialización", "una necesidad concreta del mercado"
- Frases tipo "sitios reales"/"ingresos reales"/"visibilidad real" (resultado tangible): reemplazar con específico y medible — "sitios de clientes", "ingresos adicionales", "visibilidad en buscadores"
- Rutas de imagen `/diplomado/real/*.avif`: NO tocar — son archivos físicos, no copy de marca, fuera de alcance de COPY-01
- Comentarios de código que dicen "real"/"reales" (ej. `// TODO Juan: confirmar URL real de checkout`, comentarios sobre "foto real" o "assets reales"): NO tocar — no son copy visible al usuario
- Aplicar el criterio caso por caso al redactar (no find-replace ciego), pasar por skill humanizer antes de publicar

### De-énfasis de "SEO" (COPY-02)

- Badge home "+500 estudiantes ya aprenden SEO con IA" → "...aprenden marketing con IA" (SEO queda implícito, no desaparece del todo del sitio)
- Subtítulo hero home "Especialízate en SEO con la plataforma..." → "Especialízate en marketing con IA con la plataforma..." (alinear con `tituloAccent` que ya dice "marketing e IA" desde v1.5)
- Título quienes-somos "La primera academia de SEO pensada para el mundo hispano" → "La primera academia de marketing con IA pensada para el mundo hispano" — **NOTA: quienes-somos.ts está técnicamente en Phase 27, pero este título específico es una instancia directa de COPY-02 (de-énfasis SEO), así que se incluye en el barrido de Phase 26 aunque el archivo se toque también en Phase 27 para TEAM-01/TESTIM-01. El executor de Phase 26 puede tocar este título; Phase 27 no debe revertirlo.**
- Meta description global (`scripts/seed/globals.ts`, líneas ~65 y ~133, "Academia de SEO e IA para el mundo hispano...") → "Academia de marketing con IA para el mundo hispano..." con el mismo criterio
- Barrido completo: cualquier otra ocurrencia de "SEO" como frase central de posicionamiento (no como término técnico dentro de contenido educativo, ej. "aprender SEO" en el detalle de un módulo del diplomado SÍ puede quedar — ese es de-énfasis de posicionamiento de marca, no censura total de la palabra) se resuelve con el mismo criterio marketing/IA

### Home — subtítulo + cifra de estudiantes (HOME-01, HOME-02)

- El pedido original "quitar 'academia de SEO' y 'acompañamiento real' del subtítulo" se da por resuelto: ese string literal ya no existe (v1.5 ya cambió el hero). Se aplica el barrido general de de-énfasis SEO de arriba sobre el subtítulo actual, sin acción adicional puntual.
- Badge home: cifra "+500 estudiantes ya aprenden SEO con IA" → "+10.000 estudiantes ya se unieron" (aplicar formato con punto de miles, consistente con el resto del sitio, ej. "2.000" en quienes-somos)
- `ratingTexto` "4.9/5 de +500 estudiantes" → "4.9/5 de +10.000 estudiantes" (mismo cambio de cifra, por consistencia)
- La cifra de quienes-somos ("2,000+ estudiantes formados" / "más de 2.000 personas") queda FUERA de esta fase — es un dato histórico distinto (año de fundación 2022) y quienes-somos.ts se toca en Phase 27 para otros requirements; si Juan quiere subirla también a 10.000 debe confirmarse explícitamente en Phase 27, no asumir aquí.

### Claude's Discretion

- Wording exacto de cada una de las 21 reescrituras de "real"/"reales": aplicar los criterios de arriba, redactar con voz humanizada (skill humanizer), sin inventar datos o resultados no confirmados por Juan.
- Formato exacto del separador de miles en "+10.000" (punto vs coma) — usar punto por consistencia con "2.000" existente en quienes-somos, salvo que rompa un patrón ya establecido en el componente del badge.

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- Contenido vive en `scripts/seed/seed-data/*.ts` (TypeScript, no Payload admin directo) — los cambios de copy son ediciones de estos archivos, seguidas de re-seed o edición manual en /admin para reflejarse en la DB.
- Meta description global en `scripts/seed/globals.ts` (site-settings), no en home.ts.

### Established Patterns
- El contenido está tipado (interfaces exportadas) — mantener la forma de los objetos al editar strings.
- Separador de miles ya usa punto en quienes-somos ("2.000"), coma en algunos stats de home ("2,000+") — inconsistencia preexistente, no introducir una tercera variante.

### Integration Points
- `scripts/seed/pages.ts` función `buildHome()` consume `home.hero.badgeText`, `home.hero.subtitulo`, `home.hero.ratingTexto` — no requiere cambios de código, solo de datos.
- Requiere correr el seed script (o editar vía /admin) para que los cambios lleguen a la DB de Postgres/Neon.

### 21 ocurrencias de copy visible a reescribir (líneas de referencia, sujetas a cambiar si el archivo se edita antes)
- `quienes-somos.ts`: 81, 95, 166 — **nota**: TEAM-01/TESTIM-01 no tocan estas líneas, así que Phase 26 puede editarlas sin conflicto real de merge, aunque el archivo completo se re-toca en Phase 27
- `home.ts`: 89, 122, 286 (copy "real") + 36, 41 (SEO badge/subtítulo) + 54 (ratingTexto)
- `diplomado.ts`: 46, 76, 113, 151, 164, 200, 242, 307, 355, 369, 517, 547 (12 instancias — el archivo completo se vuelve a tocar en Phase 28 para BRAND-01, mismo motivo de orden en el roadmap)
- `faqs.ts`: 41 (se vuelve a tocar en Phase 29 para FAQ-01)
- `testimonios.ts`: 60 (se vuelve a tocar en Phase 27 para TESTIM-01)
- `reto.ts`: 248
- `globals.ts`: 65, 133 (meta description)

</code_context>

<specifics>
## Specific Ideas

Ninguna referencia específica de estilo más allá de los criterios de arriba. Pasar todo por la skill humanizer antes de dar por terminada la fase (instrucción estándar de Juan para cualquier copy publicado).

</specifics>

<deferred>
## Deferred Ideas

- Actualizar la cifra de estudiantes en quienes-somos.ts (2.000 → posible 10.000) — diferido a Phase 27, requiere confirmación explícita de Juan
- Renombrar la carpeta física `/diplomado/real/*.avif` — fuera de alcance, es trabajo técnico no pedido

</deferred>
