# Project Retrospective

*A living document updated after each milestone. Lessons feed forward into future planning.*

## Milestone: v1.8 — Migración aprendoseo.com → aprendoclub.com

**Shipped:** 2026-09-23
**Phases:** 6 (33-38) | **Plans:** 6 | **Sessions:** 1 (todo el milestone corrió en una sola sesión autónoma, 2026-09-22)

### What Was Built
- CSV de ~113 redirects 301 para Cloudflare Bulk Redirects, verificado fila por fila contra Payload en vivo (no contra el sheet a ciegas)
- Reestructura de `/reto` y `/diplomado` a `/programas/reto` y `/programas/diplomado`, con redirect interno 301 y cero enlaces internos huérfanos
- Colección `CiudadesSeo` en Payload + 10 páginas SSG programáticas de ciudad con salario/FAQ contextualizados por mercado
- 2 páginas de programa nuevas (Curso SEO RDSS, Curso Básico de SEO) con Schema.org Course
- 2 páginas de autor faltantes (Ibraim Zayed, Verónica Romero)
- 6 páginas institucionales/legales + descarte formal de `/prensa`

### What Worked
- Secuenciar Phase 33 (redirects) primero permitió que las fases 35-38 fueran "reabriendo" el mismo CSV para agregar sus propias filas, en vez de una fase de redirects tardía separada — mantuvo un solo archivo fuente de verdad.
- Phase 35 corrigiendo retroactivamente las filas de `/reto`/`/diplomado` del CSV de Phase 33 (para apuntar directo a `/programas/*` y evitar doble-hop) es un buen ejemplo de wiring cross-fase que se verificó explícitamente en el audit de integración — vale la pena seguir pidiendo ese chequeo específico en migraciones de URL.
- Verificar cada redirect contra la DB de Payload en vivo (Phase 33, REDIR-03) en vez de confiar ciegamente en el sheet de Juan evitó arrastrar URLs desactualizadas a producción.

### What Was Inefficient
- El seed de `seed-programas-nuevos.ts` (Phase 36) no pobló `menuDesc`/`menuBadge`, que es lo que alimenta el megamenu dinámico del navbar — un patrón ya establecido en `scripts/seed/collections.ts` que no se replicó. El integration-checker lo agarró post-hoc; hubiera sido más barato que el plan de Phase 36 leyera el seed existente de referencia antes de escribir el suyo.
- Quedaron 4 items de verificación humana diferidos de milestones anteriores (v1.6 Fase 26, v1.7 Fases 29/31) sin resolver al momento de cerrar v1.8 — no bloquean nada porque no son del scope de v1.8, pero conviene que Juan les ponga fecha en vez de dejarlos indefinidamente "diferidos".

### Patterns Established
- Auditoría de integración cross-fase con foco específico en "¿esta migración de URL introduce un doble-redirect?" — replicable en cualquier migración de dominio futura.
- Un solo archivo CSV de redirects que las fases subsiguientes van enriqueciendo (en vez de un CSV por fase) simplifica la importación final a Cloudflare a un solo paso para Juan.

### Cost Observations
- Todo el milestone (6 fases, 6 plans, 18 tasks) se ejecutó en una sola sesión autónoma el 2026-09-22, sin bloqueos — contraste marcado con v1.7, que quedó con 3 fases en verificación diferida por caída de Neon/cuota de Vercel.
- Notable: ninguna fase de v1.8 tocó Neon en modo inestable (a diferencia de v1.7); la migración de URLs es más mecánica y menos sensible a infraestructura que el trabajo visual/CMS de fases anteriores.

---

## Cross-Milestone Trends

### Process Evolution

| Milestone | Sessions | Phases | Key Change |
|-----------|----------|--------|------------|
| v1.6 | 1+ | 3/4 (Fase 29 bloqueada) | Primera vez que un milestone queda con fase bloqueada esperando input externo de Juan |
| v1.7 | 1+ | 3/4 (Phase 32 omitida) | Primera vez con verificación visual diferida en 3 fases por infraestructura inestable (Neon/Vercel) |
| v1.8 | 1 | 6/6 | Primer milestone de v1.8+ completado sin bloqueos ni verificación diferida en sus propias fases; cierre requirió `--force` en `milestone.complete` por fases residuales de v1.7 sin numeración propia |

### Cumulative Quality

| Milestone | Tests | Coverage | Zero-Dep Additions |
|-----------|-------|----------|-------------------|
| v1.8 | — (verificación por build + queries en vivo a Payload, no test suite formal) | — | 0 (sin nuevas dependencias npm) |

### Top Lessons (Verified Across Milestones)

1. Cuando una fase crea entradas en una colección de Payload que alimenta un componente compartido (navbar, footer), el plan debe leer el seed de referencia más reciente para esa colección — no solo el shape del schema — para no dejar campos de UI vacíos (v1.8 Phase 36).
2. Los redirects de dominio-a-dominio deben verificarse contra el estado en vivo del CMS destino, nunca contra un sheet estático — reduce el riesgo de arrastrar URLs muertas a producción (v1.8 Phase 33, patrón ya anticipado en el diseño del milestone).
