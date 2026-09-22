# Requirements: aprendoclub — Migración (v1.8 Migración aprendoseo.com → aprendoclub.com)

**Defined:** 2026-09-22
**Core Value:** Migrar aprendoseo.com a aprendoclub.com sin pérdida de tráfico/SEO: todo lo que ya existe queda redirigido, todo lo que falta se crea.
**Research:** Ninguno — se auditó el sheet de mapeo de Juan (124 filas con datos) contra el código/DB en vivo de aprendoclub (Payload: 5 categorías de blog, 64 posts, 3 autores, 3 páginas de programa) y contra aprendoseo.com en vivo antes de definir el alcance.

## Contexto de verificación

Se cruzó el sheet de Juan (`https://docs.google.com/spreadsheets/d/1Iuy2kJE0Og_0ZUuk1gfSLTcmXkP1wBXfNvy0eVAHpzw`) contra la DB de Payload en vivo:

- **80 filas "Aplicar redirección 301"**: el destino de la inmensa mayoría ya existe en aprendoclub — 64 blog posts bajo 5 categorías (`seo-basico`, `empieza-en-seo`, `seo-onpage`, `seo-tecnico`, `herramientas-seo`, que coinciden 1:1 con las categorías de Payload), 3 páginas de autor (`arianna-lupi`, `diana-rodriguez`, `juan-angulo`), y 2 páginas de programa.
- **29 filas "Crear página nueva y redirigir"**: no existen todavía. Incluye 10 páginas programáticas de ciudad (confirmado en vivo: `aprendoseo.com/cursos-seo/curso-seo-cdmx` es contenido genérico con el nombre de ciudad sustituido — mismo precio $49.99, misma estructura de 16 módulos, solo cambia el rango salarial local en el FAQ), 2 páginas de programa nuevas (Curso SEO RDSS — landing de 2h sobre SEO para RRSS/TikTok/Instagram, $30; Curso Básico de SEO — curso gratuito para principiantes), 2 autores faltantes (Ibraim Zayed, Verónica Romero) y páginas sueltas (contacto, glosario, políticas legales, recursos).
- **1 fila "eliminar (sin valor)"**: `/prensa` — se descarta, sin redirect.
- **1 fila "Página para ads"**: `/seo-con-ia/evento` — pendiente confirmar destino exacto (candidato: `/programas/taller-seo-con-ia`).

Decisiones de Juan ya incorporadas al alcance:

- `/reto` y `/diplomado` se reestructuran a `/programas/reto` y `/programas/diplomado` (URLs ya live en producción).
- Los merges de contenido (`/certificaciones` → autor Arianna, `/academia-seo` → `/quienes-somos`) quedan fuera de este milestone — solo redirect simple por ahora.
- Las páginas de ciudad se migran completas (las 10), analizando primero una a fondo para ver si se pueden mejorar sobre el patrón genérico de aprendoseo.
- Todo el alcance (redirects + páginas nuevas) va en este milestone, en fases secuenciales.

## v1 Requirements (milestone v1.8)

### Redirects a Cloudflare (REDIR)

- [x] **REDIR-01**: Generar la lista completa de redirects 301 (source aprendoseo.com → destination aprendoclub.com) para las ~78 filas del sheet cuyo destino ya existe hoy en aprendoclub (blog posts, autores, programas, URLs sueltas), en el formato de import de Cloudflare Bulk Redirects (CSV: source URL, target URL, status code 301, preserve query string).
- [x] **REDIR-02**: Incluir en la lista los 2 redirects con nota de "merge" (`/certificaciones` → página de autor de Arianna, `/academia-seo` → `/quienes-somos`) como redirect simple, sin fusionar contenido todavía.
- [x] **REDIR-03**: Verificar cada URL destino propuesta contra la DB de Payload en vivo (no contra el sheet a ciegas) antes de incluirla en la lista final — descartar o corregir cualquier fila donde el sheet esté desactualizado respecto al código actual.
- [x] **REDIR-04**: Entregar la lista en un formato que Juan pueda importar directamente en el dashboard de Cloudflare del dominio aprendoseo.com (no se aplica dentro del repo de aprendoclub — son dominios distintos).

### Reestructura de URLs de programas (RESTRUCT)

- [x] **RESTRUCT-01**: Mover el slug de la página `reto` en Payload de `reto` a `programas/reto`, y `diplomado` a `programas/diplomado`, verificando que el catch-all `[...slug]` de `(site)` resuelve las rutas anidadas correctamente.
- [x] **RESTRUCT-02**: Agregar redirects internos 301 en `next.config.ts` desde `/reto` → `/programas/reto` y `/diplomado` → `/programas/diplomado`, para no romper enlaces/analytics/ads existentes que apunten a las rutas viejas.
- [x] **RESTRUCT-03**: Actualizar todos los links internos del sitio (navbar, footer, cards de "Nuestros programas" en home, cross-links entre páginas de programa) que apunten a `/reto` o `/diplomado` para que usen las rutas nuevas directamente.

### Páginas programáticas de ciudad (CITY)

