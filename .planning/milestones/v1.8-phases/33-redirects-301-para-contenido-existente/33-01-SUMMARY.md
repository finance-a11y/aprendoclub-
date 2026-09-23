---
phase: 33-redirects-301-para-contenido-existente
plan: 1
subsystem: infra
tags: [redirects, cloudflare, 301, payload, seo]

requires: []
provides:
  - "CSV importable para Cloudflare Bulk Redirects con 81 reglas 301 validadas en vivo contra Payload"
  - "README con instrucciones de importación inmediata a Cloudflare y estrategia de redirección interna con Phase 34"
  - "Script reutilizable query-payload-slugs.ts para auditar colecciones y slugs de Payload"
affects: [34-reestructuracion-de-rutas-de-programas, 35-creacion-de-paginas-nuevas-programas-y-autores]

actuals:
  tokens: 42000
  tasks: 3
  commits: 4

tech-stack:
  added: []
  patterns: [cloudflare-bulk-redirects, payload-slug-audit-script]

key-files:
  created:
    - .planning/deliverables/v1.8/redirects-phase33-cloudflare.csv
    - .planning/deliverables/v1.8/README-cloudflare-import.md
    - aprendoclub/scripts/query-payload-slugs.ts
  modified: []

key-decisions:
  - "Apuntar filas de Reto y Diplomado directamente a /reto y /diplomado (rutas activas en producción hoy), difiriendo la redirección hacia /programas/* a una redirección interna en Phase 34"
  - "Implementar filas con nota de merge (/certificaciones y /academia-seo) como redirects 301 simples sin fusión de páginas"
  - "Excluir filas de páginas nuevas (Phases 35-38), /prensa y evento de ads"

patterns-established:
  - "Audit script pattern: scripts/query-payload-slugs.ts corre con npx payload run para cargar variables de entorno automáticamente"

requirements-completed: [REDIR-01, REDIR-02, REDIR-03, REDIR-04]

coverage:
  - id: D1
    description: "CSV en .planning/deliverables/v1.8/ con 81 reglas 301 en formato Cloudflare Bulk Redirects"
    requirement: "REDIR-01"
    verification:
      - kind: automated_ui
        ref: "bash automated test suite (header, rowcount, no dupes, domain allowlist, 301 code, preserve_query_string)"
        status: pass
    human_judgment: false
  - id: D2
    description: "URLs de programas (/reto, /diplomado, /programas/taller-seo-con-ia) y merges simples (/certificaciones, /academia-seo)"
    requirement: "REDIR-02"
    verification:
      - kind: automated_ui
        ref: "bash test grep for reto and diplomado target URLs"
        status: pass
    human_judgment: false
  - id: D3
    description: "Verificación de cada target contra base de datos en vivo de Payload"
    requirement: "REDIR-03"
    verification:
      - kind: integration
        ref: "aprendoclub/scripts/query-payload-slugs.ts cross-check"
        status: pass
    human_judgment: false
  - id: D4
    description: "README con instrucciones de importación y estrategia para Phase 34"
    requirement: "REDIR-04"
    verification:
      - kind: manual_procedural
        ref: "test -f README-cloudflare-import.md && grep checks"
        status: pass
    human_judgment: false

duration: 15min
completed: 2026-09-22
status: complete
---

# Phase 33: Redirects 301 para contenido existente Summary

**Lista completa de 81 redirects 301 para Cloudflare Bulk Redirects verificada al 100% contra Payload en vivo, con targets activos hoy (/reto, /diplomado) para activación inmediata sin riesgo de 404.**

## Performance

- **Duration:** 15 min
- **Started:** 2026-09-22T10:25:00Z
- **Completed:** 2026-09-22T10:28:30Z
- **Tasks:** 3
- **Files created:** 3

## Accomplishments

- Script de consulta de solo lectura `aprendoclub/scripts/query-payload-slugs.ts` creado y probado contra Neon en vivo.
- Generación de `.planning/deliverables/v1.8/redirects-phase33-cloudflare.csv` con 81 filas validadas (64 blogposts, 3 autores, páginas de categoría, /links, /blog, /testimonios, /quienes-somos, /programas/taller-seo-con-ia, y rutas activas en vivo de /reto y /diplomado).
- Coincidencia exacta del 100% entre los destinos del CSV y la base de datos de Payload en producción.
- Creación de `.planning/deliverables/v1.8/README-cloudflare-import.md` con instrucciones paso a paso para Juan en Cloudflare Bulk Redirects y explicación de la estrategia de redirección interna post-Phase 34.

## Task Commits

1. **Task 1: Tracer extremo a extremo** - `3ee21c7` (feat(33-01): tracer script and initial validated CSV row)
2. **Task 2: CSV completo verificado contra sheet y Payload** - `246bcc7` (feat(33-01): complete 301 redirects CSV validated against sheet and Payload)
3. **Task 3: README de importación a Cloudflare** - `2fa8070` (docs(33-01): add Cloudflare import README with Phase 34 dependency note)

## Files Created/Modified

- `.planning/deliverables/v1.8/redirects-phase33-cloudflare.csv` - Archivo CSV listo para Cloudflare Bulk Redirects.
- `.planning/deliverables/v1.8/README-cloudflare-import.md` - Guía de importación para Cloudflare.
- `aprendoclub/scripts/query-payload-slugs.ts` - Script de auditoría de slugs en Payload.

## Decisions Made

- Normalizado el origen de Reto a `https://www.aprendoseo.com/reto` y destino `https://www.aprendoclub.com/reto` (ruta activa en producción).
- Destino de Diplomado establecido como `https://www.aprendoclub.com/diplomado` (ruta activa en producción).
- Redirección hacia `/programas/reto` y `/programas/diplomado` se resolverá internamente dentro de aprendoclub en Phase 34, evitando cualquier riesgo de 404 antes de ese despliegue.
- Los dos casos de merge (`/certificaciones` y `/academia-seo`) se configuraron como redirects 301 limpios sin fusionar contenido de páginas.
- Excluidas las filas de páginas nuevas (Phases 35-38), `/prensa` y evento publicitario.

## Next Phase Readiness

- Todo listo para Phase 34 (Reestructuración de rutas de programas: `/reto` → `/programas/reto` y `/diplomado` → `/programas/diplomado`), donde se configurará la redirección interna correspondiente.
- Juan puede importar y activar el CSV en Cloudflare Bulk Redirects de forma inmediata sin esperar a Phase 34.
