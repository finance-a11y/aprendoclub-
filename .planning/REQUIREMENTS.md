# Requirements: aprendoclub

**Defined:** 2026-07-11
**Core Value:** Convertir visitas en inscripciones a los programas con un sitio rápido, editable sin código y con copy que refleje la voz real de la marca.

## v1.6 Requirements

Rediseño de copy del sitio, basado en auditoría de feedback histórico de Slack (Arianna Lupi, 2026-07-06 y 2026-07-08). El wording exacto de reemplazo se cierra en discuss-phase con Juan (no se inventa libremente) y pasa por la skill humanizer antes de publicarse.

### Copy general

- [x] **COPY-01**: Ningún texto del sitio usa la palabra "real"/"reales" — reescrito con voz humanizada, sin sonar a IA (36 ocurrencias detectadas en `scripts/seed/seed-data/*.ts`)
- [x] **COPY-02**: El sitio des-enfatiza la palabra "SEO" en favor de "marketing/IA/tecnología" — barrido completo (badge home, subtítulo home, título quienes-somos, y demás ocurrencias que aparezcan)

### Home

- [x] **HOME-01**: El subtítulo/meta de home ya no dice "academia de SEO" ni "acompañamiento real"
- [x] **HOME-02**: La cifra de estudiantes en home se actualiza (de "+500 estudiantes ya aprenden SEO con IA" a la cifra nueva que confirme Juan; incluye decidir si `ratingTexto` "4.9/5 de +500 estudiantes" también cambia)

### Equipo

- [ ] **TEAM-01**: El team grid de /quienes-somos muestra a Dana Aliaga en vez de Diana Rodríguez

### Testimonios

- [ ] **TESTIM-01**: Se elimina la sección de logos de empresas confiadas ("trusted companies") de /testimonios

### Programas

- [ ] **BRAND-01**: El diplomado se renombra de "Diplomado de Cero a SEO" a "Diplomado de SEO + AIO" en todas sus ocurrencias (diplomado.ts, testimonios.ts, y demás)

### FAQs

- [ ] **FAQ-01**: Las FAQs restantes en `faqs.ts` se revisan y actualizan al modelo de membresía (ya existe 1 pregunta de membresía; falta el resto)

## Out of Scope

| Feature | Reason |
|---------|--------|
| Checkout real del Taller SEO con IA | Falta URL de pago real; queda con fallback a aprendoseo.com hasta que Juan la aporte |
| Página Econía/SEOconía | Diferida, sin fuente de contenido |
| Embeds de YouTube en /testimonios | Ya implementado en v1.5 (`youtubeTestimonials` block) |
| Botones en la misma línea | Ya resuelto en v1.5 (Phases 20/25) |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| COPY-01 | Phase 26 | Complete |
| COPY-02 | Phase 26 | Complete |
| HOME-01 | Phase 26 | Complete |
| HOME-02 | Phase 26 | Complete |
| TEAM-01 | Phase 27 | Pending |
| TESTIM-01 | Phase 27 | Pending |
| BRAND-01 | Phase 28 | Pending |
| FAQ-01 | Phase 29 | Pending |

**Coverage:**

- v1.6 requirements: 8 total
- Mapped to phases: 8
- Unmapped: 0 ✓

---
*Requirements defined: 2026-07-11*
*Last updated: 2026-07-11*
