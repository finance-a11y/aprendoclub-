# Guía de Importación: Redirects 301 en Cloudflare (aprendoseo.com → aprendoclub.com)

Este documento explica cómo importar la lista de redirecciones 301 generada en la Fase 33 para preservar el tráfico y la autoridad SEO de aprendoseo.com hacia aprendoclub.com.

---

## 1. Qué contiene este archivo

El archivo `redirects-phase33-cloudflare.csv` contiene 81 redirecciones permanentes (código 301) verificadas directamente contra la base de datos en vivo de Payload. Cubre todo el contenido existente que ya está publicado en aprendoclub.com:

- **Artículos de blog:** 64 entradas correspondientes a las categorías actuales (seo-basico, empieza-en-seo, seo-onpage, herramientas-seo y seo-tecnico).
- **Páginas de autor:** Perfiles de Arianna Lupi, Diana Rodríguez y Juan Angulo.
- **Páginas de categoría y listados:** Índices de categorías del blog, listado general (`/blog`) y página de enlaces (`/links`).
- **Programas:** Taller de SEO con IA (`/programas/taller-seo-con-ia`), más las redirecciones preparadas para Reto y Diplomado.
- **Páginas institucionales:** Testimonios (`/testimonios`) y Quiénes somos (`/quienes-somos`).

Todas las filas conservan los parámetros de consulta (`preserve_query_string: true`) para mantener el seguimiento de campañas y parámetros UTM.

---

## 2. Pasos para importar en Cloudflare Bulk Redirects

Para aplicar estas reglas en el dominio de origen (aprendoseo.com):

1. **Acceder a Cloudflare:** Inicia sesión en tu cuenta de Cloudflare y selecciona la zona correspondiente al dominio **aprendoseo.com**.
2. **Abrir Bulk Redirects:** En el menú lateral izquierdo, ve a **Rules** (Reglas) → **Redirect Rules** (Reglas de redirección) → pestaña **Bulk Redirects** (Redirecciones masivas).
3. **Crear o editar una lista de redirecciones:**
   - Haz clic en **Create Bulk Redirect List** (o usa una lista existente si ya la tienes configurada).
   - Asigna un nombre claro a la lista, por ejemplo `migracion-aprendoclub-fase33`.
4. **Cargar el CSV:**
   - Selecciona la opción para subir archivo CSV y elige `.planning/deliverables/v1.8/redirects-phase33-cloudflare.csv`.
   - Verifica que las columnas queden mapeadas de la siguiente manera:
     - `source_url`: URL de origen en aprendoseo.com
     - `target_url`: URL de destino en aprendoclub.com
     - `status_code`: 301
     - `preserve_query_string`: true
5. **Crear y activar la regla:**
   - Regresa a la pestaña **Bulk Redirects** y haz clic en **Create Bulk Redirect Rule**.
   - Asigna un nombre a la regla (por ejemplo, `Regla Migracion AprendoClub`).
   - Selecciona la lista que acabas de subir (`migracion-aprendoclub-fase33`).
   - Guarda y despliega la regla.

---

## 3. Advertencia importante: Dependencia con Phase 34 (Reto y Diplomado)

> **ATENCIÓN REQUERIDA ANTES DE ACTIVAR:**
>
> Las siguientes dos redirecciones apuntan a la estructura definitiva de programas definida para la Phase 34:
> - `https://www.aprendoseo.com/reto` → `https://www.aprendoclub.com/programas/reto`
> - `https://www.aprendoseo.com/diplomado` → `https://www.aprendoclub.com/programas/diplomado`
>
> **No actives estas dos filas en Cloudflare hasta que se despliegue la Phase 34.**  
> En el estado actual del sitio (previo a Phase 34), esas dos páginas aún viven en rutas raíz (`/reto` y `/diplomado`). Si se activan estas dos redirecciones antes del despliegue de Phase 34, los visitantes recibirán un error 404.
>
> **Opciones recomendadas:**
> 1. Pausar o desactivar temporalmente estas dos líneas dentro de la lista de Cloudflare hasta completar el despliegue de la Phase 34.
> 2. O bien, importar la lista completa pero activar la regla en Cloudflare en el mismo momento en que se libere la Phase 34.

---

## 4. Resumen de reconciliación y ajustes realizados

Durante la verificación cruzada entre el Google Sheet de migración y la base de datos de Payload en Neon, se registraron las siguientes particularidades:

1. **Fila de Reto sin URL de origen en el sheet:** La fila 4 del sheet contenía destino `reto` y notas de reubicación, pero la celda `url_origen` estaba en blanco. Por simetría con Diplomado y las decisiones de la fase, se estableció el origen como `https://www.aprendoseo.com/reto` apuntando a `https://www.aprendoclub.com/programas/reto`.
2. **Destino de Diplomado actualizado:** La fila 6 del sheet indicaba el destino simple `diplomado`. Se ajustó a la URL final `https://www.aprendoclub.com/programas/diplomado` para evitar una doble redirección tras Phase 34.
3. **Casos con nota de merge:**
   - `https://www.aprendoseo.com/certificaciones` redirige de forma simple a `https://www.aprendoclub.com/autor/arianna-lupi`.
   - `https://www.aprendoseo.com/academia-seo` redirige de forma simple a `https://www.aprendoclub.com/quienes-somos`.  
   Ambos casos se configuraron como redirecciones 301 limpias sin alterar el contenido de las páginas destino.
4. **Verificación de blog y autores (100% coincidencia):** Los 64 artículos de blog y los 3 autores existentes en el sheet coinciden de forma exacta con los slugs y categorías registrados en la base de datos de Payload. Ningún artículo fue descartado por falta de coincidencia.
5. **Filas excluidas para fases posteriores:** Se excluyeron del CSV las 19 filas con acción "Crear Página nueva y redirigir" (se abordarán en Phases 35 a 38), la fila `/prensa` marcada para eliminación y la página de eventos de ads (`/seo-con-ia/evento`).
