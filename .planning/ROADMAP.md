# Roadmap: aprendoclub

## Milestones

- ✅ **v1.0 Web lista para Google Ads** - Shipped 2026-07-04
- ✅ **v1.1 Refrescamiento UI/UX** - Shipped 2026-07-04
- ✅ **v1.2 Motion design + polish** - Phases 10-12, Shipped 2026-07-04
- ✅ **v1.3 Payload CMS — todo editable** - Phases 13-18, Shipped 2026-07-05
- ✅ **v1.5 Refresh de home + widget de asesoría** - Phases 20-25, Shipped 2026-07-11
- ⏸️ **v1.6 Rediseño de copy** - Phases 26-28 shipped 2026-07-11; Fase 29 (FAQs de membresía) bloqueada esperando input de Juan, nunca planificada
- ✅ **v1.7 Feedback visual home + programas** - Phases 29-31 (Phase 32 omitida por decisión de Juan), cerrado 2026-07-22
- 🚧 **v1.8 Migración aprendoseo.com → aprendoclub.com** - Phases 33-38 (planning)

## Phases

<details>
<summary>✅ v1.0–v1.5 (Phases 1-25) - SHIPPED</summary>

Fases previas ejecutadas vía `/gsd-autonomous`; detalle completo en `.planning/MILESTONES.md`. `.planning/` no se usó de forma completa en estos milestones (planes/estado no persistidos fase por fase), por lo que no se reconstruyen aquí retroactivamente.

- v1.0: Shell (site), páginas core, contenido migrado de aprendoseo.com
- v1.1: Design system unificado, contraste/accesibilidad/motion
- v1.2 (Phases 10-12): Auditoría de motion, optimización de imágenes AVIF/WebP
- v1.3 (Phases 13-18): Migración a Payload CMS 3, blog migrado (64 posts)
- v1.5 (Phases 20-25): Refresh de home, widget de asesoría WhatsApp, motion + spacing

</details>

<details>
<summary>⏸️ v1.6 Rediseño de copy (Phases 26-28 shipped, Fase 29 bloqueada)</summary>

**Milestone Goal:** El copy del sitio refleja la voz real de la marca (evita "real", de-enfatiza "SEO", cifras/equipo/nombres actualizados) sin sonar a IA, y las FAQs reflejan el modelo de membresía vigente.

- [x] Phase 26: Copy general + Home - Barrido de "real" y de-énfasis de "SEO" en todo el sitio; subtítulo y cifra de estudiantes actualizados en home (completed 2026-07-11)
- [x] Phase 27: Equipo y testimonios - Dana Aliaga reemplaza a Diana Rodríguez en el team grid; se elimina la sección de logos de empresas confiadas en /testimonios (completed 2026-07-11)
- [x] Phase 28: Rebranding del diplomado - El diplomado pasa de "Diplomado de Cero a SEO" a "Diplomado de SEO + AIO" en todas sus ocurrencias (completed 2026-07-11)
- [ ] ~~Phase 29: FAQs de membresía~~ - Bloqueada esperando input de Juan sobre el modelo de negocio viejo→membresía; nunca se planificó ni ejecutó. Se retomará como fase nueva (numeración propia, posterior a la 32) cuando Juan la desbloquee.

Detalle completo de Phases 26-28 archivado en `.planning/milestones/v1.6-phases/`.

</details>

<details>
<summary>✅ v1.7 Feedback visual home + programas (Phases 29-31 shipped, Phase 32 omitida)</summary>

**Milestone Goal:** Aplicar el feedback visual/copy recibido de Arianna sobre el home y las páginas de programas (diplomado/taller/reto): tipografía y motion, cards de "problema" con copy e íconos nuevos, imágenes reales en diplomado, links de programas a páginas estables, refinamiento del widget de asesoría, y reducir espaciados — corrigiendo en el camino un bug real de imágenes rotas en producción.

**Nota de numeración:** la Fase 29 original de v1.6 (FAQs de membresía) quedó bloqueada antes de que `/gsd-plan-phase` corriera sobre ella — su directorio nunca existió. Por eso este milestone reutilizó el número 29 como primera fase de v1.7. Cuando Juan desbloquee las FAQs de membresía, esa fase se retomará con numeración propia más adelante.

