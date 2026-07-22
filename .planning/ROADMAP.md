# Roadmap: aprendoclub

## Milestones

- ✅ **v1.0 Web lista para Google Ads** - Shipped 2026-07-04
- ✅ **v1.1 Refrescamiento UI/UX** - Shipped 2026-07-04
- ✅ **v1.2 Motion design + polish** - Phases 10-12, Shipped 2026-07-04
- ✅ **v1.3 Payload CMS — todo editable** - Phases 13-18, Shipped 2026-07-05
- ✅ **v1.5 Refresh de home + widget de asesoría** - Phases 20-25, Shipped 2026-07-11
- ⏸️ **v1.6 Rediseño de copy** - Phases 26-28 shipped 2026-07-11; Fase 29 (FAQs de membresía) bloqueada esperando input de Juan, nunca planificada
- 🚧 **v1.7 Feedback visual home + programas** - Phases 29-32 (planning)

**Nota de numeración:** la Fase 29 original de v1.6 (FAQs de membresía) quedó bloqueada antes de que `/gsd-plan-phase` corriera sobre ella — su directorio nunca existió. Por eso este milestone reutiliza el número 29 como primera fase de v1.7. Cuando Juan desbloquee las FAQs de membresía, esa fase se retomará con numeración propia más adelante (después de la 32).

## Phases

<details>
<summary>✅ v1.0–v1.5 (Phases 1-25) - SHIPPED</summary>

Fases previas ejecutadas vía `/gsd-autonomous`; detalle completo en `.planning/MILESTONES.md`. `.planning/` no se usó de forma completa en estos milestones (planes/estado no persistidos fase por fase), por lo que no se reconstruyen aquí retroactivamente.

- v1.0: Shell (site), páginas core, contenido migrado de aprendoseo.com
- v1.1: Design system unificado, contraste/accesibilidad/motion
- v1.2 (Phases 10-12): Auditoría de motion, optimización de imágenes AVIF/WebP
- v1.3 (Phases 13-18): Migración a Payload CMS 3, blog migrado (64 posts)
- v1.5 (Phases 20-25): Refresh de home, widget de asesoría WhatsApp, motion + spacing

</details>

<details>
<summary>⏸️ v1.6 Rediseño de copy (Phases 26-28 shipped, Fase 29 bloqueada)</summary>

**Milestone Goal:** El copy del sitio refleja la voz real de la marca (evita "real", de-enfatiza "SEO", cifras/equipo/nombres actualizados) sin sonar a IA, y las FAQs reflejan el modelo de membresía vigente.

- [x] Phase 26: Copy general + Home - Barrido de "real" y de-énfasis de "SEO" en todo el sitio; subtítulo y cifra de estudiantes actualizados en home (completed 2026-07-11)
- [x] Phase 27: Equipo y testimonios - Dana Aliaga reemplaza a Diana Rodríguez en el team grid; se elimina la sección de logos de empresas confiadas en /testimonios (completed 2026-07-11)
- [x] Phase 28: Rebranding del diplomado - El diplomado pasa de "Diplomado de Cero a SEO" a "Diplomado de SEO + AIO" en todas sus ocurrencias (completed 2026-07-11)
- [ ] ~~Phase 29: FAQs de membresía~~ - Bloqueada esperando input de Juan sobre el modelo de negocio viejo→membresía; nunca se planificó ni ejecutó. Se retomará como fase nueva (numeración propia, posterior a la 32) cuando Juan la desbloquee.

Detalle completo de Phases 26-28 archivado en `.planning/milestones/v1.6-phases/`.

</details>

### 🚧 v1.7 Feedback visual home + programas (Planning)

**Milestone Goal:** Aplicar el feedback visual/copy recibido de Arianna sobre el home y las páginas de programas (diplomado/taller/reto): tipografía y motion, cards de "problema" con copy e íconos nuevos, imágenes reales en diplomado, links de programas a páginas estables, refinamiento del widget de asesoría, y reducir espaciados — corrigiendo en el camino un bug real de imágenes rotas en producción.

**Nota de alcance:** 4 puntos del feedback de Arianna ya están verificados en producción y no generan fases nuevas: hero con copy "La única academia de marketing e IA..." en Montserrat Bold (VERIFY-01), botones de programas alineados en una línea (VERIFY-02), sección de precio eliminada del home (VERIFY-03), y testimonios ubicados antes del widget de asesoría (VERIFY-04). Durante la verificación se encontró además un bug no reportado por Arianna — imágenes rotas en la galería del Diplomado, fotos del equipo y avatares de testimonios destacados — que probablemente explica parte del feedback ("¿podemos agregar imágenes?" cuando ya existen mas nunca cargaron). Se prioriza como Phase 29, antes de cualquier trabajo visual nuevo.

- [ ] **Phase 29: Imágenes rotas de Diplomado y testimonios** - Fix de galería, fotos de equipo y avatares rotos en producción (bug real, prioridad alta)
- [ ] **Phase 30: Cards de problema, asesoría y link del Taller** - Copy definitivo + íconos 3D en cards de problema, refinamiento de copy del widget de asesoría, CTA temporal del Taller
- [ ] **Phase 31: Tipografía, motion y spacing (segunda pasada)** - Montserrat Bold consistente, motion más notorio, spacing ajustado en home/diplomado
- [ ] **Phase 32: Galería del Diplomado rediseñada** - Cards de foto + texto superpuesto, estilo landing anterior (depende de Phase 29 y de fotos reales de Juan)

## Phase Details

