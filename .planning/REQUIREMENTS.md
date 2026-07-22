# Requirements: aprendoclub — Web (v1.7 Feedback visual home + programas)

**Defined:** 2026-07-22
**Core Value:** Que el home y las páginas de programas reflejen el feedback más reciente de Arianna (copy, íconos, imágenes, motion, spacing) e inviten a agendar asesoría, corrigiendo en el camino un bug real de imágenes rotas que explica parte del feedback.
**Research:** Ninguno — feedback viene con copy definitivo y referencias visuales (doc ClickUp de Arianna), y se verificó contra el sitio en producción antes de definir el alcance.

## Contexto de verificación

Antes de definir estos requirements se auditó el sitio en producción (aprendoclub.com) contra el doc de feedback. Varios puntos del feedback **ya están resueltos** en el código/producción (quedan como verificación, no como trabajo nuevo):

- Hero: copy "La única academia de marketing e IA que te ayuda a encontrar trabajo" en Montserrat Bold — ✓ ya en producción.
- Botones de programas (Diplomado/Taller/Reto) alineados en la misma línea — ✓ ya en producción.
- Sección de precio eliminada del home, reemplazada por widget de asesoría — ✓ ya en producción.
- Testimonios ubicados antes del widget de asesoría — ✓ ya en producción.

Se encontró además un **bug no reportado por Arianna**: las imágenes de la galería del Diplomado (`diplomadoGaleria`) y las fotos del equipo (`teamGridRef`) están rotas en producción (`naturalWidth: 0`, `complete: true` — la request falla). Esto probablemente explica por qué el feedback pide "¿podemos agregar imágenes?" cuando el feature y los archivos ya existen en el repo — nunca se vieron porque no cargan. Se prioriza el fix de este bug dentro de este milestone.

## v1 Requirements (milestone v1.7)

### Tipografía y motion (TYPO)

- [ ] **TYPO-01**: Auditar y aplicar Montserrat Bold de forma consistente en los headings principales de home, diplomado, taller y reto (hoy el contrato tipográfico es 3 pesos: regular/medium/semibold; se agrega Bold donde falte, sin romper el contrato existente en el resto del sitio).
- [ ] **TYPO-02**: Segunda pasada de motion/transiciones (framer-motion, sin dependencias nuevas) en secciones clave del home y de programas — más notorio que el pase de v1.5, respetando `prefers-reduced-motion`.

### Cards de "problema" del home (CARDS)

- [ ] **CARDS-01**: Reemplazar el copy de las 4 cards de "problema" del home por el texto definitivo de Juan:
  - Card 1: "Sabes de todo y no te especializas. Tu CV dice 'marketing digital' pero no tienes diferenciación real. El mercado busca al que tiene un perfil claro y una habilidad con demanda."
  - Card 2: "Aprendes de contenido desactualizado, solo y sin saber si vas por buen camino. Google cambió el algoritmo. La IA reemplazó la mitad de las carreras genéricas. Y tú sigues con técnicas de un curso grabado hace dos años, sin correcciones, sin nadie que te diga si lo estás aplicando bien o perdiendo el tiempo."
  - Card 3: "Llevas meses preparándote y sigues cobrando lo mismo. Cursos, tutoriales, certificados. Pero sin proyectos reales, sin clientes, sin mentoría y sin un camino claro de junior a consultor, el esfuerzo no se convierte en dinero. Eso ya no es falta de conocimiento — es falta de estructura."
  - Card 4: "La IA te está dejando atrás. Todos hablan de IA + SEO pero nadie te enseña cómo integrar herramientas de IA en tu flujo de trabajo para potenciar tu tiempo y habilidades."