- [x] Phase 29: Imágenes rotas de Diplomado y testimonios - Fix de galería, fotos de equipo y avatares rotos en producción (implementado, verificación visual diferida por cuota de Vercel)
- [x] Phase 30: Cards de problema, asesoría y link del Taller - Copy definitivo + íconos 3D en cards de problema, refinamiento de copy del widget de asesoría, CTA temporal del Taller (código completo, seed diferido por caída de Neon)
- [x] Phase 31: Tipografía, motion y spacing (segunda pasada) - Montserrat Bold consistente, motion más notorio, spacing ajustado en home/diplomado (implementado, QA visual diferido por caída de Neon)
- [ ] ~~Phase 32: Galería del Diplomado rediseñada~~ - Omitida por decisión de Juan (2026-07-22): requería migración de schema de Payload con Neon caída, y fotos reales faltantes para 2 de 6 cards. Backlog: DIPLO-IMG-02.

Detalle completo de Phases 29-32 archivado en `.planning/milestones/v1.7-phases/`.

</details>

### 🚧 v1.8 Migración aprendoseo.com → aprendoclub.com (Planning)

**Milestone Goal:** Migrar la totalidad de URLs de aprendoseo.com a aprendoclub.com sin pérdida de SEO: primero la lista de redirects 301 para todo lo que ya existe en aprendoclub (lista para importar en Cloudflare), después la reestructura de URLs de programas, y por último la creación de las páginas que faltan (ciudades, programas nuevos, autores, páginas sueltas), agregando el redirect de cada página nueva en su propia fase.

**Nota de numeración:** continúa la numeración de v1.7 (última fase usada: 32, omitida). Esta milestone arranca en la Phase 33.

- [ ] **Phase 33: Redirects 301 para contenido existente** - Lista CSV de ~78 redirects (blog, autores, programas) lista para importar en Cloudflare Bulk Redirects
- [ ] **Phase 34: Reestructura de URLs de programas** - `/reto` → `/programas/reto`, `/diplomado` → `/programas/diplomado`, con redirect interno y links actualizados
- [ ] **Phase 35: Páginas programáticas de ciudad** - Modelo en Payload + 10 páginas de ciudad + sus redirects
- [ ] **Phase 36: Páginas de programa nuevas** - Curso SEO RDSS y Curso Básico de SEO + sus redirects
- [ ] **Phase 37: Páginas de autor faltantes** - Ibraim Zayed y Verónica Romero + sus redirects
- [ ] **Phase 38: Páginas sueltas faltantes** - Contacto, glosario, políticas legales, evento + sus redirects; `/prensa` descartada

## Phase Details

### Phase 29: Imágenes rotas de Diplomado y testimonios
**Goal**: Las imágenes de la galería del Diplomado, las fotos del equipo y los avatares de los testimonios destacados del home cargan correctamente en producción, sin roturas.
**Depends on**: Nothing (primera fase de v1.7; bug fix real de producción, se prioriza antes que el resto del trabajo visual)
**Requirements**: DIPLO-IMG-01, BUG-01
**Success Criteria** (what must be TRUE):
  1. La galería del Diplomado (bloque `diplomadoGaleria`) muestra sus imágenes cargadas (`naturalWidth > 0`) en `/diplomado` en producción.
  2. Las fotos del equipo (`teamGridRef`) en `/diplomado` cargan sin roturas.
  3. Los avatares de los 3 testimonios destacados del home (Johanna Ramírez, Nataly Domínguez, Marco García) cargan sin roturas.
  4. La causa raíz del bug (paths, build, o dominio de imágenes) queda identificada y documentada, para prevenir que reaparezca en otras páginas con el mismo patrón de imagen.
**Plans**: TBD
**UI hint**: yes

