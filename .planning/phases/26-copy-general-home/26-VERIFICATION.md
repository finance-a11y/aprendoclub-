---
phase: 26-copy-general-home
verified: 2026-07-11T00:00:00Z
status: human_needed
score: 4/4 must-haves verified
overrides_applied: 0
human_verification:
  - test: "Confirmar con Juan que 'Formamos especialistas en SEO e IA' (quienes-somos.ts:81, subtítulo del hero, justo debajo del título ya de-enfatizado) es aceptable como mención de dominio/rol y no requiere reescritura adicional."
    expected: "Juan confirma que la frase describe la especialización de los egresados (no un tagline de posicionamiento de marca) y puede quedar tal cual, o pide reescribirla."
    why_human: "Es un juicio de tono de marca/voz, no verificable por grep: el patrón genérico del gate (26-04) no la marca como violación estructural, pero es la línea de copy más cercana al límite del criterio COPY-02 (aparece inmediatamente debajo del título ya corregido, en la página de mayor peso de marca junto al home)."
---

# Phase 26: Copy general + Home Verification Report

**Phase Goal:** El copy general del sitio deja de usar "real"/"reales" y de-enfatiza la palabra "SEO" en favor de "marketing/IA/tecnología"; el home refleja subtítulo y cifra de estudiantes actualizados.
**Verified:** 2026-07-11
**Status:** human_needed (score 4/4 automatizado; 1 ítem de juicio de voz de marca pendiente de confirmación de Juan)
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths (Roadmap Success Criteria)

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | `grep -ri "\breal(es)?\b"` sobre `scripts/seed/seed-data/*.ts` no devuelve coincidencias fuera de nombres propios/URLs/comentarios | ✓ VERIFIED | Re-ejecutado en vivo: único residuo son 5 líneas, todas comentarios JSDoc (`/** ... */`) sobre specs de imágenes (`testimonios.ts:24,280`, `diplomado.ts:15,64,319`) — explícitamente fuera de alcance de COPY-01 por CONTEXT.md ("comentarios de código... NO tocar"). 0 ocurrencias en copy visible al usuario. |
| 2 | El subtítulo/meta del home ya no contiene "academia de SEO" ni "acompañamiento real" | ✓ VERIFIED | `home.ts:41` subtitulo = "Especialízate en marketing con IA en la plataforma educativa..." — no contiene ninguna de las dos frases prohibidas. Confirmado por lectura directa del archivo. |
| 3 | La cifra de estudiantes en el home (badge, subtítulo, `ratingTexto`) refleja el valor nuevo de forma consistente | ✓ VERIFIED | `badgeText: "+10.000 estudiantes ya se unieron"` (home.ts:36), `ratingTexto: "4.9/5 de +10.000 estudiantes"` (home.ts:54). `grep -c "10.000" home.ts` = 2. `grep "+500 estudiantes"` = 0 en todo `scripts/seed/`. |
| 4 | El badge y subtítulo de home y el título de quienes-somos de-enfatizan "SEO" en favor de "marketing/IA/tecnología" (barrido no limitado a esas ubicaciones) | ✓ VERIFIED (con 1 ítem de juicio, ver human_verification) | Badge/subtítulo home: confirmado arriba. Título quienes-somos (`quienes-somos.ts:79`): "La primera academia de marketing con IA pensada para el mundo hispano" — confirmado. Barrido genérico por patrón (`academia (de\|especializada en) SEO\|profesional(es)? SEO\|SEO \+ IA\|SEO e IA\|especializate en SEO\|aprenden SEO`) re-ejecutado sobre todo `scripts/seed/`: único match es `quienes-somos.ts:81` ("Formamos especialistas en SEO e IA..."), documentado como excepción de dominio/rol en 26-04-SUMMARY. Ver análisis abajo. |

