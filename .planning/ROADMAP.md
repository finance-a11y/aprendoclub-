# Roadmap: aprendoclub

## Milestones

- ✅ **v1.0 Web lista para Google Ads** - Shipped 2026-07-04
- ✅ **v1.1 Refrescamiento UI/UX** - Shipped 2026-07-04
- ✅ **v1.2 Motion design + polish** - Phases 10-12, Shipped 2026-07-04
- ✅ **v1.3 Payload CMS — todo editable** - Phases 13-18, Shipped 2026-07-05
- ✅ **v1.5 Refresh de home + widget de asesoría** - Phases 20-25, Shipped 2026-07-11
- 🚧 **v1.6 Rediseño de copy** - Phases 26-29 (planning)

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

### 🚧 v1.6 Rediseño de copy (Planning)

**Milestone Goal:** El copy del sitio refleja la voz real de la marca (evita "real", de-enfatiza "SEO", cifras/equipo/nombres actualizados) sin sonar a IA, y las FAQs reflejan el modelo de membresía vigente.

**Nota de alcance:** Sin fase de research (milestone es reescritura de copy sobre features existentes, no funcionalidad nueva). El wording exacto de reemplazo para COPY-01, COPY-02, HOME-01, HOME-02 y FAQ-01 se confirma con Juan en `discuss-phase` de cada fase — el roadmap solo delimita el alcance, no inventa el texto final. BRAND-01 ("Diplomado de SEO + AIO") y TEAM-01 (Dana Aliaga) ya tienen wording confirmado.

**Nota técnica:** Todos los cambios de copy son ediciones de contenido en `scripts/seed/seed-data/*.ts` (seed data de Payload), no en `content/*.ts` (eliminado en v1.3). Los cambios requieren correr el script de seed o editar vía Payload admin para reflejarse en la base de datos y en el sitio en vivo.

- [x] **Phase 26: Copy general + Home** - Barrido de "real" y de-énfasis de "SEO" en todo el sitio; subtítulo y cifra de estudiantes actualizados en home (completed 2026-07-11)
- [ ] **Phase 27: Equipo y testimonios** - Dana Aliaga reemplaza a Diana Rodríguez en el team grid; se elimina la sección de logos de empresas confiadas en /testimonios
- [ ] **Phase 28: Rebranding del diplomado** - El diplomado pasa de "Diplomado de Cero a SEO" a "Diplomado de SEO + AIO" en todas sus ocurrencias
- [ ] **Phase 29: FAQs de membresía** - Las FAQs restantes en faqs.ts se actualizan al modelo de membresía vigente

## Phase Details

### Phase 26: Copy general + Home

**Goal**: El copy general del sitio deja de usar "real"/"reales" y de-enfatiza la palabra "SEO" en favor de "marketing/IA/tecnología"; el home refleja subtítulo y cifra de estudiantes actualizados.
**Depends on**: Nothing (primera fase del milestone; no depende de fases previas de otros milestones, sitio ya en producción)
**Requirements**: COPY-01, COPY-02, HOME-01, HOME-02
**Success Criteria** (what must be TRUE):

  1. `grep -ri "\breal(es)?\b"` sobre `scripts/seed/seed-data/*.ts` no devuelve coincidencias fuera de nombres propios o URLs (las 36 ocurrencias detectadas quedan reescritas con voz humanizada)
  2. El subtítulo/meta del home ya no contiene "academia de SEO" ni "acompañamiento real"
  3. La cifra de estudiantes en el home (badge, subtítulo, `ratingTexto`) refleja el valor nuevo confirmado por Juan, de forma consistente en todas sus apariciones
  4. El badge y subtítulo de home y el título de quienes-somos de-enfatizan "SEO" en favor de "marketing/IA/tecnología" (barrido no se limita a esas ubicaciones si aparecen más instancias)

**Plans**: 4 plans (3 en Wave 1 paralelos + 1 en Wave 2 de re-seed)