### Phase 30: Cards de problema, asesoría y link del Taller
**Goal**: El home comunica el copy definitivo de Juan en las cards de "problema" (con íconos ilustrados 3D) y en el widget de asesoría, y el CTA del Taller no dirige a una página en construcción mientras se termina.
**Depends on**: Nothing (independiente de Phase 29 en el código que toca; se numera después por prioridad del bug de producción)
**Requirements**: CARDS-01, CARDS-02, ADV-05, PROG-LINK-01
**Success Criteria** (what must be TRUE):
  1. Las 4 cards de "problema" del home muestran el copy definitivo de Juan (Sabes de todo.../Aprendes de contenido desactualizado.../Llevas meses preparándote.../La IA te está dejando atrás).
  2. Cada card de problema muestra un ícono ilustrado 3D de 3dicons.co (`iconMode: image`) en vez del ícono lineal lucide anterior.
  3. El widget de asesoría gratuita muestra el eyebrow/título/subtítulo y los 9 bullets actualizados, con el CTA "Quiero mi asesoría gratuita".
  4. El CTA del Taller en la card de "Nuestros programas" del home enlaza a `https://www.aprendoclub.com/evento` (Reto y Diplomado siguen apuntando a sus páginas estables, sin cambios).
**Plans**: TBD
**UI hint**: yes

### Phase 31: Tipografía, motion y spacing (segunda pasada)
**Goal**: Home, Diplomado, Taller y Reto se sienten más pulidos visualmente: encabezados en Montserrat Bold de forma consistente, motion más notorio que en v1.5, y spacing reducido donde todavía se siente excesivo.
**Depends on**: Nothing (independiente de Phases 29-30; toca tipografía/motion/spacing de forma transversal)
**Requirements**: TYPO-01, TYPO-02, LAY-02
**Success Criteria** (what must be TRUE):
  1. Los headings principales de home, diplomado, taller y reto usan Montserrat Bold de forma consistente, sin romper el contrato tipográfico de pesos (regular/medium/semibold) ya existente en el resto del sitio.
  2. Las secciones clave del home y de las páginas de programas muestran transiciones/efectos de motion perceptiblemente más notorios que en la pasada de v1.5, respetando `prefers-reduced-motion`.
  3. El espacio vertical entre el currículum de 16 semanas y "Cómo funciona" (y otros gaps grandes similares en home/diplomado) se percibe reducido respecto al estado actual.
**Plans**: TBD
**UI hint**: yes

### Phase 32: Galería del Diplomado rediseñada — OMITIDA

**Estado:** Juan pidió omitir esta fase (2026-07-22). Motivo: requiere migración de schema de Payload (campo nuevo `titulo` en la galería) — necesita conexión a Neon para generar/correr la migración, y Neon estaba caída (`ECONNRESET`) en el momento de ejecución del milestone. Además dependía de fotos reales que Juan no había aportado para 2 de las 6 cards.

**Goal** (original, ya no se ejecuta): La sección de galería del Diplomado se rediseña como cards de foto con texto superpuesto, al estilo de la landing anterior del diplomado.
**Requirements**: DIPLO-IMG-02 — queda en el backlog (ver Out of Scope de REQUIREMENTS.md), se retoma como fase nueva si Juan lo vuelve a pedir.

### Phase 33: Redirects 301 para contenido existente
**Goal**: Juan tiene una lista de redirects 301 lista para importar en Cloudflare (Bulk Redirects), cubriendo todo el contenido de aprendoseo.com que ya existe hoy en aprendoclub (o existirá en Phase 34, para las URLs de reto/diplomado).
**Depends on**: Nothing (primera fase de v1.8, máxima prioridad según Juan)
**Requirements**: REDIR-01, REDIR-02, REDIR-03, REDIR-04
**Success Criteria** (what must be TRUE):
  1. Existe un archivo CSV (formato Cloudflare Bulk Redirects: source URL, target URL, status code 301, preserve query string) con ~78 filas cubriendo los 64 blog posts, los 3 autores existentes, los 2 programas existentes y las URLs sueltas del sheet cuyo destino ya existe hoy en aprendoclub.
  2. Las filas de `/reto` y `/diplomado` apuntan a `/programas/reto` y `/programas/diplomado` (URLs finales, post-reestructura de Phase 34), y las 2 filas de merge (`/certificaciones`, `/academia-seo`) apuntan a la página de autor de Arianna y a `/quienes-somos` respectivamente, como redirect simple sin fusión de contenido.
  3. Cada URL destino de la lista fue verificada contra la DB de Payload en vivo (no contra el sheet a ciegas); cualquier fila desactualizada respecto al código actual quedó corregida o descartada, con nota de qué cambió.
  4. El archivo está en un formato y ubicación que Juan puede importar directamente en el dashboard de Cloudflare del dominio aprendoseo.com, sin edición manual adicional.