- [x] **CITY-01**: Analizar a fondo una página de ciudad de aprendoseo.com (ej. `curso-seo-cdmx`) y definir cómo modelarla en Payload — evaluar si conviene una colección nueva (`CityLandingPages` con campo `city` + `salaryRange` + relación al programa) versus 10 entradas sueltas en `Pages`, priorizando reducir duplicación.
- [x] **CITY-02**: Implementar el modelo elegido en Payload (colección/campos) y el template de render que sustituye el nombre de la ciudad y el rango salarial local en el copy (título, H1, FAQ).
- [x] **CITY-03**: Crear las 10 páginas de ciudad (Alicante, Bilbao, Caracas, CDMX, Guadalajara, Málaga, Maracaibo, Puebla, Toledo, Valencia) con el modelo implementado, con URLs limpias en aprendoclub (definir patrón, ej. `/programas/taller-seo-con-ia/{ciudad}` o `/cursos-seo/{ciudad}`).
- [x] **CITY-04**: Redirect 301 desde cada URL vieja de aprendoseo.com (`/cursos-seo/curso-seo-{ciudad}`) a la URL nueva correspondiente en aprendoclub.

### Páginas de programa nuevas (PROGNEW)

- [ ] **PROGNEW-01**: Crear en Payload la página del Curso SEO RDSS, con el contenido/estructura de `aprendoseo.com/curso-seo-rdss` (landing de 2h sobre SEO para RRSS, instructor Arianna Lupi, testimonios, FAQ, precio $30) adaptado a la voz de marca de aprendoclub.
- [ ] **PROGNEW-02**: Crear en Payload la página del Curso Básico de SEO, con el contenido/estructura de `aprendoseo.com/curso-basico-de-seo` (curso gratuito para principiantes, 4 objetivos de aprendizaje, testimonios) adaptado a la voz de marca de aprendoclub.
- [ ] **PROGNEW-03**: Redirect 301 desde `/curso-seo-rdss` y `/curso-basico-de-seo` de aprendoseo.com a las páginas nuevas.

### Páginas de autor faltantes (AUTHOR)

- [ ] **AUTHOR-01**: Crear en Payload las páginas de autor de Ibraim Zayed y Verónica Romero (mismo patrón que Arianna/Diana/Juan), con su bio y posts asociados si los tienen.
- [ ] **AUTHOR-02**: Redirect 301 desde `/autor/ibraim-zayed` y `/autor/veronica-romero` de aprendoseo.com a las páginas nuevas.

### Páginas sueltas faltantes (MISC)

- [ ] **MISC-01**: Crear o localizar en aprendoclub las páginas de contacto, glosario, política de privacidad, política de reembolso, aviso legal y términos y condiciones (7 filas del sheet), con redirect 301 desde sus URLs de aprendoseo.com.
- [ ] **MISC-02**: Confirmar y redirigir `/seo-con-ia/evento` (fila "Página para ads" del sheet) a la página correspondiente en aprendoclub (candidato: `/programas/taller-seo-con-ia`).
- [ ] **MISC-03**: Descartar `/prensa` de aprendoseo.com sin redirect (marcada como "sin valor" en el sheet) — no entra en la lista de Cloudflare.

## Out of Scope (v1.8)

| Feature | Reason |
|---------|--------|
| Merge de contenido de `/certificaciones` en la página de autor de Arianna | Decisión de Juan: solo redirect simple por ahora, el merge de copy queda para una fase futura |
| Merge de contenido de `/academia-seo` en `/quienes-somos` | Misma decisión — redirect simple, merge después |
| `curso-seo-rdss` (contenido) como cluster temático nuevo del blog | Es una landing de programa, no un cluster de blog; fuera de alcance del blog migrado en v1.3 |
| Página de recursos con Canva embebido (`aprendoseo.com/caracas`) | Nota del sheet indica que es material de apoyo, no una URL real de producto; se evalúa aparte si Juan la pide |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| REDIR-01 | Phase 33 | Complete |
| REDIR-02 | Phase 33 | Complete |
| REDIR-03 | Phase 33 | Complete |
| REDIR-04 | Phase 33 | Complete |
| RESTRUCT-01 | Phase 34 | Complete |
| RESTRUCT-02 | Phase 34 | Complete |
| RESTRUCT-03 | Phase 34 | Complete |
| CITY-01 | Phase 35 | Complete |
| CITY-02 | Phase 35 | Complete |
| CITY-03 | Phase 35 | Complete |
| CITY-04 | Phase 35 | Complete |
| PROGNEW-01 | Phase 36 | Pending |
| PROGNEW-02 | Phase 36 | Pending |
| PROGNEW-03 | Phase 36 | Pending |
| AUTHOR-01 | Phase 37 | Pending |
| AUTHOR-02 | Phase 37 | Pending |
| MISC-01 | Phase 38 | Pending |
| MISC-02 | Phase 38 | Pending |
| MISC-03 | Phase 38 | Pending |

**Coverage:**

- v1 requirements: 19 total
- Mapped to phases: 19/19 ✓
- Unmapped: 0

---
*Requirements defined: 2026-09-22*
*Last updated: 2026-09-22 — roadmap creado, requirements mapeados a Phases 33-38*
