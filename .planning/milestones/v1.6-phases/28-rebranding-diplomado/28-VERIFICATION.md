---
phase: 28-rebranding-diplomado
verified: 2026-07-11T16:10:00Z
status: passed
score: 5/5 must-haves verified
overrides_applied: 0
re_verification:
  previous_status: gaps_found
  previous_score: 3/5
  gaps_closed:
    - "Variante 'Diplomado CERO A SEO completo' (sin 'de') en diplomado.ts:515 renombrada a 'Diplomado de SEO + AIO completo'"
    - "seedMedia() reconcilia alt en documentos de media preexistentes vía payload.update (diff-and-update), cerrando el bug estructural"
    - "Los 3 registros de media del diplomado en Neon (hero, certificado, modulos2) ya no contienen el nombre viejo en alt"
  gaps_remaining: []
  regressions: []
deferred: []
---

# Phase 28: Rebranding del diplomado Verification Report (Re-verification)

**Phase Goal:** El diplomado se presenta de forma consistente bajo su nuevo nombre "Diplomado de SEO + AIO" en todas las páginas y datos donde aparece "Diplomado de Cero a SEO".
**Verified:** 2026-07-11T16:10:00Z
**Status:** passed
**Re-verification:** Yes — after gap closure (plan 28-02)

## Goal Achievement

### Observable Truths (re-checked independently)

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | No queda ninguna ocurrencia case-insensitive de "diplomado (de) cero a seo" en scripts/seed/ (con o sin "de") | ✓ VERIFIED | `grep -riE 'diplomado (de )?cero a seo' aprendoclub/scripts/seed/` → 0 líneas (comando propio, no del SUMMARY). |
| 2 | El bullet de pricing en diplomado.ts dice "Diplomado de SEO + AIO completo" | ✓ VERIFIED | `diplomado.ts:515` → `"Diplomado de SEO + AIO completo"`, confirmado por `Read`/grep directo. |
| 3 | seedMedia() actualiza `alt` en documentos de media preexistentes, no solo en los nuevos, de forma general (no parche puntual) | ✓ VERIFIED | Lectura directa de `media.ts:118-146`: rama `existing.docs.length > 0` compara `doc.alt !== asset.alt` y llama `payload.update({ collection: 'media', id, data: { alt: asset.alt } })` solo cuando difiere (mantiene idempotencia — logea "sin cambios" si coincide). Comentario explícito documenta el patrón diff-and-update para campos futuros. Estructuralmente sólido, no es un one-off. |
| 4 | Tras re-seed, los 3 registros de media del diplomado en Neon (hero, certificado, modulos2) ya no contienen el nombre viejo en alt | ✓ VERIFIED | Query SQL directa propia (cliente `pg` independiente, misma `DATABASE_URI` de `.env.local`) contra Neon: los 3 `filename` muestran `alt` con "Diplomado de SEO + AIO" — `diplomado-hero.avif` (id 118), `diplomado-certificado.avif` (id 119), `diplomado-modulos2.avif` (id 123). |
| 5 | Ningún registro de la tabla `media` en Neon contiene "diplomado (de) cero a seo" en `alt` (verificado por SQL directa) | ✓ VERIFIED | Query propia `SELECT id, filename, alt FROM media WHERE alt ~* 'diplomado (de )?cero a seo'` → 0 filas. |

**Score:** 5/5 truths verified

### Extended DB Sanity Check (beyond the plan's must-haves, per verification task instructions)

Se corrió una verificación adicional propia, no solo el script `verify-media-alt.ts` provisto por el ejecutor (para no confiar en un artefacto escrito por la misma ejecución que se está auditando):

| Table.column | Query | Result |
|---|---|---|
| `media.alt` | `~* 'diplomado (de )?cero a seo'` | 0 filas |
| `pages_blocks_diplomado_pricing_features.text` | contiene "diplomado" | 1 fila, texto = "Diplomado de SEO + AIO completo" (correcto) |
| `pages_blocks_hero.*`, `pages_blocks_audience.*`, `pages_blocks_how_it_works.*`, `testimonios.*`, `programas.*` (columnas text) | `~* 'diplomado (de )?cero a seo'` | 0 filas en todas |
| `site_settings_navbar_program_menu.label` | `~* 'diplomado (de )?cero a seo'` | 0 filas |
| `pages_rels WHERE media_id = 118` | count | 0 (confirma que el doc huérfano diplomado-hero.avif, ahora corregido, no tiene impacto de rendering aparte de su propio alt, consistente con el SUMMARY) |

Sin resultado alguno con el nombre viejo en ninguna de las tablas/columnas de contenido consultadas.

### Full-milestone-scope sanity grep

