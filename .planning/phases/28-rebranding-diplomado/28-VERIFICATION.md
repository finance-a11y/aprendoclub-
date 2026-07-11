---
phase: 28-rebranding-diplomado
verified: 2026-07-11T15:30:00Z
status: gaps_found
score: 3/5 must-haves verified
overrides_applied: 0
gaps:
  - truth: "El diplomado aparece como 'Diplomado de SEO + AIO' en todas las ocurrencias del seed (badge, alt de certificado, testimonio, nav/programMenu, hub programas, títulos de FAQ, alt de media, CTA de WhatsApp)"
    status: failed
    reason: "Un bullet de pricing en diplomado.ts todavía dice 'Diplomado CERO A SEO completo' (variante sin la palabra 'de', no capturada por el grep literal 'Diplomado de Cero a SEO' que usó el plan ni por el re-check semántico del ejecutor). Es contenido visible en la card de precios de /diplomado vía DiplomadoPricing.tsx."
    artifacts:
      - path: "aprendoclub/scripts/seed/seed-data/diplomado.ts"
        issue: "Línea 515, array pricing.features: 'Diplomado CERO A SEO completo' — nombre viejo sin renombrar"
    missing:
      - "Reemplazar 'Diplomado CERO A SEO completo' por 'Diplomado de SEO + AIO completo' (o el string exacto que el negocio confirme) en scripts/seed/seed-data/diplomado.ts:515"
      - "Re-correr npm run seed tras el fix para propagar a pages_blocks_diplomado_pricing_features en Neon"
  - truth: "npm run seed corre exitosamente contra Neon y propaga los nuevos nombres a Postgres (incluye 'alt de media' explícitamente listado en must_haves del plan)"
    status: failed
    reason: "seedMedia() en media.ts solo hace payload.create() para media nueva; si el documento ya existe (match por filename), el bloque 'existing.docs.length > 0' hace early-return sin nunca actualizar el campo alt. Como estos 3 assets del diplomado ya existían en Neon de un seed anterior, el re-seed de Phase 28 NO propagó los alt corregidos — la DB de producción sigue mostrando el nombre viejo en el atributo alt/aria-label de 3 imágenes del diplomado, aunque el archivo fuente media.ts sí tiene el texto correcto."
    artifacts:
      - path: "aprendoclub/scripts/seed/media.ts"
        issue: "seedMedia(): rama 'existing.docs.length > 0' (líneas 118-123) no actualiza alt en documentos preexistentes — solo reusa el id"
    missing:
      - "Añadir payload.update({ collection: 'media', id, data: { alt: asset.alt } }) en la rama existing.docs.length > 0 de seedMedia(), o al menos cuando el alt actual difiere del calculado"
      - "Re-correr npm run seed y confirmar en Neon que media.alt para diplomado-hero.avif, diplomado-certificado.avif y diplomado-modulos2.avif ya no contienen 'Diplomado de Cero a SEO'"
deferred: []
---

# Phase 28: Rebranding del diplomado Verification Report

**Phase Goal:** El diplomado se presenta de forma consistente bajo su nuevo nombre en todas las páginas y datos donde aparece.
**Verified:** 2026-07-11T15:30:00Z
**Status:** gaps_found
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | `grep -r "Diplomado de Cero a SEO"` sobre `scripts/seed/seed-data/*.ts` no devuelve coincidencias (roadmap SC1) | ✓ VERIFIED | `grep -rin "diplomado de cero a seo" aprendoclub/scripts/seed/` → 0 líneas. El gate literal del plan (`grep -ric ... -eq 0`) sí tiene un bug de shell confirmado (ver sección "Gate del plan" abajo), pero el chequeo semántico equivalente da 0, tal como reportó el SUMMARY. |
| 2 | Todas las ocurrencias del nombre del diplomado (diplomado.ts, testimonios.ts, collections.ts, globals.ts, media.ts) muestran "Diplomado de SEO + AIO" (roadmap SC2) | ✗ FAILED | 9/10 ocurrencias correctas en el código fuente (badgeText, alt de certificado en diplomado.ts, testimonio, nombre/label en collections.ts, label en globals.ts, 2 alt en media.ts, 2 títulos de audience/howItWorks). **Pero** `diplomado.ts:515` (`pricing.features`) todavía dice `"Diplomado CERO A SEO completo"` — variante de la marca vieja sin renombrar, no capturada por el grep literal del plan ni por el re-check del ejecutor. |
| 3 | "Práctica real" reemplazado por "Práctica aplicada" en collections.ts | ✓ VERIFIED | `collections.ts:20` → `'...Práctica aplicada, coaching en vivo y certificación.'`. Sin ocurrencias de "Práctica real". |
| 4 | Frases "especialista SEO" en programMenu/programas descripciones sobreviven intactas | ✓ VERIFIED | `collections.ts:20,60`, `globals.ts:23`, `diplomado.ts:42,455,550` conservan "especialista SEO" sin cambios. |
| 5 | La página /diplomado en vivo (post-seed) muestra el nuevo nombre en título, hero y cualquier mención cruzada (roadmap SC3) | ✗ FAILED | Consulta directa a Neon (`programas`, `pages_blocks_hero`, `pages_blocks_audience`, `pages_blocks_how_it_works`, `testimonios`, `site_settings_navbar_program_menu`) confirma el nombre nuevo propagado en título/hero/nav/audience/howItWorks/testimonio. **Pero** la tabla `media` en Neon retiene el alt viejo en 3 registros usados por la galería y el hero del diplomado (`diplomado-hero.avif` id 118, `diplomado-certificado.avif` id 119, `diplomado-modulos2.avif` id 123), y `pages_blocks_diplomado_pricing_features` retiene el bullet "Diplomado CERO A SEO completo" (id `...290`) porque el bug del truth #2 nunca se corrigió en la fuente antes del seed. Ambos son contenido "en vivo" renderizado (alt/aria-label de imágenes vía `DiplomadoGaleria.tsx`, bullet de precios vía `DiplomadoPricing.tsx`). |