**Plans**: 1 plan
Plans:
- [ ] 33-01-PLAN.md — CSV completo de redirects 301 (verificado contra sheet y Payload en vivo) + README de importación a Cloudflare

### Phase 34: Reestructura de URLs de programas
**Goal**: Las páginas de reto y diplomado viven en `/programas/reto` y `/programas/diplomado`, consistente con `/programas/taller-seo-con-ia`, sin romper enlaces existentes ni el SEO.
**Depends on**: Phase 33 (la lista de redirects generada ya referencia las URLs finales `/programas/reto` y `/programas/diplomado` que esta fase pone en producción)
**Requirements**: RESTRUCT-01, RESTRUCT-02, RESTRUCT-03
**Success Criteria** (what must be TRUE):
  1. `/programas/reto` y `/programas/diplomado` resuelven correctamente vía el catch-all `[...slug]` de `(site)` y muestran el mismo contenido que antes (slug movido en Payload).
  2. Visitar `/reto` o `/diplomado` en el navegador redirige (301) automáticamente a `/programas/reto` o `/programas/diplomado` respectivamente, vía `next.config.ts`.
  3. Todos los links internos del sitio (navbar, footer, cards de "Nuestros programas" en home, cross-links entre páginas de programa) apuntan directamente a las rutas nuevas, sin pasar por el redirect interno.
**Plans**: TBD
**UI hint**: yes

### Phase 35: Páginas programáticas de ciudad
**Goal**: Las 10 páginas programáticas de ciudad de aprendoseo.com viven en aprendoclub con un modelo reutilizable en Payload, mejoradas sobre el patrón genérico original, y sus URLs viejas redirigen a las nuevas.
**Depends on**: Phase 33 (los redirects de esta fase se agregan al mismo archivo/formato de lista de Cloudflare)
**Requirements**: CITY-01, CITY-02, CITY-03, CITY-04
**Success Criteria** (what must be TRUE):
  1. Existe una decisión documentada y un modelo implementado en Payload (colección nueva o patrón en `Pages`) que evita duplicar contenido entre las 10 ciudades — solo cambia el nombre de la ciudad y el rango salarial local en título, H1 y FAQ.
  2. Las 10 páginas de ciudad (Alicante, Bilbao, Caracas, CDMX, Guadalajara, Málaga, Maracaibo, Puebla, Toledo, Valencia) están publicadas en aprendoclub con URLs limpias bajo el patrón definido, y cada una carga (200) con el nombre de ciudad y salario correctos.
  3. Cada URL vieja de aprendoseo.com (`/cursos-seo/curso-seo-{ciudad}`) tiene su redirect 301 correspondiente agregado a la lista de Cloudflare de Phase 33.
**Plans**: TBD
**UI hint**: yes

### Phase 36: Páginas de programa nuevas
**Goal**: Las 2 páginas de programa que faltan (Curso SEO RDSS, Curso Básico de SEO) existen en aprendoclub con la voz de marca correcta, y sus URLs viejas redirigen a ellas.
**Depends on**: Phase 33 (mismo archivo/formato de lista de redirects)
**Requirements**: PROGNEW-01, PROGNEW-02, PROGNEW-03
**Success Criteria** (what must be TRUE):
  1. La página del Curso SEO RDSS está publicada en Payload con el contenido de la landing de 2h (instructor Arianna Lupi, testimonios, FAQ, precio $30) adaptado a la voz de aprendoclub.
  2. La página del Curso Básico de SEO está publicada en Payload con los 4 objetivos de aprendizaje y testimonios, adaptada a la voz de aprendoclub (curso gratuito).
  3. `/curso-seo-rdss` y `/curso-basico-de-seo` de aprendoseo.com tienen su redirect 301 agregado a la lista de Cloudflare de Phase 33.
