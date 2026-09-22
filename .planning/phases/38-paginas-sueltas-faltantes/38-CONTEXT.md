# Context: Phase 38 — Páginas sueltas faltantes

## Situación Actual y Antecedentes
En el inventario de migración de `aprendoseo.com` a `aprendoclub.com` (`33-SHEET-DATA.md`), restan varias URLs sueltas, legales y de contenido accesorio:
- Contacto: `https://www.aprendoseo.com/contacto`
- Glosario: `https://www.aprendoseo.com/glosario`
- Políticas Legales:
  - `https://www.aprendoseo.com/politica-privacidad`
  - `https://www.aprendoseo.com/politica-reembolso`
  - `https://www.aprendoseo.com/aviso-legal`
  - `https://www.aprendoseo.com/terminos-condiciones`
- Guía de principiantes: `https://www.aprendoseo.com/recursos/guia-seo-para-principiantes/`
- Landing de ads para eventos: `https://www.aprendoseo.com/seo-con-ia/evento`
- Prensa: `https://www.aprendoseo.com/prensa` (marcada como "eliminar sin valor")

## Requisitos de la Fase
- **MISC-01**: Crear o localizar en aprendoclub las páginas de contacto, glosario, política de privacidad, política de reembolso, aviso legal y términos y condiciones, con redirect 301 desde sus URLs de aprendoseo.com.
- **MISC-02**: Confirmar y redirigir `/seo-con-ia/evento` a la página correspondiente en aprendoclub (`/programas/taller-seo-con-ia`).
- **MISC-03**: Descartar `/prensa` de aprendoseo.com sin redirect (no se incluye en Cloudflare).

## Decisiones Técnicas
1. **Modelado en Payload CMS (Pages)**:
   - Crear 6 documentos en la colección `pages` con sus slugs correspondientes:
     - `contacto`
     - `glosario`
     - `politica-privacidad`
     - `politica-reembolso`
     - `aviso-legal`
     - `terminos-condiciones`
   - Usar la estructura de bloques de alta calidad existente (`hero`, `sectionHeader`, `featureGrid`, `ctaBanner`) para garantizar una experiencia visual profesional, completamente mobile-friendly y con animación.
2. **Destino de Recursos**:
   - `/recursos/guia-seo-para-principiantes/` redirige 301 a `/programas/curso-basico-de-seo` (el curso gratuito para principiantes).
   - `/seo-con-ia/evento` redirige 301 a `/programas/taller-seo-con-ia` (su oferta directa equivalente).
3. **Cloudflare Bulk Redirects**:
   - Agregar las filas de redirección 301 para contacto, glosario, las 4 páginas legales, la guía de principiantes y el evento en los 3 CSVs de Cloudflare.
   - Excluir explícitamente `/prensa`.
4. **Next.js Config**:
   - Añadir redirecciones internas preventivas para `/seo-con-ia/evento` y `/recursos/guia-seo-para-principiantes`.
