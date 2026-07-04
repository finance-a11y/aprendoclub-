---
phase: 02-qui-nes-somos
reviewed: 2026-07-03T00:00:00Z
depth: standard
files_reviewed: 10
files_reviewed_list:
  - content/quienes-somos.ts
  - app/(site)/quienes-somos/page.tsx
  - components/quienes-somos/hero.tsx
  - components/quienes-somos/historia.tsx
  - components/quienes-somos/fundadora.tsx
  - components/quienes-somos/equipo.tsx
  - components/quienes-somos/metodologia.tsx
  - components/quienes-somos/stats.tsx
  - components/quienes-somos/cta.tsx
  - components/instructor-section.tsx
findings:
  critical: 0
  warning: 2
  info: 3
  total: 5
status: findings
---

# Phase 2: Code Review Report — Quiénes somos

**Reviewed:** 2026-07-03
**Depth:** standard
**Files Reviewed:** 10
**Status:** issues_found

## Summary

Revisé los 7 componentes de sección, la capa de contenido tipada, la página server-component y el cambio del teaser en `instructor-section.tsx`. La implementación es sólida en los puntos de mayor riesgo: los boundaries client/server son correctos (page.tsx es Server Component sin `"use client"`, cada sección animada declara `"use client"`), no hay links rotos (`/programas` y `/quienes-somos` existen, los 6 `.webp` referenciados están en `public/`), el alt text está presente en todas las imágenes, la lógica de fallback de iniciales del avatar es correcta (`useState(!member.foto)` + `onError`), y el reduced-motion está bien cableado en las 7 secciones nuevas.

No hay BLOCKERs. Los hallazgos son dos violaciones del design system (uso de accent fuera de eyebrows/CTAs) y tres notas de consistencia.

## Warnings

### WR-01: Accent (#b8f60d) usado en numeración de pilares — fuera de eyebrows/CTAs

**File:** `components/quienes-somos/metodologia.tsx:40`
**Issue:** El número decorativo del pilar (`01`, `02`, ...) usa `text-[#b8f60d]`. Según la regla del design system el accent debe limitarse a eyebrows y CTAs. Aquí es un elemento decorativo/ordinal, no un eyebrow ni una acción, lo que diluye el valor de señal del color y sobreexpone el accent en la página.
**Fix:**
```tsx
<span className="text-sm font-bold text-gray-500">
  {String(index + 1).padStart(2, "0")}
</span>
```
Usar un color neutro (p. ej. `text-gray-500` o `--text-muted`) y reservar el accent para el eyebrow y el CTA final.

### WR-02: Accent en el borde del blockquote — fuera de eyebrows/CTAs

**File:** `components/quienes-somos/historia.tsx:43`
**Issue:** El `border-l-2 border-[#b8f60d]` de la cita destacada aplica el accent a un elemento decorativo. Igual que WR-01, esto es uso del accent fuera del contrato (eyebrows + CTAs) y compite visualmente con el CTA verde del final de la página.
**Fix:**
```tsx
<blockquote className="mt-4 border-l-2 border-white/20 pl-6">
```
Usar un borde neutro (`border-white/20`) o el azul secundario si se quiere acento de marca sin recurrir al verde.

## Info

### IN-01: Hex hardcodeado #b8f60d en lugar del token var(--accent)

**File:** `components/quienes-somos/hero.tsx:17`, `historia.tsx:23,43`, `fundadora.tsx:45`, `equipo.tsx:44`, `metodologia.tsx:23,40`, `cta.tsx:31`
**Issue:** Todas las secciones usan el literal `#b8f60d` aunque `app/globals.css:14` ya define `--accent: #b8f60d`. Repetir el hex hace que un futuro cambio de marca requiera editar N archivos y abre la puerta a divergencias.
**Fix:** Reemplazar por el token, p. ej. `text-[var(--accent)]` en eyebrows y `bg-[var(--accent)]` en el CTA. (Ya existe también `--accent-glow` para el `hover:shadow`.)

### IN-02: instructor-section.tsx no respeta prefers-reduced-motion

**File:** `components/instructor-section.tsx:26-31,46-49,77-81`
**Issue:** Las 7 secciones nuevas de Quiénes somos incorporan `useReducedMotion()` y anulan `initial`/`transition`, pero `instructor-section.tsx` (el archivo tocado en ABOUT-02) mantiene animaciones de entrada sin ese guard. Es una inconsistencia de accesibilidad respecto al estándar que fija esta fase. El teaser agregado (líneas 92-101) está correcto; la brecha es preexistente en las animaciones del bloque.
**Fix:** Introducir `const reduceMotion = useReducedMotion();` y aplicar el mismo patrón (`initial={reduceMotion ? false : {...}}`, `transition={{ duration: reduceMotion ? 0 : 0.6 }}`) para alinear el componente con el resto del sitio.

### IN-03: Separador de miles inconsistente entre bloques (2.000+ vs 2,000+)

**File:** `components/instructor-section.tsx:11` vs `content/quienes-somos.ts:184`
**Issue:** El home muestra `"2,000+"` (coma) mientras que el contenido de Quiénes somos usa `"2.000+"` (punto). En español neutro el separador de miles es el punto; ver ambos formatos en el mismo sitio es una incongruencia de presentación. Nota: no reevalúo la copia verbatim, solo señalo el formato numérico divergente entre secciones.
**Fix:** Unificar a `"2.000+"` en `instructor-section.tsx` (o centralizar los stats en la capa de contenido y consumirlos en ambos lugares).

---

_Reviewed: 2026-07-03_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
