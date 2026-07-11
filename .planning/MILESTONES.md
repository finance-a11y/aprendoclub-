# Project Milestones: aprendoclub

[Entries en orden cronológico inverso — más reciente primero]

## v1.5 Refresh de home + widget de asesoría (Shipped: 2026-07-11)

**Delivered:** Home rediseñada (hero, selector de íconos, cards de problema), widget de asesoría vía WhatsApp, motion moderno + spacing, imágenes reales en diplomado, propagación a Diplomado/Taller/Reto.

**Phases completed:** 20-25 (8 fases)

**Key accomplishments:**
- Hero de home rediseñado + selector visual de íconos sobre 1914 íconos lucide
- Widget de asesoría por WhatsApp
- Motion moderno + spacing unificado, imágenes reales en diplomado
- Deployado a main sin PR (commit directo, decisión de Juan)
- Post-deploy: 1 bug crítico (React error #482, LucideIcon async→DynamicIcon síncrono) + 5 bugs visuales corregidos

**What's next:** v1.6 — auditoría y rediseño de copy (evitar "real", des-enfatizar SEO, Diana→Dana, etc.)

---

## v1.3 Payload CMS — todo editable (Shipped: 2026-07-05)

**Delivered:** Migración completa de contenido hardcodeado a Payload CMS 3 + Postgres/Neon + Vercel Blob, con blog migrado de aprendoseo.com.

**Phases completed:** 13-18 (6 fases, 38 planes)

**Key accomplishments:**
- Colección Pages (page-builder ~29 bloques) + 5 colecciones de datos + site-settings, seed idempotente
- 8 páginas cutover a Payload pixel-idéntico, `content/*.ts` eliminados
- SEO: generateMetadata, JSON-LD, sitemap dinámico reconectados
- Blog migrado: 64 posts, 5 categorías, 3 autores, rutas flat `/{cat}/{slug}`
- Auditoría `.planning/milestones/v1.3-MILESTONE-AUDIT.md` PASSED (17/17 reqs)

**What's next:** v1.4/v1.5 — polish y refresh de home

---

## v1.2 Motion design + polish (Shipped: 2026-07-04)

**Delivered:** Auditoría y refinamiento de motion (26 animaciones framer), optimización de imágenes a AVIF/WebP.

**Phases completed:** 10-12 (18 commits)

**Key accomplishments:**
- MOTION-AUDIT.md, easing correcto, cero duration residual
- FAQ accordions migrados de animar height a grid-template-rows
- 32 imágenes → AVIF/WebP, −7.37MB (−86%) en public/

**What's next:** v1.3 Payload CMS

---

## v1.1 Refrescamiento UI/UX (Shipped: 2026-07-04)

**Delivered:** Design system unificado (tokens, primitivos ui/), auditoría transversal de contraste/accesibilidad/motion.

**Phases completed:** 4 fases, 23 planes, 37 tareas, 50 commits

**Key accomplishments:**
- Design system en app/globals.css + components/ui/{eyebrow,button,card}.tsx
- ~205 hex crudos migrados a tokens semánticos en ~35 archivos
- Contraste ≥4.5:1, navbar mega-menú operable por teclado, next/image en 14 archivos
- Contrato tipográfico: 3 pesos (regular/medium/semibold)

**What's next:** v1.2 Motion design + polish

---

## v1.0 Web lista para Google Ads (Shipped: 2026-07-04)

**Delivered:** Shell (site) con navbar/footer compartidos, páginas quienes-somos/testimonios/programas/diplomado/taller/reto, contenido migrado y humanizado de aprendoseo.com.

**Key accomplishments:**
- Patrón data-driven en content/
- Diplomado rediseñado del sistema shadcn propio al look aprendoclub

**What's next:** v1.1 Refrescamiento UI/UX

---
