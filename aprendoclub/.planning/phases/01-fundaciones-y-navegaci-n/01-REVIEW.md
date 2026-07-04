---
phase: 01-fundaciones-y-navegacion
reviewed: 2026-07-03T00:00:00Z
depth: deep
files_reviewed: 10
files_reviewed_list:
  - content/site.ts
  - app/(site)/layout.tsx
  - app/(site)/page.tsx
  - app/(site)/quienes-somos/page.tsx
  - app/(site)/programas/page.tsx
  - app/(site)/testimonios/page.tsx
  - components/navbar.tsx
  - components/footer.tsx
  - app/sitemap.ts
  - components/sticky-cta-mobile.tsx
findings:
  blocker: 1
  critical: 1
  warning: 4
  info: 3
  total: 8
status: findings
---

# Phase 1: Code Review Report

**Reviewed:** 2026-07-03
**Depth:** deep
**Files Reviewed:** 10
**Status:** issues_found

## Summary

Fase 1 introduce una capa de contenido tipada (`content/site.ts`), reestructura el
shell del sitio bajo el route group `(site)`, y convierte navbar/footer en
componentes data-driven. La arquitectura es sólida: separación contenido/presentación
limpia, tipos correctos, boundaries server/client bien colocados (páginas placeholder
son Server Components con `metadata`; navbar/footer/sticky son `"use client"` por
usar hooks). El home hereda correctamente la metadata rica del root layout.

El hallazgo más serio es funcional y de cara al usuario: **3 de los 4 links de la
columna "Programas" del footer apuntan a rutas que no existen** y devuelven 404 en
producción, contradiciendo el comentario del código que afirma "sin links muertos".
Además hay maquinaria de scroll-spy muerta en el navbar y varias regresiones de
accesibilidad en el menú mobile.

## Critical Issues

### CR-01 / BL-01: Footer publica 3 links rotos (404) en producción

**File:** `content/site.ts:58-75` (renderizado por `components/footer.tsx:62-81`)
**Issue:** La columna "Programas" del footer declara cuatro links. Verifiqué las rutas
existentes (`find app -name page.tsx`): solo existen `/`, `/diplomado`, `/links` y
`/programas`. Por lo tanto:
- `/programas/taller-seo-con-ia` → 404
- `/reto` → 404
- `/programas/econia` → 404

El footer se renderiza en el layout de `(site)`, es decir en **todas** las páginas
publicadas ahora (incluido el home en producción). El header del bloque dice
literalmente `/** Columnas del footer, sin links muertos. */`, pero 3 de 4 están
muertos. Nota la inconsistencia: `app/sitemap.ts:43` sí es cuidadoso y omite esas
mismas rutas con un TODO ("para no publicar URLs rotas"), pero el footer no aplica el
mismo criterio. Un usuario que haga clic recibe un 404 en un sitio de marketing en
vivo.

**Fix:** Omitir los links de Fase 4 hasta que las rutas resuelvan (mismo criterio que
el sitemap), o apuntarlos temporalmente a un destino real:
```ts
{
  title: "Programas",
  links: [
    { label: "Diplomado", href: "/diplomado" },
    // Reactivar en Fase 4 cuando existan las rutas:
    // { label: "Taller SEO con IA", href: "/programas/taller-seo-con-ia" },
    // { label: "Reto 7 días", href: "/reto" },
    // { label: "Econía / SEOconía", href: "/programas/econia" },
  ],
},
```
Y corregir el comentario que afirma "sin links muertos".

## Warnings

### WR-01: Scroll-spy del navbar es código muerto (nunca se consume)

**File:** `components/navbar.tsx:11,44-66,19-21,32,54`
**Issue:** El `IntersectionObserver` de la sección "active section", el estado
`activeSection`, el array `homeSections` y la rama `if (item.type === "anchor")` de
`isItemActive` existen para resaltar anclas del home por scroll. Pero `siteNav`
(`content/site.ts:43-48`) contiene **cero** items de tipo `"anchor"` — los cuatro son
`"route"`. En consecuencia `activeSection` se actualiza en cada scroll del home pero
ningún elemento lo lee jamás; el observer y su estado son totalmente inertes. Es un
observer corriendo en cada carga del home sin efecto, y lógica que induce a error a
quien mantenga el archivo.
**Fix:** Eliminar `homeSections`, el `useEffect` del IntersectionObserver, el estado
`activeSection` y la rama `"anchor"` de `isItemActive` (y su parámetro), o —si se
quiere conservar la capacidad— añadir realmente items `type: "anchor"` a `siteNav`.
Mientras no haya anclas, es dead code.

### WR-02: El scroll del body queda bloqueado al pasar a desktop con el menú abierto

