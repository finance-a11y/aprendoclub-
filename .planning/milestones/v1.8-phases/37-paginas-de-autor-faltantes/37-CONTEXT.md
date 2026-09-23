# Context: Phase 37 — Páginas de autor faltantes

## Situación Actual y Antecedentes
En `aprendoseo.com`, existían 5 autores en Webflow:
- Arianna Lupi (`/autor/arianna-lupi`)
- Diana Rodriguez (`/autor/diana-rodriguez`)
- Juan Angulo (`/autor/juan-angulo`)
- Ibraim Zayed (`/autor/ibraim-zayed`)
- Verónica Romero (`/autor/veronica-romero`)

En `aprendoclub`:
- La colección `authors` de Payload CMS contiene únicamente a 3 autores: Arianna Lupi, Diana Rodríguez y Juan Carlos Angulo.
- Ibraim Zayed y Verónica Romero ya existen como registros en la colección `team-members` (con roles, bios y fotos subidas en `media`: `ibraim.avif` id 9 y `veronica.avif` id 11), pero no estaban creados en la colección `authors`.
- La ruta catch-all `app/(frontend)/(site)/[...slug]/page.tsx` maneja automáticamente `/autor/{slug}` mediante `findAuthorBySlug(payload, slugParts[1])` y renderiza el componente `AuthorView` con schema JSON-LD `Person`, bio, rol, avatar y post grid. Si el autor no tiene artículos asociados, `PostGrid` muestra limpiamente *"Todavía no hay artículos por aquí"*.

## Requisitos de la Fase
- **AUTHOR-01**: Crear en Payload CMS (`authors`) las páginas de autor de Ibraim Zayed y Verónica Romero siguiendo el mismo patrón visual y de campos que Arianna, Diana y Juan (nombre, slug, rol, bio, foto/avatar).
- **AUTHOR-02**: Añadir las redirecciones 301 para `/autor/ibraim-zayed` y `/autor/veronica-romero` de `aprendoseo.com` a los archivos CSV de Cloudflare Bulk Redirects.

## Decisiones Técnicas
1. **Datos de los Autores**:
   - **Ibraim Zayed**:
     - `name`: "Ibraim Zayed"
     - `slug`: "ibraim-zayed"
     - `role`: "SEO Coach y Community Builder"
     - `bio`: "Coach de SEO y creador de comunidad. Ha trabajado con 6 clientes en Estados Unidos y en dos agencias. Diseña estrategias para posicionar marcas en buscadores y redes."
     - `avatar`: Media ID 9 (`ibraim.avif`)
   - **Verónica Romero**:
     - `name`: "Verónica Romero"
     - `slug`: "veronica-romero"
     - `role`: "SEO Manager"
     - `bio`: "Content Manager con amplia experiencia en crecimiento orgánico. Ha trabajado con clientes como AMBL, Storybook y Papora con resultados destacados."
     - `avatar`: Media ID 11 (`veronica.avif`)
2. **Idempotencia y Revalidación**:
   - Script `aprendoclub/scripts/seed-autores-faltantes.ts` utilizando la Local API de Payload con `context: { disableRevalidate: true }` y upsert por `slug`.
3. **Cloudflare Bulk Redirects**:
   - Agregar las filas de redirección 301 hacia `https://www.aprendoclub.com/autor/ibraim-zayed` y `https://www.aprendoclub.com/autor/veronica-romero` en los CSVs de deliverables.