```
grep -riE 'diplomado (de )?cero a seo' aprendoclub/scripts/seed/ | wc -l
→ 0
```

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `aprendoclub/scripts/seed/seed-data/diplomado.ts` | bullet de pricing.features con el nuevo nombre | ✓ VERIFIED | Línea 515 confirmada; el resto de ocurrencias (badgeText, alt certificado, audience/howItWorks titulo) ya estaban correctas desde 28-01 y siguen intactas. |
| `aprendoclub/scripts/seed/media.ts` | `payload.update` en rama de documento existente, diff-and-update | ✓ VERIFIED | Código leído directamente; lógica correcta, general, idempotente. Incluye el path explícito de `diplomado-hero.avif` en `collectMediaAssets()` con comentario que documenta el motivo (campo `hero.imagen` vacío). |
| `aprendoclub/scripts/verify-media-alt.ts` | script de verificación vía `payload.db.pool` | ✓ VERIFIED | Existe, usa `payload.db.pool.query`, gate correcto (exit 1 si hay filas stale, exit 0 si no). Se usó como referencia pero la verificación aquí se hizo con un cliente `pg` independiente para no depender del mismo artefacto que el ejecutor produjo. |

### Key Link Verification

| From | To | Via | Status | Details |
|------|-----|-----|--------|---------|
| `scripts/seed/media.ts` (`seedMedia`, rama `existing.docs.length > 0`) | Postgres/Neon `media.alt` | `payload.update` cuando `doc.alt !== asset.alt` | ✓ WIRED | Confirmado por lectura de código + query SQL directa post-seed: los 3 registros muestran el alt nuevo en Neon. |
| `scripts/seed/seed-data/diplomado.ts:515` (pricing.features) | Postgres/Neon `pages_blocks_diplomado_pricing_features.text` | seed directo (upsert de bloques) | ✓ WIRED | Query directa confirma el texto propagado a Neon. |

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|-------------|--------------|--------|----------|
| BRAND-01 | 28-01-PLAN.md, 28-02-PLAN.md | El diplomado se renombra de "Diplomado de Cero a SEO" a "Diplomado de SEO + AIO" en todas sus ocurrencias | ✓ SATISFIED | 10/10 ocurrencias de código correctas, propagación a Neon confirmada por SQL directa en todas las tablas relevantes (media, pages_blocks_*, testimonios, programas, navbar). |

No hay requirements huérfanos.

### Anti-Patterns Found

Ninguno en los 3 archivos tocados por 28-02 (`diplomado.ts`, `media.ts`, `verify-media-alt.ts`). Sin TBD/FIXME/XXX/TODO/HACK, sin placeholders, sin retornos vacíos en el camino de datos auditado.

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
|----------|---------|--------|--------|
| tsc compila sin errores tras los cambios | `npx tsc --noEmit` (desde `aprendoclub/`) | Sin salida (0 errores) | ✓ PASS |
| Commits de las 3 tareas existen en el historial | `git log --oneline -1 <hash>` para d1b3b5d, 3d33e80, 9968310 | Los 3 commits existen con mensajes coherentes | ✓ PASS |
| DB en vivo (Neon) no retiene el nombre viejo en ninguna tabla de contenido consultada | Queries `pg` directas (independientes del script del ejecutor) | 0 filas stale en todas | ✓ PASS |

### Human Verification Required

Ninguno. Todos los truths son verificables programáticamente (grep de código fuente + query SQL directa a Neon, ejecutada de forma independiente en esta verificación, no reusando el script `verify-media-alt.ts` del ejecutor como única fuente de verdad).

### Gaps Summary

Ambos gaps de la verificación inicial (3/5) quedan cerrados y confirmados independientemente:

1. `diplomado.ts:515` ya dice "Diplomado de SEO + AIO completo" — confirmado por lectura directa del archivo y por query SQL a `pages_blocks_diplomado_pricing_features`.
2. `seedMedia()` ahora reconcilia `alt` en documentos preexistentes de forma general (diff-and-update, no parche puntual) — confirmado por lectura de código. Los 3 assets del diplomado en Neon (incluido el doc huérfano `diplomado-hero.avif`, id 118, descubierto y corregido durante la ejecución de 28-02) ya no contienen el nombre viejo, confirmado por query SQL directa con cliente `pg` propio.

Ningún gap remanente ni regresión detectada. La verificación extendida (Query 1 del gate más un barrido adicional sobre `pages_blocks_hero`, `pages_blocks_audience`, `pages_blocks_how_it_works`, `testimonios`, `programas`, `site_settings_navbar_program_menu`) no encontró ninguna ocurrencia del nombre viejo, con o sin "de", en ninguna columna de texto consultada. Fase 28 cumple su objetivo declarado.

---

_Verified: 2026-07-11T16:10:00Z_
_Verifier: Claude (gsd-verifier)_