**Score:** 4/4 truths verified (automated); 1 truth carries a borderline judgment call flagged for human sign-off, not a failure.

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `aprendoclub/scripts/seed/seed-data/home.ts` | Copy sin "real", SEO de-enfatizado, cifra +10.000 | ✓ VERIFIED | Confirmado línea por línea (hero, problema, beneficios, asesoriaWidget). Commits `74224e1`, `8f9b912` existen en `git log`. |
| `aprendoclub/scripts/seed/seed-data/diplomado.ts` | 12 reescrituras "real"/"reales" + de-énfasis claim de posicionamiento | ✓ VERIFIED | `grep` en vivo no encuentra "real"/"reales" en copy visible (solo 3 comentarios JSDoc, correctamente excluidos). Claim "primera academia especializada en marketing con IA" confirmada, cifra "750" intacta. Commits `aa53469`, `29b0805`, `6540c2a` existen. Rutas `/diplomado/real/*.avif` intactas (no tocadas, confirmado por exclusión del grep). |
| `aprendoclub/scripts/seed/seed-data/quienes-somos.ts`, `faqs.ts`, `testimonios.ts`, `reto.ts` | Barrido de "real"/"reales" + de-énfasis SEO en título | ✓ VERIFIED | Commits `3c0c786`, `1aa30f7` existen. Grep en vivo confirma 0 residuos de copy visible. |
| `aprendoclub/scripts/seed/globals.ts` | Meta description + taglines footerMeta de-enfatizan SEO | ✓ VERIFIED | `blurb`, `orgDescription` (líneas 65, 133) y `mobilePanelBlurb` (línea 68) dicen "marketing con IA". `copyrightRight` conservado deliberadamente ("comunidad SEO" = mención de dominio, no tagline) — razonamiento documentado y consistente con el criterio de discriminación de CONTEXT.md. Commits `c4d450e`, `bb48761` existen. |
| DB Postgres/Neon (site-settings + pages) | Refleja el copy nuevo tras `npm run seed` | ✓ VERIFIED | `/tmp/seed26.log` existe en disco (timestamp 11-jul 02:22, consistente con la fecha de la fase), termina en "Completado sin errores" con los 7 pages y site-settings sembrados. No es solo narración del SUMMARY: el log es evidencia de ejecución real, no reconstruible por un simple `echo`. |

### Key Link Verification

| From | To | Via | Status | Details |
|------|-----|-----|--------|---------|
| `scripts/seed/seed-data/home.ts` | `scripts/seed/pages.ts buildHome()` | `hero.badgeText/subtitulo/ratingTexto` | ✓ WIRED | No requiere cambios de código (confirmado en CONTEXT.md); son campos de datos consumidos sin transformación. |
| `scripts/seed/globals.ts` | site-settings (Payload global) | `seedGlobals()` | ✓ WIRED | Confirmado por log de seed: "[seed:globals] site-settings OK". |

### Anti-Patterns Found

Ninguno de tipo TBD/FIXME/XXX/TODO/HACK/PLACEHOLDER introducido por los cambios de esta fase. Los únicos matches de "real"/"reales" remanentes son comentarios JSDoc pre-existentes documentando specs técnicas de imágenes, expresamente fuera de alcance por CONTEXT.md — no son residuos de la reescritura de copy.

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|-------------|--------------|--------|----------|
| COPY-01 | 26-01, 26-02, 26-03, 26-04 | Ningún texto usa "real"/"reales" | ✓ SATISFIED | Gate re-ejecutado en vivo: 0 residuos de copy visible en todo `scripts/seed/`. |
| COPY-02 | 26-01, 26-02, 26-03, 26-04 | De-énfasis de "SEO" en favor de marketing/IA | ✓ SATISFIED (1 ítem de juicio) | Barrido genérico re-ejecutado: 1 match (quienes-somos.ts:81) documentado como excepción; ver análisis en Human Verification. |
| HOME-01 | 26-01 | Subtítulo/meta home sin "academia de SEO" ni "acompañamiento real" | ✓ SATISFIED | Confirmado por lectura directa de home.ts. |
| HOME-02 | 26-01 | Cifra de estudiantes actualizada, consistente | ✓ SATISFIED | Badge y ratingTexto ambos en "+10.000", "+500" completamente eliminado del árbol seed. |