Plans:

- [x] 26-01-PLAN.md — Home: barrido "real", de-enfasis SEO en badge/subtitulo, cifra a +10.000 (COPY-01/02, HOME-01/02)
- [x] 26-02-PLAN.md — Diplomado: 12 reescrituras de "real"/"reales" (COPY-01)
- [x] 26-03-PLAN.md — Copy disperso + globals: quienes-somos titulo/reales, faqs/testimonios/reto, meta description (COPY-01/02)
- [x] 26-04-PLAN.md — Gate de verificacion global + re-seed a la DB

### Phase 27: Equipo y testimonios

**Goal**: El equipo mostrado en quienes-somos y la sección de testimonios reflejan el estado actual del negocio.
**Depends on**: Phase 26 (mismo lote de archivos seed-data; se ejecuta después para evitar conflictos de edición concurrente)
**Requirements**: TEAM-01, TESTIM-01
**Success Criteria** (what must be TRUE):

  1. El team grid en /quienes-somos muestra a "Dana Aliaga" y "Diana Rodríguez" ya no aparece en ningún lugar del sitio
  2. La sección de logos de empresas confiadas ("trusted companies") ya no se renderiza en /testimonios

**Plans**: 1 plan (Wave 1, 3 tasks: TEAM-01, TESTIM-01, re-seed + gate)

Plans:

- [ ] 27-01-PLAN.md — Diana→Dana (datos/orden/reconciliación collections) + quitar logosRef de /testimonios + re-seed a Neon (TEAM-01, TESTIM-01)

### Phase 28: Rebranding del diplomado

**Goal**: El diplomado se presenta de forma consistente bajo su nuevo nombre en todas las páginas y datos donde aparece.
**Depends on**: Phase 26 (evita pisar el barrido general de "real"/"SEO" sobre los mismos archivos)
**Requirements**: BRAND-01
**Success Criteria** (what must be TRUE):

  1. `grep -r "Diplomado de Cero a SEO"` sobre `scripts/seed/seed-data/*.ts` no devuelve coincidencias
  2. Todas las ocurrencias del nombre del diplomado (diplomado.ts, testimonios.ts, y demás archivos donde aparezca) muestran "Diplomado de SEO + AIO"
  3. La página /diplomado en vivo (post-seed) muestra el nuevo nombre en título, hero y cualquier mención cruzada

**Plans**: TBD

Plans:

- [ ] 28-01: TBD (definido en plan-phase)

### Phase 29: FAQs de membresía

**Goal**: Las FAQs del sitio reflejan el modelo de membresía vigente, sin preguntas obsoletas del modelo anterior.
**Depends on**: Nothing adicional (archivo independiente `faqs.ts`; puede ejecutarse en paralelo conceptual a fases 27-28, pero se numera al final por orden de confirmación con Juan)
**Requirements**: FAQ-01
**Success Criteria** (what must be TRUE):

  1. Cada FAQ en `faqs.ts` que describía el modelo de negocio anterior (no-membresía) queda reescrita o reemplazada para reflejar el modelo de membresía
  2. Las FAQs publicadas en el sitio (post-seed) son consistentes entre sí y con la pregunta de membresía ya existente

**Plans**: TBD

Plans:

- [ ] 29-01: TBD (definido en plan-phase)

## Progress

**Execution Order:**
Phases execute in numeric order: 26 → 27 → 28 → 29

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|-----------------|--------|-----------|
| 26. Copy general + Home | v1.6 | 4/4 | Complete   | 2026-07-11 |
| 27. Equipo y testimonios | v1.6 | 0/1 | Not started | - |
| 28. Rebranding del diplomado | v1.6 | 0/TBD | Not started | - |
| 29. FAQs de membresía | v1.6 | 0/TBD | Not started | - |

---
*Roadmap created: 2026-07-11 for milestone v1.6*