### Phase 29: Imágenes rotas de Diplomado y testimonios
**Goal**: Las imágenes de la galería del Diplomado, las fotos del equipo y los avatares de los testimonios destacados del home cargan correctamente en producción, sin roturas.
**Depends on**: Nothing (primera fase de v1.7; bug fix real de producción, se prioriza antes que el resto del trabajo visual)
**Requirements**: DIPLO-IMG-01, BUG-01
**Success Criteria** (what must be TRUE):
  1. La galería del Diplomado (bloque `diplomadoGaleria`) muestra sus imágenes cargadas (`naturalWidth > 0`) en `/diplomado` en producción.
  2. Las fotos del equipo (`teamGridRef`) en `/diplomado` cargan sin roturas.
  3. Los avatares de los 3 testimonios destacados del home (Johanna Ramírez, Nataly Domínguez, Marco García) cargan sin roturas.
  4. La causa raíz del bug (paths, build, o dominio de imágenes) queda identificada y documentada, para prevenir que reaparezca en otras páginas con el mismo patrón de imagen.
**Plans**: TBD
**UI hint**: yes

### Phase 30: Cards de problema, asesoría y link del Taller
**Goal**: El home comunica el copy definitivo de Juan en las cards de "problema" (con íconos ilustrados 3D) y en el widget de asesoría, y el CTA del Taller no dirige a una página en construcción mientras se termina.
**Depends on**: Nothing (independiente de Phase 29 en el código que toca; se numera después por prioridad del bug de producción)
**Requirements**: CARDS-01, CARDS-02, ADV-05, PROG-LINK-01
**Success Criteria** (what must be TRUE):
  1. Las 4 cards de "problema" del home muestran el copy definitivo de Juan (Sabes de todo.../Aprendes de contenido desactualizado.../Llevas meses preparándote.../La IA te está dejando atrás).
  2. Cada card de problema muestra un ícono ilustrado 3D de 3dicons.co (`iconMode: image`) en vez del ícono lineal lucide anterior.
  3. El widget de asesoría gratuita muestra el eyebrow/título/subtítulo y los 9 bullets actualizados, con el CTA "Quiero mi asesoría gratuita".
  4. El CTA del Taller en la card de "Nuestros programas" del home enlaza a `https://www.aprendoclub.com/evento` (Reto y Diplomado siguen apuntando a sus páginas estables, sin cambios).
**Plans**: TBD
**UI hint**: yes

### Phase 31: Tipografía, motion y spacing (segunda pasada)
**Goal**: Home, Diplomado, Taller y Reto se sienten más pulidos visualmente: encabezados en Montserrat Bold de forma consistente, motion más notorio que en v1.5, y spacing reducido donde todavía se siente excesivo.
**Depends on**: Nothing (independiente de Phases 29-30; toca tipografía/motion/spacing de forma transversal)
**Requirements**: TYPO-01, TYPO-02, LAY-02
**Success Criteria** (what must be TRUE):
  1. Los headings principales de home, diplomado, taller y reto usan Montserrat Bold de forma consistente, sin romper el contrato tipográfico de pesos (regular/medium/semibold) ya existente en el resto del sitio.
  2. Las secciones clave del home y de las páginas de programas muestran transiciones/efectos de motion perceptiblemente más notorios que en la pasada de v1.5, respetando `prefers-reduced-motion`.
  3. El espacio vertical entre el currículum de 16 semanas y "Cómo funciona" (y otros gaps grandes similares en home/diplomado) se percibe reducido respecto al estado actual.
**Plans**: TBD
**UI hint**: yes

### Phase 32: Galería del Diplomado rediseñada
**Goal**: La sección de galería del Diplomado se rediseña como cards de foto con texto superpuesto, al estilo de la landing anterior del diplomado.
**Depends on**: Phase 29 (las imágenes de la galería deben cargar correctamente en producción antes de rediseñar su presentación)
**Requirements**: DIPLO-IMG-02
**Success Criteria** (what must be TRUE):
  1. La galería del Diplomado muestra cards de foto de fondo + texto superpuesto (ya no el grid simple anterior).
  2. Los 6 textos de referencia (Diplomado 16 semanas, 3 sesiones en vivo/semana, Coachs solo para ti, Invitados especiales, Cursos cortos y actualizaciones, Comunidad activa 24/7) aparecen distribuidos en las cards correspondientes.
  3. Mientras Juan no aporte las fotos reales, las cards muestran placeholders coherentes con el dark theme y specs de formato (tamaño, aspecto, peso) documentadas en `admin.description`, siguiendo el mismo patrón ya usado en Phase 24 (v1.5, IMG-01).

**Riesgo/dependencia explícita**: esta fase depende de que Juan aporte fotos reales del diplomado. Sin ellas, el rediseño se completa igual mecánicamente (layout, textos superpuestos) pero se ejecuta sobre placeholders — el mismo patrón que ya funcionó en Phase 24.
**Plans**: TBD
**UI hint**: yes

## Progress

**Execution Order:**
Phases execute in numeric order: 29 → 30 → 31 → 32

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|-----------------|--------|-----------|
| 26. Copy general + Home | v1.6 | 4/4 | Complete | 2026-07-11 |
| 27. Equipo y testimonios | v1.6 | 1/1 | Complete | 2026-07-11 |
| 28. Rebranding del diplomado | v1.6 | 2/2 | Complete | 2026-07-11 |
| 29. Imágenes rotas de Diplomado y testimonios | v1.7 | 1/1 | Implemented — verification deferred (Vercel quota) | 2026-07-22 |
| 30. Cards de problema, asesoría y link del Taller | v1.7 | 1/1 | Code complete — seed pending (Neon down) | 2026-07-22 |
| 31. Tipografía, motion y spacing | v1.7 | 1/1 | Implemented — visual QA deferred (Neon down) | 2026-07-22 |
| 32. Galería del Diplomado rediseñada | v1.7 | 0/TBD | Not started | - |

---
*Roadmap created: 2026-07-22 for milestone v1.7*