**Score:** 3/5 truths verified

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `aprendoclub/scripts/seed/seed-data/diplomado.ts` | badgeText, alt de certificado, títulos de audience/howItWorks con el nuevo nombre | ⚠️ PARCIAL | badgeText (L41), alt certificado (L80), audience.titulo (L145), howItWorks.titulo (L343) correctos. `pricing.features` (L515) NO renombrado: "Diplomado CERO A SEO completo". |
| `aprendoclub/scripts/seed/seed-data/testimonios.ts` | Mención del testimonio con el nuevo nombre | ✓ VERIFIED | L143 correcto. Confirmado también en Neon (`testimonios.quote`, id 5). |
| `aprendoclub/scripts/seed/collections.ts` | nombre del programa, label de programMenu, "Práctica aplicada" | ✓ VERIFIED | L18, L20, L58 correctos. Confirmado en Neon (`programas.nombre`, `programas.descripcion`). |
| `aprendoclub/scripts/seed/globals.ts` | label de programMenu (nav) con el nuevo nombre | ✓ VERIFIED | L21 correcto. Confirmado en Neon (`site_settings_navbar_program_menu.label`). |
| `aprendoclub/scripts/seed/media.ts` | alt text de hero y de features del diplomado con el nuevo nombre | ⚠️ HOLLOW | Código fuente correcto (L73, L81), pero el dato no llegó a Neon — ver truth #5 y Key Link abajo. |
| `aprendoclub/scripts/seed/seed-data/home.ts` | CTA de WhatsApp URL-encoded con el nuevo nombre | ✓ VERIFIED | L294 contiene `Diplomado%20de%20SEO%20%2B%20AIO`. |

### Key Link Verification

| From | To | Via | Status | Details |
|------|-----|-----|--------|---------|
| `scripts/seed/collections.ts`, `globals.ts`, `seed-data/diplomado.ts` (audience/howItWorks/pricing base), `testimonios.ts` | Postgres/Neon | `npm run seed` (upsert idempotente) | ✓ WIRED (parcial) | `programas`, `site_settings_navbar_program_menu`, `pages_blocks_audience`, `pages_blocks_how_it_works`, `testimonios`, `pages_blocks_hero.badge_text` confirmados actualizados en Neon vía query SQL directa. |
| `scripts/seed/media.ts` (`collectMediaAssets().alt`) | Postgres/Neon `media.alt` | `seedMedia()` → `payload.find` + `payload.create` | ✗ NOT_WIRED (para docs preexistentes) | `seedMedia()` (media.ts:112-123) solo escribe `alt` en `payload.create()`. Si el media ya existe por `filename`, hace `manifest.set(...)` y `continue` sin nunca llamar `payload.update()`. Confirmado con query directa a Neon: `media.alt` de 3 registros del diplomado sigue con el nombre viejo pese a que `media.ts` fuente ya tiene el texto correcto. |

### Data-Flow Trace (Level 4)

