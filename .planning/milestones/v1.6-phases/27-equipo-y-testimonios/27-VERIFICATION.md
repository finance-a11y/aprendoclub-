---
phase: 27-equipo-y-testimonios
verified: 2026-07-11T14:00:00Z
status: passed
score: 5/5 must-haves verified
overrides_applied: 0
---

# Phase 27: Equipo y testimonios Verification Report

**Phase Goal:** El equipo mostrado en quienes-somos y la sección de testimonios reflejan el estado actual del negocio.
**Verified:** 2026-07-11T14:00:00Z
**Status:** passed
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | El team grid en /quienes-somos muestra a "Dana Aliaga" con avatar de iniciales "DA" (sin foto rota) en el slot de Diana | ✓ VERIFIED | `aprendoclub/scripts/seed/seed-data/quienes-somos.ts:122-127` entrada `{ nombre: "Dana Aliaga", rol: "SEO Specialist", bio: "...", iniciales: "DA" }` sin clave `foto`, en el índice que ocupaba Diana. **Confirmado en la DB en vivo (Neon)**: `team_members` fila `Dana Aliaga`, `iniciales='DA'`, `foto_id=null`, `mostrar_en_quienes_somos=true`, `orden='1'`. `TeamGridRef.tsx:39-51` confirma el fallback: `foto ? <Image> : <div>{member.iniciales}</div>` — con `foto_id=null` el sitio renderiza el círculo de iniciales "DA", no una imagen rota. |
| 2 | "Diana Rodríguez" y "diana.avif" no aparecen en ninguna página renderizada del sitio | ✓ VERIFIED | `grep` sobre `quienes-somos.ts` y `pages.ts` (los archivos que alimentan el render) sin coincidencias de datos. Único hallazgo: comentarios de código (`collections.ts:101,212`, `diplomado.ts:13` — este último en un archivo declarado explícitamente "no importado por ningún componente todavía") y el `where` del cleanup idempotente de borrado (`collections.ts:217`), ninguno de los cuales es contenido renderizado. **DB en vivo**: tabla `team_members` tiene exactamente 5 filas (Arianna, Dana, Ibraim, Juan Carlos, Verónica) — ningún registro "Diana Rodríguez" sobrevive; el cleanup `payload.delete()` funcionó. `public/coaches/diana.avif` sigue existiendo como archivo huérfano en disco pero ningún código lo referencia. |
| 3 | La sección de logos de empresas confiadas ya no se renderiza en /testimonios | ✓ VERIFIED | `grep -n "logosRef" scripts/seed/pages.ts` → sin resultados; `buildTestimonios()` (líneas 480-517) ya no contiene el bloque. Import limpio: `logosBanda`/`trustedCompanies` removidos del import de `./seed-data/testimonios` en pages.ts, `retoImagenes` conservado. **DB en vivo**: `select count(*) from pages_blocks_logos_ref` → 0 filas en TODA la tabla (no solo para la página testimonios) — el re-seed efectivamente vació ese bloque en Neon. |
| 4 | La colección Payload ClientesTrabajados sigue intacta y poblada (trustedCompanies conservado como fuente de seed) | ✓ VERIFIED | `testimonios.ts` conserva `export const trustedCompanies` (línea 289) e `interface TrustedCompany` (línea 30); `collections.ts:6,177` y `media.ts:12,54` siguen importándolo y usándolo sin cambios. **DB en vivo**: `select count(*) from clientes_trabajados` → 4 filas, colección poblada e intacta. |
| 5 | El seed corre exitosamente contra Neon y el proyecto compila sin imports rotos | ✓ VERIFIED | `npx tsc --noEmit` desde `aprendoclub/` → sin errores. No se encontró `/tmp/seed27.log` (solo existe `/tmp/seed26.log`, de la fase anterior), por lo que el log de consola del SUMMARY no pudo confirmarse como artefacto. Sin embargo, se consultó la base de datos Neon de producción directamente (mismo `DATABASE_URI` de `.env.local`) y el estado de las tablas `team_members`, `pages_blocks_logos_ref` y `clientes_trabajados` coincide exactamente con lo que el seed debía producir tras los cambios — evidencia más fuerte que un log, confirma que `npm run seed` sí corrió post-cambios contra la DB real. |