**Plans**: TBD
**UI hint**: yes

### Phase 37: Páginas de autor faltantes
**Goal**: Las páginas de autor de Ibraim Zayed y Verónica Romero existen en aprendoclub con el mismo patrón que Arianna/Dana/Juan, y sus URLs viejas redirigen a ellas.
**Depends on**: Phase 33 (mismo archivo/formato de lista de redirects)
**Requirements**: AUTHOR-01, AUTHOR-02
**Success Criteria** (what must be TRUE):
  1. Las páginas de autor de Ibraim Zayed y Verónica Romero existen en Payload con bio y posts asociados (si los tienen), siguiendo el mismo patrón visual que las páginas de autor existentes.
  2. `/autor/ibraim-zayed` y `/autor/veronica-romero` de aprendoseo.com tienen su redirect 301 agregado a la lista de Cloudflare de Phase 33.
**Plans**: TBD
**UI hint**: yes

### Phase 38: Páginas sueltas faltantes
**Goal**: Las páginas sueltas que faltan (contacto, glosario, políticas legales, recursos, evento) existen o están correctamente redirigidas en aprendoclub, y `/prensa` queda descartada sin redirect.
**Depends on**: Phase 33 (mismo archivo/formato de lista de redirects)
**Requirements**: MISC-01, MISC-02, MISC-03
**Success Criteria** (what must be TRUE):
  1. Las 6 páginas de contacto, glosario, política de privacidad, política de reembolso, aviso legal y términos y condiciones existen en aprendoclub (creadas o localizadas), cada una con su redirect 301 agregado a la lista de Cloudflare de Phase 33.
  2. `/seo-con-ia/evento` tiene destino confirmado (candidato: `/programas/taller-seo-con-ia`) y su redirect 301 agregado a la lista.
  3. `/prensa` NO aparece en la lista final de redirects de Cloudflare (descartada sin valor, según decisión del sheet).
**Plans**: TBD
**UI hint**: yes

## Progress

**Execution Order:**
Phases execute in numeric order: 33 → 34 → 35 → 36 → 37 → 38

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|-----------------|--------|-----------|
| 26. Copy general + Home | v1.6 | 4/4 | Complete | 2026-07-11 |
| 27. Equipo y testimonios | v1.6 | 1/1 | Complete | 2026-07-11 |
| 28. Rebranding del diplomado | v1.6 | 2/2 | Complete | 2026-07-11 |
| 29. Imágenes rotas de Diplomado y testimonios | v1.7 | 1/1 | Implemented — verification deferred (Vercel quota) | 2026-07-22 |
| 30. Cards de problema, asesoría y link del Taller | v1.7 | 1/1 | Code complete — seed pending (Neon down) | 2026-07-22 |
| 31. Tipografía, motion y spacing | v1.7 | 1/1 | Implemented — visual QA deferred (Neon down) | 2026-07-22 |
| 32. Galería del Diplomado rediseñada | v1.7 | — | Omitida (decisión de Juan, 2026-07-22) | - |
| 33. Redirects 301 para contenido existente | v1.8 | 0/? | Not started | - |
| 34. Reestructura de URLs de programas | v1.8 | 0/? | Not started | - |
| 35. Páginas programáticas de ciudad | v1.8 | 0/? | Not started | - |
| 36. Páginas de programa nuevas | v1.8 | 0/? | Not started | - |
| 37. Páginas de autor faltantes | v1.8 | 0/? | Not started | - |
| 38. Páginas sueltas faltantes | v1.8 | 0/? | Not started | - |

---
*Roadmap created: 2026-07-22 for milestone v1.7*
*Updated: 2026-09-22 — milestone v1.8 (Phases 33-38) agregado*
