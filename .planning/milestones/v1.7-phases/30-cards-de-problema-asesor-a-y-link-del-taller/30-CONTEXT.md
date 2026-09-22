# Phase 30: Cards de problema, asesoría y link del Taller - Context

**Gathered:** 2026-07-22
**Status:** Ready for planning (ejecutado inline durante `/gsd-autonomous`)
**Mode:** Todo el copy y las decisiones vienen verbatim del feedback de Juan (doc ClickUp) — no hay ambigüedad de wording que discutir.

<domain>
## Phase Boundary

Home: copy + íconos nuevos de las 4 cards de "problema", copy actualizado del widget de asesoría gratuita, y CTA del Taller apuntando a página estable mientras se termina la nueva.
</domain>

<decisions>
## Implementation Decisions

### CARDS-02 — selección de íconos (decisión propia, no especificada por Juan)

Juan autorizó usar https://3dicons.co/ para los 4 íconos ilustrados. El catálogo gratuito de ese sitio (v1, ~130-217 íconos indexados, sin buscador funcional en el sitio) es genérico (calendario, billetera, cohete, etc.) — **no tiene un ícono literal de "robot"/"IA"/"cerebro"/"reloj de arena"**. Se investigó exhaustivamente (grep de nombres de todo el catálogo cargado) antes de sustituir por la mejor alternativa semántica disponible:

- Card 1 (especialización/perfil claro) → **Target** (diana) — foco/especialización, match directo.
- Card 2 (contenido desactualizado, nadie corrige) → **Clock** (reloj despertador) — urgencia/tiempo, buen match.
- Card 3 (sigues cobrando lo mismo) → **Dollar** (moneda con "$") — dinero estancado, match directo.
- Card 4 (la IA te deja atrás) → **Rocket** — no es literal ("IA"), pero comunica bien la metáfora de "otros acelerando mientras vos quedás atrás". Es la decisión más débil de las 4; swap fácil vía `/admin` (subir otra imagen al campo `image` del item) si a Juan/Arianna no les convence viendo el resultado.

Archivos descargados de 3dicons.co (licencia open-source del set v1, uso ya autorizado por Juan en esta conversación) a `public/icons/problema/`: `especializacion.webp`, `desactualizado.webp`, `mismo-precio.webp`, `ia-te-deja-atras.webp` (200px, ~8-15KB c/u).

### PROG-LINK-01 — alcance exacto

El `ctaHref` de la Programa "Taller SEO con IA" en la colección `programas` cambia de `/programas/taller-seo-con-ia` (página propia en construcción) a `https://www.aprendoclub.com/evento` (página estable existente), tal como pidió Juan. Diplomado y Reto NO cambian: Diplomado (`/diplomado`) es la página que se está mejorando activamente en este mismo milestone (no una "anterior" separada); Reto (`/reto`) ya es la página estable — el link `https://www.aprendoclub.com/reto` que dio Juan es el mismo dominio, mismo path.

### ADV-05 — copy del widget

Se reemplaza texto completo (eyebrow, título, subtítulo, 9 bullets) por el wording exacto del doc de Juan. Se mantiene el CTA de WhatsApp existente (`botonHref`) — Juan no pidió cambiarlo, solo el copy visible.
</decisions>

<code_context>
## Existing Code Insights

- `scripts/seed/seed-data/home.ts`: `problema.items` (4 cards, copy viejo) y `asesoriaWidget` (copy viejo) — ambos se reemplazan.
- `scripts/seed/pages.ts` `buildHome()`: el mapeo de `featureGrid` para `problema` (línea ~113) no pasaba el campo `image` a Payload — hay que agregarlo vía `mediaId(mediaMap, i.image, ...)`, igual que ya se hace para `avatares`/`videoBackground` del hero.
- `blocks/FeatureGrid.ts`: el campo `image` (upload → media) ya existe en el schema de Payload, condicionado a `iconMode === 'image'` — no requiere migración.
- `scripts/seed/media.ts` `collectMediaAssets()`: hay que agregar los 4 paths nuevos de íconos al manifest para que `seedMedia()` los suba a Vercel Blob.
- `lib/programas.ts` / colección `programas`: `ctaHref` del Taller se edita en el seed de la colección `programas` (`scripts/seed/collections.ts`, línea ~35: `ctaHref: '/programas/taller-seo-con-ia'`).
</code_context>

<specifics>
## Specific Ideas

Todo el copy (cards, widget) es verbatim del feedback de Juan — ver REQUIREMENTS.md CARDS-01 y ADV-05 para el texto exacto.
</specifics>

<deferred>
## Deferred Ideas

Ninguna.
</deferred>