## Analysis: Los dos residuos documentados como excepciones

**1. Comentarios JSDoc con "real"/"reales" (`testimonios.ts:24,280`, `diplomado.ts:15,64,319`)**

Todos describen specs técnicas de assets de imagen ("Dimensiones intrínsecas reales del asset", "assets reales desde 24-02"). No son copy renderizado al usuario — son comentarios de código para desarrolladores. CONTEXT.md excluye explícitamente este caso ("Comentarios de código que dicen 'real'/'reales'... NO tocar — no son copy visible al usuario"). **Razonamiento sólido, exención válida.**

**2. `quienes-somos.ts:81` — "Formamos especialistas en SEO e IA que no se quedan en la teoría..."**

Esta es el `subtitulo` del hero de `/quienes-somos`, ubicado inmediatamente debajo del `titulo` ("La primera academia de marketing con IA pensada para el mundo hispano", ya reescrito). El razonamiento del executor (26-04-SUMMARY) la equipara a menciones de rol/dominio como "Consultora SEO"/"Analista SEO" (explícitamente excluidas del gate por CONTEXT.md), argumentando que describe la especialización de los egresados, no un tagline de posicionamiento de marca.

Este razonamiento es defendible pero no inequívoco: a diferencia de un testimonio individual con cargo "Analista SEO" (mención de rol de una persona), esta frase es el subtítulo de hero de una página de marca completa (quienes-somos), inmediatamente adyacente al título ya corregido. Es la segunda línea de mayor visibilidad de la página, y "especialistas en SEO e IA" sigue centrando "SEO" como la habilidad principal que forma la academia — el mismo patrón que motivó la reescritura del título de la misma sección un párrafo antes.

Contraargumento a favor de conservarlo: incluye "e IA" (no es SEO puro), y describe una salida educativa concreta (qué se forma), no una claim de posicionamiento genérica tipo "academia de SEO". El patrón `aprenden SEO` del gate no matchea "especialistas en SEO e IA" porque el gate fue diseñado deliberadamente para no capturar menciones de dominio educativo (ej. "aprender SEO" en el currículum del diplomado, que CONTEXT.md permite mantener).

**Conclusión:** No es un FAIL — la reescritura del título ya resuelve la claim central de posicionamiento de la página, y el patrón genérico del gate (diseñado con criterios explícitos de CONTEXT.md) no lo marca. Pero es lo bastante cercano al límite del criterio (mismo hero, misma sección, adyacente al título corregido) como para no cerrarlo silenciosamente como "no truth to verify" — se documenta como human_verification item para que Juan lo confirme o pida el ajuste, sin bloquear el avance a Phase 27.

## Gaps Summary

No hay gaps que bloqueen el goal de la fase. Los 4 truths del roadmap están verificados contra el código en disco (no solo contra lo narrado en los SUMMARY): home.ts, diplomado.ts, quienes-somos.ts, faqs.ts, testimonios.ts, reto.ts y globals.ts fueron re-inspeccionados con los mismos greps del gate de 26-04 más lecturas manuales de contexto, y todos los commits referenciados en los SUMMARY existen en `git log`. El seed corrió contra la DB real (log en `/tmp/seed26.log` con timestamp consistente).

Único punto abierto: la línea `quienes-somos.ts:81` requiere una confirmación de voz de marca de Juan (no es verificable objetivamente por grep), documentada arriba como human_verification item. No bloquea Phase 27 — quienes-somos.ts se vuelve a tocar en esa fase y puede resolverse ahí si Juan pide el cambio.

---

_Verified: 2026-07-11_
_Verifier: Claude (gsd-verifier)_