| Artifact | Data Variable | Source | Produces Real Data | Status |
|----------|---------------|--------|---------------------|--------|
| `DiplomadoGaleria.tsx` (`imagen.alt`, incluye lightbox `aria-label`) | `resolveMediaList(block.imagenes)` → relación a `media.alt` en Neon | `pages_blocks_diplomado_galeria` → FK a `media` | No — `media.alt` retiene "Diplomado de Cero a SEO" para el certificado (id 119) y el hero (id 118) | ✗ DISCONNECTED (alt stale) |
| `DiplomadoPricing.tsx` (bullets de `pricing.features`) | `pages_blocks_diplomado_pricing_features.text` | `scripts/seed/seed-data/diplomado.ts:515` → seed directo (no vía media) | No — el dato de origen en el archivo fuente ya está mal (nunca se corrigió, no es un problema de propagación) | ✗ DISCONNECTED (source bug) |

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|-------------|--------------|--------|----------|
| BRAND-01 | 28-01-PLAN.md | El diplomado se renombra de "Diplomado de Cero a SEO" a "Diplomado de SEO + AIO" en todas sus ocurrencias | ✗ BLOCKED | 9/10 ocurrencias de contenido correctas y propagadas; falta 1 ocurrencia de código (`pricing.features`) y la propagación de 3 alt de media a Neon. No es "todas sus ocurrencias" hasta que se cierren ambos gaps. |

No hay requirements huérfanos: REQUIREMENTS.md solo mapea BRAND-01 a Phase 28, declarado en el frontmatter del plan.

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `aprendoclub/scripts/seed/seed-data/diplomado.ts` | 515 | Nombre de marca viejo sin actualizar ("Diplomado CERO A SEO completo") | 🛑 Blocker | Contenido visible en la card de precios de /diplomado; contradice el objetivo de la fase. |
| `aprendoclub/scripts/seed/media.ts` | 118-123 | Upsert de media que nunca actualiza `alt` en documentos existentes (bug estructural, no solo de este contenido) | 🛑 Blocker | Cualquier cambio futuro de alt text en `collectMediaAssets()` para assets ya subidos NUNCA se propagará a Neon sin una migración manual — no es exclusivo de Phase 28, pero es la causa raíz de por qué esta fase no logró su objetivo en la DB. |

Ningún debt marker (TBD/FIXME/XXX/TODO/HACK) encontrado en los 6 archivos modificados.

### Gate del plan (bug de shell confirmado)

El SUMMARY reportó correctamente que el gate automatizado del plan (`test $(grep -ric "Diplomado de Cero a SEO" aprendoclub/scripts/seed/) -eq 0`) tiene un bug: `grep -ric` sobre un directorio con múltiples archivos devuelve una línea `archivo:conteo` por archivo (12 líneas en este repo), no un total agregado. `$(...)` captura esas 12 líneas, y `test <multi-línea> -eq 0` falla con "too many arguments" (confirmado: exit code 1 al reproducir el comando exacto). El chequeo semántico equivalente (`grep -rin "diplomado de cero a seo" aprendoclub/scripts/seed/ | wc -l` → 0) sí es válido y consistente con lo que el ejecutor reportó. Esta parte del SUMMARY es correcta y se confirma. El problema real de esta fase no es el bug del gate — es que el propio criterio de búsqueda (string literal "Diplomado de Cero a SEO") no cubre la variante "Diplomado CERO A SEO" que sobrevivió en el código, y que el seed de media nunca actualiza alt de documentos existentes.

### Human Verification Required

Ninguno. Ambos gaps son verificables programáticamente (grep de código fuente + query SQL directa a Neon de producción) y ya fueron confirmados en esta verificación.

### Gaps Summary

Dos gaps reales, ambos de bajo esfuerzo de cierre pero necesarios para que la fase cumpla su objetivo declarado ("el diplomado se presenta de forma consistente bajo su nuevo nombre en todas las páginas y datos donde aparece"):

1. **Ocurrencia de código no detectada**: `diplomado.ts:515` sigue con "Diplomado CERO A SEO completo" en el bullet de pricing, visible en la card de precios de /diplomado. El plan y el ejecutor solo buscaron el string exacto "Diplomado de Cero a SEO" y no detectaron esta variante sin la palabra "de".
2. **Bug estructural en `seedMedia()`**: la función nunca actualiza `alt` de documentos de media que ya existen en Neon (solo los crea si no existen). Esto significa que 3 imágenes del diplomado (hero, certificado, feature de "cómo funciona") siguen mostrando "Diplomado de Cero a SEO" en su atributo `alt`/`aria-label` en producción, pese a que el archivo fuente `media.ts` ya tiene el texto correcto. Este bug afectará también a cualquier fase futura que edite alt text de media ya subida — no es exclusivo de Phase 28, pero es la causa raíz por la que el objetivo de esta fase no se cumple completamente en la base de datos en vivo.

Ambos gaps requieren: (a) un fix de una línea en `diplomado.ts:515`, (b) un fix en la rama de `existing.docs.length > 0` de `seedMedia()` para hacer `payload.update()` cuando el alt difiere, y (c) un re-seed contra Neon tras ambos fixes.

---

_Verified: 2026-07-11T15:30:00Z_
_Verifier: Claude (gsd-verifier)_