**File:** `components/navbar.tsx:68-78`
**Issue:** Al abrir el menú mobile se fija `document.body.style.overflow = "hidden"`.
El panel se oculta en desktop vía clase `md:hidden`, pero el estado
`isMobileMenuOpen` no se resetea al cambiar de breakpoint. Si el usuario abre el menú
en viewport angosto y luego ensancha la ventana (o rota el dispositivo) por encima de
`md`, el panel desaparece visualmente pero `overflow: hidden` permanece: la página
queda sin poder hacer scroll y no hay botón visible para cerrarlo (el toggle también
es `md:hidden`). Estado inconsistente atrapable.
**Fix:** Cerrar el menú al cruzar el breakpoint, p. ej. con un listener de
`matchMedia("(min-width: 768px)")` que haga `setIsMobileMenuOpen(false)`, o condicionar
el lock a que el menú siga siendo relevante.

### WR-03: Menú mobile sin cierre por Escape ni focus trap (regresión de accesibilidad)

**File:** `components/navbar.tsx:150-160,178-262`
**Issue:** El panel deslizante funciona como un diálogo modal (backdrop, bloqueo de
scroll, cubre la pantalla) pero: (1) no cierra con la tecla `Escape`; (2) no atrapa el
foco — al tabular, el foco escapa a los elementos de fondo que están tras el backdrop;
(3) el botón toggle no expone `aria-expanded` ni `aria-controls`; (4) el contenedor no
tiene `role="dialog"` / `aria-modal`. Para usuarios de teclado y lectores de pantalla
esto es un modal inaccesible.
**Fix:** Añadir `aria-expanded={isMobileMenuOpen}` y `aria-controls` al botón; añadir un
`useEffect` que escuche `keydown` Escape para cerrar; marcar el panel con
`role="dialog" aria-modal="true"` y aplicar focus trap (o mover el foco al panel al
abrir y devolverlo al toggle al cerrar).

### WR-04: El ancla del skip link queda oculta bajo el navbar fijo

**File:** `app/(site)/layout.tsx:11-20`
**Issue:** El skip link "Ir al contenido principal" apunta a `#main`, correcto. Pero el
navbar es `position: fixed` con `h-[72px]` (`components/navbar.tsx:90`) y `<main
id="main">` no tiene `scroll-margin-top` ni el documento `scroll-padding-top`. Al
activar el skip link, el navegador desplaza `#main` al borde superior del viewport,
quedando su inicio tapado por los 72px del navbar fijo. El objetivo del skip link
—llevar al usuario al contenido— queda parcialmente frustrado.
**Fix:** Añadir `scroll-mt-[72px]` a `<main>` (o `scroll-padding-top: 72px` en `html`
dentro de globals.css) para compensar la altura del navbar fijo.

## Info

### IN-01: `<img>` nativo en lugar de `next/image`

**File:** `components/navbar.tsx:99`, `components/footer.tsx:39`
**Issue:** Ambos logos usan `<img src="/logo.svg">`. La regla lint de Next
`@next/next/no-img-element` lo marca y, según configuración de CI, puede romper el
build. (Perf/CLS quedan fuera de alcance v1; se reporta solo por el lint.)
**Fix:** Usar `next/image` con `width`/`height` explícitos, o silenciar la regla
conscientemente si se prefiere `<img>` para el SVG del logo.

### IN-02: Colores hardcodeados en vez del token `--accent`

**File:** `components/navbar.tsx:112,144,201,249`, `components/footer.tsx` (verde CTA)
**Issue:** El verde de marca se escribe como literal `#b8f60d` / `bg-[#b8f60d]`, pese a
existir el token `--accent: #b8f60d` en `app/globals.css:14`. Es consistente con el
patrón preexistente (hero también lo hardcodea), por eso es Info y no Warning, pero un
cambio de marca obliga a editar múltiples archivos en vez de un token.
**Fix:** Usar `bg-[var(--accent)]` / `text-[var(--accent)]` para centralizar el color.

### IN-03: `socialIcons[social.id]` sin fallback puede renderizar un enlace vacío

**File:** `components/footer.tsx:6,55`
**Issue:** `socialIcons` es `Record<string, React.ReactNode>` indexado por `social.id`.
Hoy los tres ids (`youtube`, `tiktok`, `whatsapp`) tienen icono, así que funciona. Pero
`content/site.ts` se anuncia como "Payload-ready": si un editor añade un social cuyo
`id` no está en el mapa, `socialIcons[social.id]` es `undefined` y se renderiza un
`<a>` clicable, con `aria-label` pero sin contenido visible (target de toque invisible).
**Fix:** Filtrar o dar fallback: `{socialIcons[social.id] ?? null}` combinado con un
`.filter(s => socialIcons[s.id])` antes del map, para no emitir enlaces sin icono.

---

_Reviewed: 2026-07-03_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: deep_