**Score:** 5/5 truths verified

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `aprendoclub/scripts/seed/seed-data/quienes-somos.ts` | Entrada Dana Aliaga sin foto | ✓ VERIFIED | Línea 122-127, sin clave `foto`, `iniciales: "DA"` |
| `aprendoclub/scripts/seed/pages.ts` | `QUIENES_SOMOS_TEAM_ORDER` con Dana; sin bloque `logosRef` | ✓ VERIFIED | Línea 41 (`'Dana Aliaga'`), sin ocurrencias de `logosRef` |
| `aprendoclub/scripts/seed/collections.ts` | Registro único de Dana; cleanup de Diana | ✓ VERIFIED | `SHARED_WITH_DIPLOMADO` incluye Dana (línea 110), `DIPLOMADO_TEAM_ONLY` vacío, `payload.delete()` con `where: {nombre: 'Diana Rodríguez'}` (línea 212-218) |
| `aprendoclub/scripts/seed/seed-data/testimonios.ts` | `logosBanda` eliminado; `trustedCompanies` conservado | ✓ VERIFIED | `logosBanda` ausente; `trustedCompanies`/`TrustedCompany` presentes (líneas 30, 289) |

### Key Link Verification

| From | To | Via | Status | Details |
|------|-----|-----|--------|---------|
| `quienes-somos.ts` equipo[].nombre "Dana Aliaga" | `pages.ts` `QUIENES_SOMOS_TEAM_ORDER` | `idsFor(maps.teamMembers, QUIENES_SOMOS_TEAM_ORDER)` | ✓ WIRED | Nombre coincide exactamente en ambos archivos; DB confirma el registro resultante con `mostrar_en_quienes_somos=true` |
| `testimonios.ts` `trustedCompanies` | `collections.ts` clientes-trabajados + `media.ts` manifest | `import { trustedCompanies }` | ✓ WIRED | Ambos imports intactos; DB confirma 4 filas pobladas en `clientes_trabajados` |

### Data-Flow Trace (Level 4)

| Artifact | Data Variable | Source | Produces Real Data | Status |
|----------|---------------|--------|---------------------|--------|
| `TeamGridRef.tsx` | `block.items` (team-members relationship) | Postgres `team_members` vía Payload query en `pages.ts` build | Sí — 5 filas reales, Dana con `iniciales='DA'`, `foto_id=null` (fallback correcto, no imagen rota) | ✓ FLOWING |
| `buildTestimonios()` layout | array de blocks de la página `testimonios` (id=3) | Postgres `pages` + `pages_blocks_*` | Sí — `pages_blocks_logos_ref` tiene 0 filas totales en la DB (bloque efectivamente removido, no solo en código fuente) | ✓ FLOWING |

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|-------------|-------------|--------|----------|
| TEAM-01 | 27-01-PLAN.md | Team grid muestra Dana Aliaga en vez de Diana Rodríguez | ✓ SATISFIED | Ver truth #1, #2 |
| TESTIM-01 | 27-01-PLAN.md | Se elimina la sección de logos de empresas confiadas de /testimonios | ✓ SATISFIED | Ver truth #3, #4 |

No hay requirements huérfanos: REQUIREMENTS.md solo mapea TEAM-01 y TESTIM-01 a Phase 27, ambos declarados en el frontmatter del plan.

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `aprendoclub/scripts/seed/seed-data/diplomado.ts` | 13-15 | Comentario histórico desactualizado que sigue afirmando "Diana Rodríguez" y "Dana Aliaga" son personas distintas (obsoleto post Phase 27) | ℹ️ Info | No afecta datos ni render — el archivo `diplomado.ts` está documentado como "NO importado por ningún componente todavía". Comentario huérfano, no bloqueante. |
| `aprendoclub/public/coaches/diana.avif` | - | Archivo de imagen huérfano, ya sin referencias en código | ℹ️ Info | No se limpia del disco; inocuo, no se renderiza en ningún lado. |

Ningún debt marker (TBD/FIXME/XXX) encontrado en los 4 archivos modificados.

### Human Verification Required

Ninguno. Los cambios son verificables programáticamente (datos de seed + estado directo de la base de datos de producción), y ya se confirmó contra Neon en vivo — no se requiere navegación visual del sitio para cerrar la fase.

### Gaps Summary

Sin gaps. Los 5 must-haves del plan se verifican tanto en el código fuente (seed-data) como en el estado real de la base de datos Neon de producción, consultada directamente durante esta verificación (no solo inferida del SUMMARY). El único hallazgo (`/tmp/seed27.log` ausente, a diferencia del precedente `/tmp/seed26.log`) no bloquea el veredicto porque se sustituyó por una verificación más fuerte: consulta SQL directa a la base de datos de producción, que confirma que el re-seed se ejecutó y propagó los cambios correctamente.

---

_Verified: 2026-07-11T14:00:00Z_
_Verifier: Claude (gsd-verifier)_