- [ ] **CARDS-02**: Reemplazar los íconos lucide de las 4 cards por íconos ilustrados 3D de [3dicons.co](https://3dicons.co/) (`iconMode: "image"`, infraestructura ya existe en `FeatureGrid`), uno por card, subidos a Payload media.

### Imágenes del Diplomado (DIPLO-IMG)

- [ ] **DIPLO-IMG-01** (bug fix): Corregir las imágenes rotas de la galería actual del Diplomado (`diplomadoGaleria`) y de las fotos del equipo (`teamGridRef`) en producción — investigar causa raíz (paths, build, dominio de imágenes) y verificar carga real post-deploy.
- [ ] **DIPLO-IMG-02**: Rediseñar la sección de galería del Diplomado como cards con foto + texto superpuesto, al estilo de la landing anterior (referencia: "Diplomado 16 semanas", "3 sesiones en vivo/semana", "Coachs solo para ti", "Invitados especiales", "Cursos cortos y actualizaciones", "Comunidad activa 24/7"). Requiere fotos reales — Juan las aporta; specs de formato (tamaño, aspecto, peso) se definen en plan-phase y quedan documentadas en `admin.description` como placeholder mientras tanto.

### Links de programas (PROG-LINK)

- [ ] **PROG-LINK-01**: El CTA del Taller en el home (card de "Nuestros programas") apunta temporalmente a la página estable `https://www.aprendoclub.com/evento` en vez de la página en construcción `/programas/taller-seo-con-ia`, hasta que esta última esté lista. Reto y Diplomado ya apuntan a sus páginas estables (`/reto`, `/diplomado`) — sin cambios.

### Widget de asesoría — refinamiento de copy (ADV)

- [ ] **ADV-05**: Actualizar el eyebrow/título/subtítulo/bullets del widget de asesoría gratuita del home al wording más reciente de Juan:
  - Eyebrow/título: "aprendoclub | Academia de SEO + IA" / "Especialízate en lo que el mercado está pagando hoy."
  - Bullets (9): aval universitario UCAB, clases en vivo con coaches especializados en SEO + IA cada semana, masterclasses y cursos especializados por área, invitados especiales cada mes, proyectos reales con feedback de expertos, coaches personalizados para ti, comunidad activa de especialistas en LATAM, herramientas/plantillas/recursos actualizados cada semana, certificación para LinkedIn hoy.
  - Subtítulo/CTA: "¿No sabes por dónde empezar? Agenda una asesoría gratuita de 20 minutos y te decimos exactamente qué programa es para ti." → "Quiero mi asesoría gratuita".

### Spacing — segunda pasada (LAY)

- [ ] **LAY-02**: Reducir los espacios verticales entre secciones que siguen siendo grandes en home y diplomado (ej. gap entre currículum de 16 semanas y "Cómo funciona"), continuando el ajuste ya hecho en v1.5.

### Bug adicional encontrado (BUG)

- [ ] **BUG-01**: Corregir los avatares rotos de los 3 testimonios destacados del home (Johanna Ramírez, Nataly Domínguez, Marco García) — mismo síntoma que DIPLO-IMG-01, probablemente misma causa raíz.

## Verificación (ya resuelto, sin trabajo nuevo)

- [x] **VERIFY-01**: Hero con copy "La única academia de marketing e IA..." en Montserrat Bold — confirmado en producción 2026-07-22.
- [x] **VERIFY-02**: Botones de Diplomado/Taller/Reto alineados en la misma línea — confirmado en producción 2026-07-22.
- [x] **VERIFY-03**: Sección de precio eliminada del home — confirmado en producción 2026-07-22.
- [x] **VERIFY-04**: Testimonios antes del widget de asesoría — confirmado en producción 2026-07-22.

## Out of Scope (v1.7)

| Feature | Reason |
|---------|--------|
| Fase 29 de v1.6 (FAQs de membresía) | Bloqueada esperando input de Juan sobre el modelo de negocio; se retoma como fase aparte (numeración propia) cuando Juan la desbloquee |
| Checkout real del Taller SEO con IA | Falta URL de pago real; sigue con fallback a aprendoseo.com |
| Página Econía/SEOconía | Diferida, sin fuente de contenido |
| Actualizar fecha "Empieza el 13 de Julio" del Reto | No pedido por Juan en este feedback; posible contenido desactualizado a revisar aparte |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| DIPLO-IMG-01 | Phase 29 | Implemented — visual verification deferred (Vercel quota externa) |
| BUG-01 | Phase 29 | Implemented — visual verification deferred (Vercel quota externa) |
| CARDS-01 | Phase 30 | Pending |
| CARDS-02 | Phase 30 | Pending |
| ADV-05 | Phase 30 | Pending |
| PROG-LINK-01 | Phase 30 | Pending |
| TYPO-01 | Phase 31 | Pending |
| TYPO-02 | Phase 31 | Pending |
| LAY-02 | Phase 31 | Pending |
| DIPLO-IMG-02 | Phase 32 | Pending |
| VERIFY-01 | N/A | Verified (pre-existing) |
| VERIFY-02 | N/A | Verified (pre-existing) |
| VERIFY-03 | N/A | Verified (pre-existing) |
| VERIFY-04 | N/A | Verified (pre-existing) |

---
*Requirements defined: 2026-07-22*
*Last updated: 2026-07-22 — roadmap creado (Phases 29-32), traceability completa*
