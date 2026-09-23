# Roadmap: aprendoclub

## Milestones

- ✅ **v1.0 Web lista para Google Ads** — Shipped 2026-07-04
- ✅ **v1.1 Refrescamiento UI/UX** — Shipped 2026-07-04
- ✅ **v1.2 Motion design + polish** — Phases 10-12, Shipped 2026-07-04
- ✅ **v1.3 Payload CMS — todo editable** — Phases 13-18, Shipped 2026-07-05
- ✅ **v1.5 Refresh de home + widget de asesoría** — Phases 20-25, Shipped 2026-07-11
- ⏸️ **v1.6 Rediseño de copy** — Phases 26-28 shipped 2026-07-11; Fase 29 (FAQs de membresía) bloqueada esperando input de Juan, nunca planificada
- ✅ **v1.7 Feedback visual home + programas** — Phases 29-31 (Phase 32 omitida por decisión de Juan), cerrado 2026-07-22
- ✅ **v1.8 Migración aprendoseo.com → aprendoclub.com** — Phases 33-38, shipped 2026-09-23

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

<details>
<summary>✅ v1.8 Migración aprendoseo.com → aprendoclub.com (Phases 33-38) — SHIPPED 2026-09-23</summary>

**Milestone Goal:** Migrar la totalidad de URLs de aprendoseo.com a aprendoclub.com sin pérdida de SEO: primero la lista de redirects 301 para todo lo que ya existe en aprendoclub (lista para importar en Cloudflare), después la reestructura de URLs de programas, y por último la creación de las páginas que faltan (ciudades, programas nuevos, autores, páginas sueltas), agregando el redirect de cada página nueva en su propia fase.

- [x] Phase 33: Redirects 301 para contenido existente - Lista CSV de ~113 redirects (blog, autores, programas) verificada contra Payload en vivo, lista para importar en Cloudflare Bulk Redirects (completed 2026-09-22)
- [x] Phase 34: Reestructura de URLs de programas - `/reto` → `/programas/reto`, `/diplomado` → `/programas/diplomado`, con redirect interno y links actualizados (completed 2026-09-22)
- [x] Phase 35: Páginas programáticas de ciudad - Colección `CiudadesSeo` en Payload + 10 páginas SSG de ciudad + sus redirects (completed 2026-09-22)
- [x] Phase 36: Páginas de programa nuevas - Curso SEO RDSS y Curso Básico de SEO + sus redirects (completed 2026-09-22)
- [x] Phase 37: Páginas de autor faltantes - Ibraim Zayed y Verónica Romero + sus redirects (completed 2026-09-22)
- [x] Phase 38: Páginas sueltas faltantes - Contacto, glosario, políticas legales, evento + sus redirects; `/prensa` descartada (completed 2026-09-22)

**Audit:** 19/19 requirements satisfechos, integración cross-fase verificada end-to-end. Tech debt cosmético: menuDesc/menuBadge vacíos para 2 programas nuevos en el megamenu del navbar.

Detalle completo archivado en `.planning/milestones/v1.8-ROADMAP.md` y `.planning/milestones/v1.8-phases/`.

</details>

---
*Próximo milestone: por definir. Correr `/gsd-new-milestone` cuando esté listo.*
