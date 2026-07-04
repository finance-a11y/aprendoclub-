---
phase: 04-programas
reviewed: 2026-07-04T00:00:00Z
depth: deep
files_reviewed: 15
files_reviewed_list:
  - content/programas.ts
  - content/taller-seo-con-ia.ts
  - content/reto.ts
  - content/site.ts
  - components/program-card.tsx
  - components/programas-section.tsx
  - components/reto/reto-top.tsx
  - components/reto/reto-mid.tsx
  - components/reto/reto-bottom.tsx
  - components/diplomado/curriculum.tsx
  - components/diplomado/faq.tsx
  - app/(site)/programas/page.tsx
  - app/(site)/programas/taller-seo-con-ia/page.tsx
  - app/(site)/reto/page.tsx
  - app/(site)/diplomado/page.tsx
  - app/sitemap.ts
findings:
  critical: 0
  warning: 4
  info: 2
  total: 6
status: findings
---

# Phase 4: Code Review Report

**Reviewed:** 2026-07-04
**Depth:** deep
**Files Reviewed:** 15 (plus full scan of components/diplomado/*)
**Status:** issues_found

## Summary

Revisé la Fase 4 completa: capa de contenido (programas, taller, reto, site), la card reutilizable, el hub /programas, la página del taller, /reto con sus tres bloques, la sección de programas del home, el sitemap, y todo el reskin de /diplomado.

Resultado global positivo y de bajo riesgo:

- **`npm run build` verde** (exit 0, 12 rutas estáticas, TypeScript OK, sin `any`).
- **PROG-08 reskin correcto:** cero tokens shadcn residuales en `components/diplomado/*` (grep de `bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`, `bg-primary`, `text-primary-foreground`, `#b8ff2b`, `#4338f5`, `font-mono`, `max-w-5xl` no arroja nada).
- **navbar.tsx / footer.tsx del diplomado eliminados** (los archivos no existen y no hay imports). `/diplomado` renderiza bajo el shell `(site)` sin navbar/footer inline.
- **Anchor ids preservados** (`#metodologia`, `#programa`, `#equipo`, `#faq`, `#pricing`), todos con `scroll-mt-[72px]`.
- **Todas las imágenes tienen `alt`** (reto días, premios, ganadores, mentora, hero).
- **Server/client boundary correcto** para Next 16: los componentes con framer-motion o `useState` (`programas-section`, reto/*, diplomado curriculum/faq) llevan `"use client"`; las páginas y `program-card` son server components. Las CSS vars (`--bg-primary`, `--bg-secondary`, `--accent`) están definidas en `globals.css`.

No hay bloqueadores. Las observaciones son de calidad/UX/a11y y una CTA sin destino real.

## Warnings

### WR-01: CTA principal del taller apunta a un placeholder TODO en dominio externo

**File:** `content/taller-seo-con-ia.ts:83-87`
**Issue:** El CTA de conversión del taller (`tallerCta.href`) es un TODO sin resolver que apunta a `https://aprendoseo.com/curso-seo-con-ia`, un dominio de otra marca, no a un checkout de aprendoclub. Ese href es el único punto de conversión de `app/(site)/programas/taller-seo-con-ia/page.tsx:89-97`, y a esa página llegan tanto el hub como la card del home. En producción, "Quiero el taller" saca al usuario del sitio hacia la marca vieja. Hay un `// TODO Juan: confirmar URL real de checkout` en el código que confirma que es un valor provisional.
**Fix:** Reemplazar por la URL real de checkout de aprendoclub antes de publicar. Si aún no existe, apuntar temporalmente al WhatsApp comercial (mismo número usado en reto/hub) en lugar del dominio externo:
```ts
export const tallerCta: TallerCta = {
  label: "Quiero el taller",
  href: "https://checkout.aprendoclub.com/taller-seo-con-ia", // URL real
};
```

### WR-02: Acordeones sin semántica de accesibilidad completa

**File:** `components/diplomado/curriculum.tsx:45-60`, `components/diplomado/faq.tsx:45-58`, `components/reto/reto-bottom.tsx:83-123`
**Issue:** Los tres acordeones expanden/colapsan solo con estado visual:
- `curriculum.tsx` (línea 45) **no tiene `aria-expanded`** en el botón (faq y reto-bottom sí lo tienen), por lo que un lector de pantalla no anuncia si la semana está abierta o cerrada.
- Ninguno de los tres asocia botón y panel con `aria-controls` + `id`, ni marca el panel con `role="region"`. El contenido revelado queda desvinculado del control.
**Fix:** Añadir la relación botón/panel. Ejemplo para curriculum:
```tsx
<button
  onClick={() => setOpenWeek(openWeek === i ? null : i)}
  aria-expanded={openWeek === i}
  aria-controls={`week-panel-${i}`}
  ...
>
{openWeek === i && (
  <div id={`week-panel-${i}`} role="region" className="border-t ...">
```

### WR-03: Uso del accent (#b8f60d) fuera de eyebrows + CTAs

**File:** `components/reto/reto-mid.tsx:86-93`, `components/reto/reto-bottom.tsx:27,56,91-104`, `components/reto/reto-top.tsx:47,144`, `components/diplomado/curriculum.tsx:31`, `components/diplomado/team.tsx:73`, `app/(site)/programas/taller-seo-con-ia/page.tsx:44-45,84`
**Issue:** El propio comentario de `components/program-card.tsx:9` fija la regla 01-UI-SPEC: accent "limitado a badge y CTA". En la práctica el accent se usa como decorativo en muchos puntos: iconos Check (reto-mid:93,114; reto-bottom:56; taller:45,84), títulos de tarjeta (reto-mid:87), texto y chevron del FAQ activo (reto-bottom:91-104), viñetas del hero (reto-top:47), bordes de tarjeta (reto-mid:86; reto-bottom:27), borde del blockquote (reto-top:144), badge de 16 semanas (curriculum:31) y nombre de la mentora (team:73). Si la regla es autoritativa, esto es una desviación amplia; si el patrón es intencional, la spec/el comentario deberían actualizarse para no dejar la regla en contradicción con el código.
**Fix:** Decidir la regla y aplicarla de forma consistente. Si se mantiene la disciplina estricta, mover los decorativos a un color neutro (p. ej. `text-gray-300` para checks, `border-white/10` para bordes) y reservar `#b8f60d` para eyebrow y botón. Si el patrón nuevo es el correcto, corregir el comentario de `program-card.tsx:9` y la spec.

### WR-04: Un solo `useInView` en el wrapper raíz dispara todas las animaciones a la vez

**File:** `components/reto/reto-top.tsx:10-15`, `components/reto/reto-mid.tsx:17-22`
**Issue:** Ambos componentes ponen el `ref` de `useInView` en el `<div>` que envuelve TODAS sus secciones. Con `once: true` y `margin: "-100px"`, `isInView` se vuelve `true` en cuanto entra la parte superior del bloque, por lo que secciones que están mucho más abajo (premios, ganadores en reto-mid) se revelan antes de que el usuario llegue a ellas, anulando el efecto de reveal escalonado y el `delay` por índice. `programas-section.tsx` usa el mismo patrón pero es una sección corta y única, así que ahí no se nota.
**Fix:** Usar `whileInView` por elemento, o un `ref`/`useInView` por sección en lugar de uno global en la raíz:
```tsx
<motion.div
  initial={reduceMotion ? false : { opacity: 0, y: 20 }}
  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.5 }}
>
```

## Info

### IN-01: Inconsistencia en la capa de contenido del diplomado

**File:** `components/diplomado/faq.tsx:6-27`, `components/diplomado/curriculum.tsx:6-23`
**Issue:** La convención declarada de la fase (contenido tipado separado de la presentación, "Payload-ready para migrar 1:1") se cumple en reto/programas/taller, pero el FAQ y el temario del diplomado hardcodean sus arrays (`faqs`, `weeks`) inline dentro del componente. La migración a Payload no será 1:1 para esos dos bloques y el copy queda mezclado con el JSX.
**Fix:** Extraer `faqs` y `weeks` a `content/diplomado.ts` con interfaces tipadas, igual que `content/reto.ts`. No urge para v1.0, pero conviene antes de la migración a Payload (v1.1).

### IN-02: Número de WhatsApp duplicado en múltiples archivos

**File:** `content/reto.ts:117-118,236-239,243,296`, `content/programas.ts:101`, `content/site.ts:99`
**Issue:** `https://api.whatsapp.com/send?phone=13055728892` aparece repetido en varios archivos de contenido. Un cambio de número obliga a editar muchos puntos y arriesga inconsistencias.
**Fix:** Centralizar en una constante compartida (p. ej. `content/site.ts` → `export const whatsappUrl = "..."`) y referenciarla desde las capas de contenido.

---

_Reviewed: 2026-07-04_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: deep_
