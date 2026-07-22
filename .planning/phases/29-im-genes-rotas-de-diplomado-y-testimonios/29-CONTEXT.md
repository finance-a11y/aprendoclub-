# Phase 29: Imágenes rotas de Diplomado y testimonios - Context

**Gathered:** 2026-07-22
**Status:** Ready for planning (ejecutado inline durante `/gsd-autonomous`)
**Mode:** Discuss condensado — investigación técnica reemplazó las preguntas de discuss porque la causa raíz cambió el alcance de la fase a mitad de camino.

<domain>
## Phase Boundary

Diagnosticar y corregir por qué la galería del Diplomado (`diplomadoGaleria`), las fotos del equipo (`teamGridRef`) y los avatares de los 3 testimonios destacados del home (`testimonialRef`) no cargan en producción.
</domain>

<decisions>
## Implementation Decisions

### Causa raíz encontrada (no era un bug de código)

Se verificó contra producción con Chrome DevTools (network requests reales, no solo screenshot): las requests a `/_next/image?url=/api/media/file/<archivo>.avif&w=<N>&q=75` devuelven **HTTP 402 Payment Required** para casi todos los tamaños pedidos (diplomado-modulos2, diplomado-comunidad, diplomado-certificado, diplomado-modulos1, arianna, ibraim, juan, veronica — todos 402; solo `diplomado-mentorias.avif@w=3840` devolvió 200, porque ya estaba cacheado de una transformación previa exitosa).

402 en el endpoint de optimización de imágenes de Vercel = **cuota de Image Optimization transforms del plan agotada**, no un problema de Payload, de `next/image`, de los media docs, ni de `seedMedia()` (que está bien implementado: sube a Vercel Blob vía `payload.create({filePath})`, hace diff-and-update de `alt` en docs existentes).

El commit `516be82` (mismo día, previo a esta sesión) ya redujo la generación de transforms a futuro: un solo formato (`webp`, no duplica avif+webp) y `minimumCacheTTL` largo. Pero eso no revierte la cuota ya consumida en el período de facturación actual — Juan lo confirmó y pidió esperar el reset del límite en vez de bloquear el resto del milestone por esto.

### Decisión: qué se hace ahora vs. qué queda pendiente externo

- **Se hace ahora (código, en este phase):** reducir aún más la huella de transforms como prevención adicional — `images.deviceSizes` en `next.config.ts` recortado de la lista default de Next (hasta 3840px/4K) a un techo de 1200px, ya que ningún contenedor del sitio supera `max-w-6xl` (1152px). Esto no revierte la cuota agotada, pero reduce cuántas combinaciones de tamaño distintas se generan por imagen going forward, hace que la cuota rinda más y baja la probabilidad de re-agotarla el próximo período.
- **Queda pendiente, fuera del control del código (Juan ya lo sabe y decidió seguir sin bloquear):** las imágenes seguirán devolviendo 402 hasta que la cuota de Vercel resetee (o se haga upgrade de plan). La verificación visual real (`naturalWidth > 0` en producción) no se puede confirmar hoy por esta razón externa.

### Nomenclatura

Se mantiene el phase number 29 tal como lo asignó el roadmap.
</decisions>

<code_context>
## Existing Code Insights

- `lib/blocks/media.ts` (`resolveMedia`/`resolveMediaList`): adapta `Media` de Payload a `{url, alt, width, height}` para `next/image`. Correcto, no requiere cambios.
- `scripts/seed/media.ts` (`seedMedia`): sube assets a Vercel Blob vía `payload.create({filePath})`, hace diff-and-update de `alt` (fix de Fase 28-02). Correcto, no requiere cambios.
- `components/blocks/render/DiplomadoGaleria.tsx`, `TeamGridRef.tsx`, `TestimonialRef.tsx`: consumen `resolveMedia`/`resolveMediaList` correctamente; los `<Image>` de avatares (48px/64px) ya usan tamaño fijo sin `sizes`, o sea ya piden el bucket mínimo de `imageSizes` (no `deviceSizes`) — ya eran eficientes antes de este fix.
- `next.config.ts`: `images.remotePatterns` permite `*.public.blob.vercel-storage.com`; hoy también recorta `deviceSizes` a `[640, 750, 828, 1080, 1200]` (antes: default de Next hasta 3840).
</code_context>

<specifics>
## Specific Ideas

Ninguna — el alcance quedó definido por la investigación técnica, no por preferencias de diseño.
</specifics>

<deferred>
## Deferred Ideas

- Verificación visual real de que las imágenes cargan (`naturalWidth > 0` en producción) queda diferida hasta que la cuota de Vercel resetee o Juan haga upgrade de plan. No es un ítem de trabajo de código pendiente — es un bloqueo externo ya conocido y aceptado por Juan.
</deferred>
