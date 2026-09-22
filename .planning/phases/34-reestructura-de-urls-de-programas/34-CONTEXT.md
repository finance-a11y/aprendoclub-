# Phase 34: Reestructura de URLs de programas - Context

**Gathered:** 2026-09-22
**Status:** Ready for planning
**Mode:** Infrastructure phase (URL restructuring & internal redirects)

<domain>
## Phase Boundary

Mover las páginas de programas `/reto` y `/diplomado` hacia sus rutas canónicas anidadas `/programas/reto` y `/programas/diplomado`, alineándolas con la estructura ya establecida por `/programas/taller-seo-con-ia`.
Configurar redirecciones permanentes 301 en `next.config.ts` desde `/reto` y `/diplomado` hacia sus nuevas rutas, y actualizar todos los enlaces internos del sitio (navbar, footer, cards de programas en home, CTAs de blog, schema mappers, seed scripts y base de datos en Neon vía Payload CMS).

</domain>

<decisions>
## Implementation Decisions

### 1. Rutas y catch-all
- Las nuevas rutas canónicas son `/programas/reto` y `/programas/diplomado`.
- El catch-all de Next.js `app/(frontend)/(site)/[...slug]/page.tsx` ya soporta slugs multidominio como `programas/taller-seo-con-ia` al buscar en la colección `pages` con `where: { slug: { equals: slug } }`.
- No se requiere crear carpetas fijas en `app/`, ya que Payload maneja dinámicamente el layout y los bloques de ambas páginas.

### 2. Redirecciones internas 301
- Se agregan en `aprendoclub/next.config.ts` dentro de `redirects()` con `permanent: true` (HTTP 301):
  - `/reto` → `/programas/reto`
  - `/diplomado` → `/programas/diplomado`
- El hook de Payload `pageRedirectHook` también registrará la redirección en la colección `redirects` de Payload como capa de seguridad secundaria.

### 3. Base de Datos en Neon (Payload CMS)
- Se ejecuta un script de migración en `aprendoclub/scripts/` para actualizar:
  - Colección `pages`: cambiar slugs de `diplomado` a `programas/diplomado` y de `reto` a `programas/reto`.
  - Colección `programas`: actualizar `ctaHref` de `/diplomado` a `/programas/diplomado` y `/reto` a `/programas/reto`.
  - Global `site-settings`: actualizar enlaces de navegación de menú y footer para apuntar directamente a las rutas `/programas/*`.

### 4. Enlaces internos en código
- Actualizar `aprendoclub/components/blog/post-cta.tsx` (`/diplomado` → `/programas/diplomado`).
- Actualizar `aprendoclub/lib/schema-mappers.ts` (keys `programas/diplomado` y `programas/reto`, con sus paths respectivos).
- Actualizar scripts de seed (`collections.ts`, `globals.ts`, `pages.ts`, `rewrite-links.ts`) para mantener sincronía en futuros entornos de prueba o re-seed.
- Actualizar `lib/llms/seed.ts` con las URLs absolutas nuevas.

### the agent's Discretion
- Formato del script de migración y validación de tipos.
- Comprobación en vivo contra Neon DB para asegurar que tanto `/programas/reto` como `/programas/diplomado` devuelvan status 200 y que `/reto` y `/diplomado` respondan con redirect 301.

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `app/(frontend)/(site)/[...slug]/page.tsx`: Catch-all que ya resuelve `programas/taller-seo-con-ia`.
- `aprendoclub/next.config.ts`: Ya implementa `redirects()` con regla para `/home` → `/`.
- `aprendoclub/lib/schema-mappers.ts`: Contiene el objeto `COURSES` indexado por slug para structured data JSON-LD.

### Established Patterns
- Slugs anidados en Payload usan `/` como separador (`programas/taller-seo-con-ia`).
- Redirecciones en `next.config.ts` se ejecutan al borde de Next.js antes de tocar la función o renderizado.

### Integration Points
- `next.config.ts`
- Colección `pages` y `programas` en Neon DB
- Global `site-settings` en Neon DB
- `components/blog/post-cta.tsx`
- `lib/schema-mappers.ts`

</code_context>

<specifics>
## Specific Ideas

- El usuario confirmó que una vez hechas las redirecciones internas y la migración de slugs, el tráfico entrante desde `aprendoseo.com` a `/reto` o `/diplomado` se resolverá limpiamente sin pantallas 404 ni pérdida de equidad SEO.

</specifics>

<deferred>
## Deferred Ideas

- Actualización en Cloudflare Bulk Redirects para apuntar directamente de `aprendoseo.com/reto` a `aprendoclub.com/programas/reto` (actualmente redirige a `aprendoclub.com/reto`, que luego hará 301 a `/programas/reto`). Se puede optimizar en Cloudflare más adelante para eliminar el doble salto.

</deferred>
