import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_hero_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge_text" varchar,
  	"eyebrow" varchar,
  	"titulo_pre" varchar,
  	"titulo_accent" varchar,
  	"titulo_post" varchar,
  	"subtitulo" varchar,
  	"texto" varchar,
  	"imagen_id" integer,
  	"cta_primario_label" varchar NOT NULL,
  	"cta_primario_href" varchar NOT NULL,
  	"cta_secundario_label" varchar NOT NULL,
  	"cta_secundario_href" varchar NOT NULL,
  	"microcopy" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_pricing_planes_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_pricing_planes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"nombre" varchar NOT NULL,
  	"badge" varchar,
  	"precio" varchar NOT NULL,
  	"precio_tachado" varchar,
  	"precio_nota" varchar,
  	"cuotas_texto" varchar,
  	"cta_label" varchar NOT NULL,
  	"cta_href" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_pricing" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"titulo" varchar NOT NULL,
  	"subtitulo" varchar,
  	"cta_asesoria_titulo" varchar,
  	"cta_asesoria_texto" varchar,
  	"cta_asesoria_cta_label" varchar NOT NULL,
  	"cta_asesoria_cta_href" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_banner_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cta_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titulo" varchar NOT NULL,
  	"texto" varchar,
  	"boton_label" varchar NOT NULL,
  	"boton_href" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_feature_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"titulo" varchar NOT NULL,
  	"descripcion" varchar
  );
  
  CREATE TABLE "pages_blocks_feature_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"titulo" varchar NOT NULL,
  	"subtitulo" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_prose" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"contenido" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_ref" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"titulo" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonial_ref" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"titulo" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_team_grid_ref" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"titulo" varchar,
  	"subtitulo" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_program_grid_ref" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"titulo" varchar NOT NULL,
  	"subtitulo" varchar,
  	"boton_label" varchar NOT NULL,
  	"boton_href" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_logos_ref" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texto" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_section_header" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"titulo" varchar NOT NULL,
  	"subtitulo" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_related_links_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_related_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_hero_home_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hero_home" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge_text" varchar,
  	"eyebrow" varchar,
  	"titulo_pre" varchar,
  	"titulo_accent" varchar,
  	"titulo_post" varchar,
  	"subtitulo" varchar,
  	"texto" varchar,
  	"imagen_id" integer,
  	"cta_primario_label" varchar NOT NULL,
  	"cta_primario_href" varchar NOT NULL,
  	"cta_secundario_label" varchar NOT NULL,
  	"cta_secundario_href" varchar NOT NULL,
  	"microcopy" varchar,
  	"rating_texto" varchar,
  	"video_background_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_instructor_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_instructor" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar NOT NULL,
  	"nombre" varchar NOT NULL,
  	"rol" varchar NOT NULL,
  	"bio_corta1" varchar NOT NULL,
  	"bio_corta2" varchar NOT NULL,
  	"foto_id" integer,
  	"teaser_label" varchar NOT NULL,
  	"teaser_href" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_sticky_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"boton_label" varchar NOT NULL,
  	"boton_href" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_historia_parrafos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texto" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_historia" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar NOT NULL,
  	"titulo" varchar NOT NULL,
  	"quote_texto" varchar NOT NULL,
  	"quote_autor" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_fundadora_bio" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texto" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_fundadora" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar NOT NULL,
  	"nombre" varchar NOT NULL,
  	"rol" varchar NOT NULL,
  	"foto_id" integer NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_metodologia_pilares" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"nombre" varchar NOT NULL,
  	"descripcion" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_metodologia" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar NOT NULL,
  	"titulo" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_reto_galeria" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar NOT NULL,
  	"titulo" varchar NOT NULL,
  	"texto" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_taller_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar NOT NULL,
  	"titulo" varchar NOT NULL,
  	"subtitulo" varchar NOT NULL,
  	"duracion" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_taller_incluye_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texto" varchar NOT NULL,
  	"valor" varchar
  );
  
  CREATE TABLE "pages_blocks_taller_incluye" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_taller_para_quien" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texto" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_taller_pricing_opciones" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texto" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_taller_pricing" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"monto" varchar NOT NULL,
  	"cta_label" varchar NOT NULL,
  	"cta_href" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_audience_perfiles" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_audience_dudas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_audience" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titulo" varchar NOT NULL,
  	"subtitulo" varchar,
  	"titulo_perfiles" varchar,
  	"titulo_dudas" varchar,
  	"nota_final" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_curriculum16_semanas_semanas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"numero" numeric NOT NULL,
  	"titulo" varchar NOT NULL,
  	"detalle" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_curriculum16_semanas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"titulo" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_how_it_works_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"titulo" varchar NOT NULL,
  	"descripcion" varchar
  );
  
  CREATE TABLE "pages_blocks_how_it_works" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"titulo" varchar NOT NULL,
  	"subtitulo" varchar,
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_diplomado_team_mentor_section_bio" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texto" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_diplomado_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"team_intro_eyebrow" varchar,
  	"team_intro_titulo" varchar NOT NULL,
  	"team_intro_subtitulo" varchar,
  	"equipo_eyebrow" varchar,
  	"equipo_titulo" varchar,
  	"equipo_subtitulo" varchar,
  	"mentor_section_titulo" varchar NOT NULL,
  	"mentor_section_nombre" varchar NOT NULL,
  	"mentor_section_web" varchar,
  	"mentor_section_quote" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_diplomado_benefits_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texto" varchar NOT NULL,
  	"valor" varchar
  );
  
  CREATE TABLE "pages_blocks_diplomado_benefits_extras" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_diplomado_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"titulo" varchar NOT NULL,
  	"subtitulo" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_diplomado_pricing_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_diplomado_pricing" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titulo" varchar NOT NULL,
  	"subtitulo" varchar,
  	"plan_nombre" varchar NOT NULL,
  	"badge_text" varchar,
  	"precio" varchar NOT NULL,
  	"precio_tachado" varchar,
  	"precio_nota" varchar,
  	"descripcion" varchar,
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"garantia_texto" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_barra_urgencia" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texto" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_reto_hero_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_reto_hero_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_reto_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar NOT NULL,
  	"titulo" varchar NOT NULL,
  	"destacado" varchar NOT NULL,
  	"texto" varchar NOT NULL,
  	"precio_texto" varchar NOT NULL,
  	"imagen_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_razon_no_escalas_frases" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_razon_no_escalas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titulo" varchar NOT NULL,
  	"parrafo" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_mentora_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"valor" varchar NOT NULL,
  	"etiqueta" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_mentora" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"nombre" varchar NOT NULL,
  	"rol" varchar NOT NULL,
  	"historia" varchar NOT NULL,
  	"quote" varchar NOT NULL,
  	"cierre" varchar NOT NULL,
  	"foto_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_agenda_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"dia" varchar NOT NULL,
  	"titulo" varchar NOT NULL,
  	"descripcion" varchar NOT NULL,
  	"imagen_id" integer
  );
  
  CREATE TABLE "pages_blocks_agenda" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_comparacion_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"de_siempre" varchar NOT NULL,
  	"el_reto" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_comparacion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_incluye_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_incluye" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_premios" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"mayor_titulo" varchar NOT NULL,
  	"mayor_imagen_id" integer,
  	"becas_titulo" varchar NOT NULL,
  	"becas_imagen_id" integer,
  	"como_se_gana" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_reto_pricing_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_reto_pricing" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"precio" varchar NOT NULL,
  	"precio_nota" varchar NOT NULL,
  	"incluye_texto" varchar NOT NULL,
  	"nota" varchar NOT NULL,
  	"whatsapp" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_ganadores_ganadores" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"nombre" varchar NOT NULL,
  	"edicion" varchar NOT NULL,
  	"imagen_id" integer
  );
  
  CREATE TABLE "pages_blocks_ganadores" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"ganadores_intro" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"faq_id" integer,
  	"testimonios_id" integer,
  	"team_members_id" integer,
  	"programas_id" integer,
  	"clientes_trabajados_id" integer,
  	"media_id" integer
  );
  
  ALTER TABLE "programas_hub_related_links_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "programas_hub" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "programas_hub_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "taller_seo_con_ia_incluye" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "taller_seo_con_ia_precio_opciones" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "taller_seo_con_ia" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "quienes_somos_historia_parrafos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "quienes_somos_fundadora_bio" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "quienes_somos_metodologia_pilares" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "quienes_somos_stats_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "quienes_somos_cta_final_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "quienes_somos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "quienes_somos_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "testimonios_page_cta_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "testimonios_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "testimonios_page_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "reto_hero_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "reto_hero_ctas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "reto_razon_no_escalas_frases" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "reto_mentora_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "reto_agenda" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "reto_comparacion" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "reto_incluye" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "reto_pricing_ctas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "reto_ganadores" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "reto" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "reto_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_hero_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_problema_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_beneficios_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_pricing_planes_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_pricing_planes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_instructor_stats_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_cta_final_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "diplomado_hero_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "diplomado_origin_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "diplomado_audience_perfiles" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "diplomado_audience_dudas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "diplomado_methodology_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "diplomado_curriculum_semanas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "diplomado_how_it_works_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "diplomado_team_mentor_section_bio" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "diplomado_benefits_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "diplomado_benefits_extras" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "diplomado_pricing_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "diplomado_cta_final_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "diplomado_related_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "diplomado" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "diplomado_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "programas_hub_related_links_links" CASCADE;
  DROP TABLE "programas_hub" CASCADE;
  DROP TABLE "programas_hub_rels" CASCADE;
  DROP TABLE "taller_seo_con_ia_incluye" CASCADE;
  DROP TABLE "taller_seo_con_ia_precio_opciones" CASCADE;
  DROP TABLE "taller_seo_con_ia" CASCADE;
  DROP TABLE "quienes_somos_historia_parrafos" CASCADE;
  DROP TABLE "quienes_somos_fundadora_bio" CASCADE;
  DROP TABLE "quienes_somos_metodologia_pilares" CASCADE;
  DROP TABLE "quienes_somos_stats_items" CASCADE;
  DROP TABLE "quienes_somos_cta_final_bullets" CASCADE;
  DROP TABLE "quienes_somos" CASCADE;
  DROP TABLE "quienes_somos_rels" CASCADE;
  DROP TABLE "testimonios_page_cta_bullets" CASCADE;
  DROP TABLE "testimonios_page" CASCADE;
  DROP TABLE "testimonios_page_rels" CASCADE;
  DROP TABLE "reto_hero_bullets" CASCADE;
  DROP TABLE "reto_hero_ctas" CASCADE;
  DROP TABLE "reto_razon_no_escalas_frases" CASCADE;
  DROP TABLE "reto_mentora_stats" CASCADE;
  DROP TABLE "reto_agenda" CASCADE;
  DROP TABLE "reto_comparacion" CASCADE;
  DROP TABLE "reto_incluye" CASCADE;
  DROP TABLE "reto_pricing_ctas" CASCADE;
  DROP TABLE "reto_ganadores" CASCADE;
  DROP TABLE "reto" CASCADE;
  DROP TABLE "reto_rels" CASCADE;
  DROP TABLE "home_hero_bullets" CASCADE;
  DROP TABLE "home_problema_items" CASCADE;
  DROP TABLE "home_beneficios_items" CASCADE;
  DROP TABLE "home_pricing_planes_features" CASCADE;
  DROP TABLE "home_pricing_planes" CASCADE;
  DROP TABLE "home_instructor_stats_items" CASCADE;
  DROP TABLE "home_cta_final_bullets" CASCADE;
  DROP TABLE "home" CASCADE;
  DROP TABLE "home_rels" CASCADE;
  DROP TABLE "diplomado_hero_bullets" CASCADE;
  DROP TABLE "diplomado_origin_items" CASCADE;
  DROP TABLE "diplomado_audience_perfiles" CASCADE;
  DROP TABLE "diplomado_audience_dudas" CASCADE;
  DROP TABLE "diplomado_methodology_items" CASCADE;
  DROP TABLE "diplomado_curriculum_semanas" CASCADE;
  DROP TABLE "diplomado_how_it_works_items" CASCADE;
  DROP TABLE "diplomado_team_mentor_section_bio" CASCADE;
  DROP TABLE "diplomado_benefits_items" CASCADE;
  DROP TABLE "diplomado_benefits_extras" CASCADE;
  DROP TABLE "diplomado_pricing_features" CASCADE;
  DROP TABLE "diplomado_cta_final_bullets" CASCADE;
  DROP TABLE "diplomado_related_links" CASCADE;
  DROP TABLE "diplomado" CASCADE;
  DROP TABLE "diplomado_rels" CASCADE;
  ALTER TABLE "redirects_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "pages_blocks_hero_bullets" ADD CONSTRAINT "pages_blocks_hero_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_imagen_id_media_id_fk" FOREIGN KEY ("imagen_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_planes_features" ADD CONSTRAINT "pages_blocks_pricing_planes_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_planes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_planes" ADD CONSTRAINT "pages_blocks_pricing_planes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing" ADD CONSTRAINT "pages_blocks_pricing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_banner_bullets" ADD CONSTRAINT "pages_blocks_cta_banner_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta_banner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_banner" ADD CONSTRAINT "pages_blocks_cta_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_grid_items" ADD CONSTRAINT "pages_blocks_feature_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_grid" ADD CONSTRAINT "pages_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_items" ADD CONSTRAINT "pages_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats" ADD CONSTRAINT "pages_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_prose" ADD CONSTRAINT "pages_blocks_prose_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_ref" ADD CONSTRAINT "pages_blocks_faq_ref_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonial_ref" ADD CONSTRAINT "pages_blocks_testimonial_ref_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_grid_ref" ADD CONSTRAINT "pages_blocks_team_grid_ref_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_program_grid_ref" ADD CONSTRAINT "pages_blocks_program_grid_ref_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_logos_ref" ADD CONSTRAINT "pages_blocks_logos_ref_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_section_header" ADD CONSTRAINT "pages_blocks_section_header_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_related_links_links" ADD CONSTRAINT "pages_blocks_related_links_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_related_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_related_links" ADD CONSTRAINT "pages_blocks_related_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_home_bullets" ADD CONSTRAINT "pages_blocks_hero_home_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero_home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_home" ADD CONSTRAINT "pages_blocks_hero_home_imagen_id_media_id_fk" FOREIGN KEY ("imagen_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_home" ADD CONSTRAINT "pages_blocks_hero_home_video_background_id_media_id_fk" FOREIGN KEY ("video_background_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_home" ADD CONSTRAINT "pages_blocks_hero_home_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_instructor_stats_items" ADD CONSTRAINT "pages_blocks_instructor_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_instructor"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_instructor" ADD CONSTRAINT "pages_blocks_instructor_foto_id_media_id_fk" FOREIGN KEY ("foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_instructor" ADD CONSTRAINT "pages_blocks_instructor_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_sticky_cta" ADD CONSTRAINT "pages_blocks_sticky_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_historia_parrafos" ADD CONSTRAINT "pages_blocks_historia_parrafos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_historia"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_historia" ADD CONSTRAINT "pages_blocks_historia_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_fundadora_bio" ADD CONSTRAINT "pages_blocks_fundadora_bio_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_fundadora"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_fundadora" ADD CONSTRAINT "pages_blocks_fundadora_foto_id_media_id_fk" FOREIGN KEY ("foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_fundadora" ADD CONSTRAINT "pages_blocks_fundadora_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_metodologia_pilares" ADD CONSTRAINT "pages_blocks_metodologia_pilares_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_metodologia"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_metodologia" ADD CONSTRAINT "pages_blocks_metodologia_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_reto_galeria" ADD CONSTRAINT "pages_blocks_reto_galeria_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_taller_hero" ADD CONSTRAINT "pages_blocks_taller_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_taller_incluye_items" ADD CONSTRAINT "pages_blocks_taller_incluye_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_taller_incluye"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_taller_incluye" ADD CONSTRAINT "pages_blocks_taller_incluye_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_taller_para_quien" ADD CONSTRAINT "pages_blocks_taller_para_quien_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_taller_pricing_opciones" ADD CONSTRAINT "pages_blocks_taller_pricing_opciones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_taller_pricing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_taller_pricing" ADD CONSTRAINT "pages_blocks_taller_pricing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_audience_perfiles" ADD CONSTRAINT "pages_blocks_audience_perfiles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_audience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_audience_dudas" ADD CONSTRAINT "pages_blocks_audience_dudas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_audience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_audience" ADD CONSTRAINT "pages_blocks_audience_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_curriculum16_semanas_semanas" ADD CONSTRAINT "pages_blocks_curriculum16_semanas_semanas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_curriculum16_semanas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_curriculum16_semanas" ADD CONSTRAINT "pages_blocks_curriculum16_semanas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_how_it_works_items" ADD CONSTRAINT "pages_blocks_how_it_works_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_how_it_works"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_how_it_works" ADD CONSTRAINT "pages_blocks_how_it_works_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_diplomado_team_mentor_section_bio" ADD CONSTRAINT "pages_blocks_diplomado_team_mentor_section_bio_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_diplomado_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_diplomado_team" ADD CONSTRAINT "pages_blocks_diplomado_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_diplomado_benefits_items" ADD CONSTRAINT "pages_blocks_diplomado_benefits_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_diplomado_benefits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_diplomado_benefits_extras" ADD CONSTRAINT "pages_blocks_diplomado_benefits_extras_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_diplomado_benefits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_diplomado_benefits" ADD CONSTRAINT "pages_blocks_diplomado_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_diplomado_pricing_features" ADD CONSTRAINT "pages_blocks_diplomado_pricing_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_diplomado_pricing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_diplomado_pricing" ADD CONSTRAINT "pages_blocks_diplomado_pricing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_barra_urgencia" ADD CONSTRAINT "pages_blocks_barra_urgencia_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_reto_hero_bullets" ADD CONSTRAINT "pages_blocks_reto_hero_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_reto_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_reto_hero_ctas" ADD CONSTRAINT "pages_blocks_reto_hero_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_reto_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_reto_hero" ADD CONSTRAINT "pages_blocks_reto_hero_imagen_id_media_id_fk" FOREIGN KEY ("imagen_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_reto_hero" ADD CONSTRAINT "pages_blocks_reto_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_razon_no_escalas_frases" ADD CONSTRAINT "pages_blocks_razon_no_escalas_frases_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_razon_no_escalas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_razon_no_escalas" ADD CONSTRAINT "pages_blocks_razon_no_escalas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_mentora_stats" ADD CONSTRAINT "pages_blocks_mentora_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_mentora"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_mentora" ADD CONSTRAINT "pages_blocks_mentora_foto_id_media_id_fk" FOREIGN KEY ("foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_mentora" ADD CONSTRAINT "pages_blocks_mentora_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_agenda_items" ADD CONSTRAINT "pages_blocks_agenda_items_imagen_id_media_id_fk" FOREIGN KEY ("imagen_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_agenda_items" ADD CONSTRAINT "pages_blocks_agenda_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_agenda"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_agenda" ADD CONSTRAINT "pages_blocks_agenda_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_comparacion_items" ADD CONSTRAINT "pages_blocks_comparacion_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_comparacion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_comparacion" ADD CONSTRAINT "pages_blocks_comparacion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_incluye_items" ADD CONSTRAINT "pages_blocks_incluye_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_incluye"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_incluye" ADD CONSTRAINT "pages_blocks_incluye_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_premios" ADD CONSTRAINT "pages_blocks_premios_mayor_imagen_id_media_id_fk" FOREIGN KEY ("mayor_imagen_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_premios" ADD CONSTRAINT "pages_blocks_premios_becas_imagen_id_media_id_fk" FOREIGN KEY ("becas_imagen_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_premios" ADD CONSTRAINT "pages_blocks_premios_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_reto_pricing_ctas" ADD CONSTRAINT "pages_blocks_reto_pricing_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_reto_pricing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_reto_pricing" ADD CONSTRAINT "pages_blocks_reto_pricing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ganadores_ganadores" ADD CONSTRAINT "pages_blocks_ganadores_ganadores_imagen_id_media_id_fk" FOREIGN KEY ("imagen_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_ganadores_ganadores" ADD CONSTRAINT "pages_blocks_ganadores_ganadores_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_ganadores"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ganadores" ADD CONSTRAINT "pages_blocks_ganadores_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_faq_fk" FOREIGN KEY ("faq_id") REFERENCES "public"."faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_testimonios_fk" FOREIGN KEY ("testimonios_id") REFERENCES "public"."testimonios"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_programas_fk" FOREIGN KEY ("programas_id") REFERENCES "public"."programas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_clientes_trabajados_fk" FOREIGN KEY ("clientes_trabajados_id") REFERENCES "public"."clientes_trabajados"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_bullets_order_idx" ON "pages_blocks_hero_bullets" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_bullets_parent_id_idx" ON "pages_blocks_hero_bullets" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_imagen_idx" ON "pages_blocks_hero" USING btree ("imagen_id");
  CREATE INDEX "pages_blocks_pricing_planes_features_order_idx" ON "pages_blocks_pricing_planes_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_planes_features_parent_id_idx" ON "pages_blocks_pricing_planes_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_planes_order_idx" ON "pages_blocks_pricing_planes" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_planes_parent_id_idx" ON "pages_blocks_pricing_planes" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_order_idx" ON "pages_blocks_pricing" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_parent_id_idx" ON "pages_blocks_pricing" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_path_idx" ON "pages_blocks_pricing" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_banner_bullets_order_idx" ON "pages_blocks_cta_banner_bullets" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_banner_bullets_parent_id_idx" ON "pages_blocks_cta_banner_bullets" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_banner_order_idx" ON "pages_blocks_cta_banner" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_banner_parent_id_idx" ON "pages_blocks_cta_banner" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_banner_path_idx" ON "pages_blocks_cta_banner" USING btree ("_path");
  CREATE INDEX "pages_blocks_feature_grid_items_order_idx" ON "pages_blocks_feature_grid_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_grid_items_parent_id_idx" ON "pages_blocks_feature_grid_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_grid_order_idx" ON "pages_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_grid_parent_id_idx" ON "pages_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_grid_path_idx" ON "pages_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_stats_items_order_idx" ON "pages_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_items_parent_id_idx" ON "pages_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_order_idx" ON "pages_blocks_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_parent_id_idx" ON "pages_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_path_idx" ON "pages_blocks_stats" USING btree ("_path");
  CREATE INDEX "pages_blocks_prose_order_idx" ON "pages_blocks_prose" USING btree ("_order");
  CREATE INDEX "pages_blocks_prose_parent_id_idx" ON "pages_blocks_prose" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_prose_path_idx" ON "pages_blocks_prose" USING btree ("_path");
  CREATE INDEX "pages_blocks_faq_ref_order_idx" ON "pages_blocks_faq_ref" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_ref_parent_id_idx" ON "pages_blocks_faq_ref" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_ref_path_idx" ON "pages_blocks_faq_ref" USING btree ("_path");
  CREATE INDEX "pages_blocks_testimonial_ref_order_idx" ON "pages_blocks_testimonial_ref" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonial_ref_parent_id_idx" ON "pages_blocks_testimonial_ref" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonial_ref_path_idx" ON "pages_blocks_testimonial_ref" USING btree ("_path");
  CREATE INDEX "pages_blocks_team_grid_ref_order_idx" ON "pages_blocks_team_grid_ref" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_grid_ref_parent_id_idx" ON "pages_blocks_team_grid_ref" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_grid_ref_path_idx" ON "pages_blocks_team_grid_ref" USING btree ("_path");
  CREATE INDEX "pages_blocks_program_grid_ref_order_idx" ON "pages_blocks_program_grid_ref" USING btree ("_order");
  CREATE INDEX "pages_blocks_program_grid_ref_parent_id_idx" ON "pages_blocks_program_grid_ref" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_program_grid_ref_path_idx" ON "pages_blocks_program_grid_ref" USING btree ("_path");
  CREATE INDEX "pages_blocks_logos_ref_order_idx" ON "pages_blocks_logos_ref" USING btree ("_order");
  CREATE INDEX "pages_blocks_logos_ref_parent_id_idx" ON "pages_blocks_logos_ref" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_logos_ref_path_idx" ON "pages_blocks_logos_ref" USING btree ("_path");
  CREATE INDEX "pages_blocks_section_header_order_idx" ON "pages_blocks_section_header" USING btree ("_order");
  CREATE INDEX "pages_blocks_section_header_parent_id_idx" ON "pages_blocks_section_header" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_section_header_path_idx" ON "pages_blocks_section_header" USING btree ("_path");
  CREATE INDEX "pages_blocks_related_links_links_order_idx" ON "pages_blocks_related_links_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_related_links_links_parent_id_idx" ON "pages_blocks_related_links_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_related_links_order_idx" ON "pages_blocks_related_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_related_links_parent_id_idx" ON "pages_blocks_related_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_related_links_path_idx" ON "pages_blocks_related_links" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_home_bullets_order_idx" ON "pages_blocks_hero_home_bullets" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_home_bullets_parent_id_idx" ON "pages_blocks_hero_home_bullets" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_home_order_idx" ON "pages_blocks_hero_home" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_home_parent_id_idx" ON "pages_blocks_hero_home" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_home_path_idx" ON "pages_blocks_hero_home" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_home_imagen_idx" ON "pages_blocks_hero_home" USING btree ("imagen_id");
  CREATE INDEX "pages_blocks_hero_home_video_background_idx" ON "pages_blocks_hero_home" USING btree ("video_background_id");
  CREATE INDEX "pages_blocks_instructor_stats_items_order_idx" ON "pages_blocks_instructor_stats_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_instructor_stats_items_parent_id_idx" ON "pages_blocks_instructor_stats_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_instructor_order_idx" ON "pages_blocks_instructor" USING btree ("_order");
  CREATE INDEX "pages_blocks_instructor_parent_id_idx" ON "pages_blocks_instructor" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_instructor_path_idx" ON "pages_blocks_instructor" USING btree ("_path");
  CREATE INDEX "pages_blocks_instructor_foto_idx" ON "pages_blocks_instructor" USING btree ("foto_id");
  CREATE INDEX "pages_blocks_sticky_cta_order_idx" ON "pages_blocks_sticky_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_sticky_cta_parent_id_idx" ON "pages_blocks_sticky_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_sticky_cta_path_idx" ON "pages_blocks_sticky_cta" USING btree ("_path");
  CREATE INDEX "pages_blocks_historia_parrafos_order_idx" ON "pages_blocks_historia_parrafos" USING btree ("_order");
  CREATE INDEX "pages_blocks_historia_parrafos_parent_id_idx" ON "pages_blocks_historia_parrafos" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_historia_order_idx" ON "pages_blocks_historia" USING btree ("_order");
  CREATE INDEX "pages_blocks_historia_parent_id_idx" ON "pages_blocks_historia" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_historia_path_idx" ON "pages_blocks_historia" USING btree ("_path");
  CREATE INDEX "pages_blocks_fundadora_bio_order_idx" ON "pages_blocks_fundadora_bio" USING btree ("_order");
  CREATE INDEX "pages_blocks_fundadora_bio_parent_id_idx" ON "pages_blocks_fundadora_bio" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_fundadora_order_idx" ON "pages_blocks_fundadora" USING btree ("_order");
  CREATE INDEX "pages_blocks_fundadora_parent_id_idx" ON "pages_blocks_fundadora" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_fundadora_path_idx" ON "pages_blocks_fundadora" USING btree ("_path");
  CREATE INDEX "pages_blocks_fundadora_foto_idx" ON "pages_blocks_fundadora" USING btree ("foto_id");
  CREATE INDEX "pages_blocks_metodologia_pilares_order_idx" ON "pages_blocks_metodologia_pilares" USING btree ("_order");
  CREATE INDEX "pages_blocks_metodologia_pilares_parent_id_idx" ON "pages_blocks_metodologia_pilares" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_metodologia_order_idx" ON "pages_blocks_metodologia" USING btree ("_order");
  CREATE INDEX "pages_blocks_metodologia_parent_id_idx" ON "pages_blocks_metodologia" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_metodologia_path_idx" ON "pages_blocks_metodologia" USING btree ("_path");
  CREATE INDEX "pages_blocks_reto_galeria_order_idx" ON "pages_blocks_reto_galeria" USING btree ("_order");
  CREATE INDEX "pages_blocks_reto_galeria_parent_id_idx" ON "pages_blocks_reto_galeria" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_reto_galeria_path_idx" ON "pages_blocks_reto_galeria" USING btree ("_path");
  CREATE INDEX "pages_blocks_taller_hero_order_idx" ON "pages_blocks_taller_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_taller_hero_parent_id_idx" ON "pages_blocks_taller_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_taller_hero_path_idx" ON "pages_blocks_taller_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_taller_incluye_items_order_idx" ON "pages_blocks_taller_incluye_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_taller_incluye_items_parent_id_idx" ON "pages_blocks_taller_incluye_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_taller_incluye_order_idx" ON "pages_blocks_taller_incluye" USING btree ("_order");
  CREATE INDEX "pages_blocks_taller_incluye_parent_id_idx" ON "pages_blocks_taller_incluye" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_taller_incluye_path_idx" ON "pages_blocks_taller_incluye" USING btree ("_path");
  CREATE INDEX "pages_blocks_taller_para_quien_order_idx" ON "pages_blocks_taller_para_quien" USING btree ("_order");
  CREATE INDEX "pages_blocks_taller_para_quien_parent_id_idx" ON "pages_blocks_taller_para_quien" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_taller_para_quien_path_idx" ON "pages_blocks_taller_para_quien" USING btree ("_path");
  CREATE INDEX "pages_blocks_taller_pricing_opciones_order_idx" ON "pages_blocks_taller_pricing_opciones" USING btree ("_order");
  CREATE INDEX "pages_blocks_taller_pricing_opciones_parent_id_idx" ON "pages_blocks_taller_pricing_opciones" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_taller_pricing_order_idx" ON "pages_blocks_taller_pricing" USING btree ("_order");
  CREATE INDEX "pages_blocks_taller_pricing_parent_id_idx" ON "pages_blocks_taller_pricing" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_taller_pricing_path_idx" ON "pages_blocks_taller_pricing" USING btree ("_path");
  CREATE INDEX "pages_blocks_audience_perfiles_order_idx" ON "pages_blocks_audience_perfiles" USING btree ("_order");
  CREATE INDEX "pages_blocks_audience_perfiles_parent_id_idx" ON "pages_blocks_audience_perfiles" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_audience_dudas_order_idx" ON "pages_blocks_audience_dudas" USING btree ("_order");
  CREATE INDEX "pages_blocks_audience_dudas_parent_id_idx" ON "pages_blocks_audience_dudas" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_audience_order_idx" ON "pages_blocks_audience" USING btree ("_order");
  CREATE INDEX "pages_blocks_audience_parent_id_idx" ON "pages_blocks_audience" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_audience_path_idx" ON "pages_blocks_audience" USING btree ("_path");
  CREATE INDEX "pages_blocks_curriculum16_semanas_semanas_order_idx" ON "pages_blocks_curriculum16_semanas_semanas" USING btree ("_order");
  CREATE INDEX "pages_blocks_curriculum16_semanas_semanas_parent_id_idx" ON "pages_blocks_curriculum16_semanas_semanas" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_curriculum16_semanas_order_idx" ON "pages_blocks_curriculum16_semanas" USING btree ("_order");
  CREATE INDEX "pages_blocks_curriculum16_semanas_parent_id_idx" ON "pages_blocks_curriculum16_semanas" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_curriculum16_semanas_path_idx" ON "pages_blocks_curriculum16_semanas" USING btree ("_path");
  CREATE INDEX "pages_blocks_how_it_works_items_order_idx" ON "pages_blocks_how_it_works_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_how_it_works_items_parent_id_idx" ON "pages_blocks_how_it_works_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_how_it_works_order_idx" ON "pages_blocks_how_it_works" USING btree ("_order");
  CREATE INDEX "pages_blocks_how_it_works_parent_id_idx" ON "pages_blocks_how_it_works" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_how_it_works_path_idx" ON "pages_blocks_how_it_works" USING btree ("_path");
  CREATE INDEX "pages_blocks_diplomado_team_mentor_section_bio_order_idx" ON "pages_blocks_diplomado_team_mentor_section_bio" USING btree ("_order");
  CREATE INDEX "pages_blocks_diplomado_team_mentor_section_bio_parent_id_idx" ON "pages_blocks_diplomado_team_mentor_section_bio" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_diplomado_team_order_idx" ON "pages_blocks_diplomado_team" USING btree ("_order");
  CREATE INDEX "pages_blocks_diplomado_team_parent_id_idx" ON "pages_blocks_diplomado_team" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_diplomado_team_path_idx" ON "pages_blocks_diplomado_team" USING btree ("_path");
  CREATE INDEX "pages_blocks_diplomado_benefits_items_order_idx" ON "pages_blocks_diplomado_benefits_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_diplomado_benefits_items_parent_id_idx" ON "pages_blocks_diplomado_benefits_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_diplomado_benefits_extras_order_idx" ON "pages_blocks_diplomado_benefits_extras" USING btree ("_order");
  CREATE INDEX "pages_blocks_diplomado_benefits_extras_parent_id_idx" ON "pages_blocks_diplomado_benefits_extras" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_diplomado_benefits_order_idx" ON "pages_blocks_diplomado_benefits" USING btree ("_order");
  CREATE INDEX "pages_blocks_diplomado_benefits_parent_id_idx" ON "pages_blocks_diplomado_benefits" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_diplomado_benefits_path_idx" ON "pages_blocks_diplomado_benefits" USING btree ("_path");
  CREATE INDEX "pages_blocks_diplomado_pricing_features_order_idx" ON "pages_blocks_diplomado_pricing_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_diplomado_pricing_features_parent_id_idx" ON "pages_blocks_diplomado_pricing_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_diplomado_pricing_order_idx" ON "pages_blocks_diplomado_pricing" USING btree ("_order");
  CREATE INDEX "pages_blocks_diplomado_pricing_parent_id_idx" ON "pages_blocks_diplomado_pricing" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_diplomado_pricing_path_idx" ON "pages_blocks_diplomado_pricing" USING btree ("_path");
  CREATE INDEX "pages_blocks_barra_urgencia_order_idx" ON "pages_blocks_barra_urgencia" USING btree ("_order");
  CREATE INDEX "pages_blocks_barra_urgencia_parent_id_idx" ON "pages_blocks_barra_urgencia" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_barra_urgencia_path_idx" ON "pages_blocks_barra_urgencia" USING btree ("_path");
  CREATE INDEX "pages_blocks_reto_hero_bullets_order_idx" ON "pages_blocks_reto_hero_bullets" USING btree ("_order");
  CREATE INDEX "pages_blocks_reto_hero_bullets_parent_id_idx" ON "pages_blocks_reto_hero_bullets" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_reto_hero_ctas_order_idx" ON "pages_blocks_reto_hero_ctas" USING btree ("_order");
  CREATE INDEX "pages_blocks_reto_hero_ctas_parent_id_idx" ON "pages_blocks_reto_hero_ctas" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_reto_hero_order_idx" ON "pages_blocks_reto_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_reto_hero_parent_id_idx" ON "pages_blocks_reto_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_reto_hero_path_idx" ON "pages_blocks_reto_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_reto_hero_imagen_idx" ON "pages_blocks_reto_hero" USING btree ("imagen_id");
  CREATE INDEX "pages_blocks_razon_no_escalas_frases_order_idx" ON "pages_blocks_razon_no_escalas_frases" USING btree ("_order");
  CREATE INDEX "pages_blocks_razon_no_escalas_frases_parent_id_idx" ON "pages_blocks_razon_no_escalas_frases" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_razon_no_escalas_order_idx" ON "pages_blocks_razon_no_escalas" USING btree ("_order");
  CREATE INDEX "pages_blocks_razon_no_escalas_parent_id_idx" ON "pages_blocks_razon_no_escalas" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_razon_no_escalas_path_idx" ON "pages_blocks_razon_no_escalas" USING btree ("_path");
  CREATE INDEX "pages_blocks_mentora_stats_order_idx" ON "pages_blocks_mentora_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_mentora_stats_parent_id_idx" ON "pages_blocks_mentora_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_mentora_order_idx" ON "pages_blocks_mentora" USING btree ("_order");
  CREATE INDEX "pages_blocks_mentora_parent_id_idx" ON "pages_blocks_mentora" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_mentora_path_idx" ON "pages_blocks_mentora" USING btree ("_path");
  CREATE INDEX "pages_blocks_mentora_foto_idx" ON "pages_blocks_mentora" USING btree ("foto_id");
  CREATE INDEX "pages_blocks_agenda_items_order_idx" ON "pages_blocks_agenda_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_agenda_items_parent_id_idx" ON "pages_blocks_agenda_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_agenda_items_imagen_idx" ON "pages_blocks_agenda_items" USING btree ("imagen_id");
  CREATE INDEX "pages_blocks_agenda_order_idx" ON "pages_blocks_agenda" USING btree ("_order");
  CREATE INDEX "pages_blocks_agenda_parent_id_idx" ON "pages_blocks_agenda" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_agenda_path_idx" ON "pages_blocks_agenda" USING btree ("_path");
  CREATE INDEX "pages_blocks_comparacion_items_order_idx" ON "pages_blocks_comparacion_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_comparacion_items_parent_id_idx" ON "pages_blocks_comparacion_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_comparacion_order_idx" ON "pages_blocks_comparacion" USING btree ("_order");
  CREATE INDEX "pages_blocks_comparacion_parent_id_idx" ON "pages_blocks_comparacion" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_comparacion_path_idx" ON "pages_blocks_comparacion" USING btree ("_path");
  CREATE INDEX "pages_blocks_incluye_items_order_idx" ON "pages_blocks_incluye_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_incluye_items_parent_id_idx" ON "pages_blocks_incluye_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_incluye_order_idx" ON "pages_blocks_incluye" USING btree ("_order");
  CREATE INDEX "pages_blocks_incluye_parent_id_idx" ON "pages_blocks_incluye" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_incluye_path_idx" ON "pages_blocks_incluye" USING btree ("_path");
  CREATE INDEX "pages_blocks_premios_order_idx" ON "pages_blocks_premios" USING btree ("_order");
  CREATE INDEX "pages_blocks_premios_parent_id_idx" ON "pages_blocks_premios" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_premios_path_idx" ON "pages_blocks_premios" USING btree ("_path");
  CREATE INDEX "pages_blocks_premios_mayor_mayor_imagen_idx" ON "pages_blocks_premios" USING btree ("mayor_imagen_id");
  CREATE INDEX "pages_blocks_premios_becas_becas_imagen_idx" ON "pages_blocks_premios" USING btree ("becas_imagen_id");
  CREATE INDEX "pages_blocks_reto_pricing_ctas_order_idx" ON "pages_blocks_reto_pricing_ctas" USING btree ("_order");
  CREATE INDEX "pages_blocks_reto_pricing_ctas_parent_id_idx" ON "pages_blocks_reto_pricing_ctas" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_reto_pricing_order_idx" ON "pages_blocks_reto_pricing" USING btree ("_order");
  CREATE INDEX "pages_blocks_reto_pricing_parent_id_idx" ON "pages_blocks_reto_pricing" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_reto_pricing_path_idx" ON "pages_blocks_reto_pricing" USING btree ("_path");
  CREATE INDEX "pages_blocks_ganadores_ganadores_order_idx" ON "pages_blocks_ganadores_ganadores" USING btree ("_order");
  CREATE INDEX "pages_blocks_ganadores_ganadores_parent_id_idx" ON "pages_blocks_ganadores_ganadores" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_ganadores_ganadores_imagen_idx" ON "pages_blocks_ganadores_ganadores" USING btree ("imagen_id");
  CREATE INDEX "pages_blocks_ganadores_order_idx" ON "pages_blocks_ganadores" USING btree ("_order");
  CREATE INDEX "pages_blocks_ganadores_parent_id_idx" ON "pages_blocks_ganadores" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_ganadores_path_idx" ON "pages_blocks_ganadores" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages" USING btree ("meta_image_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_faq_id_idx" ON "pages_rels" USING btree ("faq_id");
  CREATE INDEX "pages_rels_testimonios_id_idx" ON "pages_rels" USING btree ("testimonios_id");
  CREATE INDEX "pages_rels_team_members_id_idx" ON "pages_rels" USING btree ("team_members_id");
  CREATE INDEX "pages_rels_programas_id_idx" ON "pages_rels" USING btree ("programas_id");
  CREATE INDEX "pages_rels_clientes_trabajados_id_idx" ON "pages_rels" USING btree ("clientes_trabajados_id");
  CREATE INDEX "pages_rels_media_id_idx" ON "pages_rels" USING btree ("media_id");
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "redirects_rels_pages_id_idx" ON "redirects_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "programas_hub_related_links_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "programas_hub" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar,
  	"hero_titulo" varchar NOT NULL,
  	"hero_subtitulo" varchar,
  	"cta_final_titulo" varchar NOT NULL,
  	"cta_final_texto" varchar NOT NULL,
  	"cta_final_boton_label" varchar NOT NULL,
  	"cta_final_boton_href" varchar NOT NULL,
  	"related_links_title" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "programas_hub_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"programas_id" integer
  );
  
  CREATE TABLE "taller_seo_con_ia_incluye" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texto" varchar NOT NULL,
  	"valor" varchar
  );
  
  CREATE TABLE "taller_seo_con_ia_precio_opciones" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texto" varchar NOT NULL
  );
  
  CREATE TABLE "taller_seo_con_ia" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar NOT NULL,
  	"hero_titulo" varchar NOT NULL,
  	"hero_subtitulo" varchar NOT NULL,
  	"hero_duracion" varchar NOT NULL,
  	"para_quien" varchar NOT NULL,
  	"precio_monto" varchar NOT NULL,
  	"cta_label" varchar NOT NULL,
  	"cta_href" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "quienes_somos_historia_parrafos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texto" varchar NOT NULL
  );
  
  CREATE TABLE "quienes_somos_fundadora_bio" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texto" varchar NOT NULL
  );
  
  CREATE TABLE "quienes_somos_metodologia_pilares" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"nombre" varchar NOT NULL,
  	"descripcion" varchar NOT NULL
  );
  
  CREATE TABLE "quienes_somos_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "quienes_somos_cta_final_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "quienes_somos" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar,
  	"hero_titulo" varchar NOT NULL,
  	"hero_subtitulo" varchar,
  	"historia_eyebrow" varchar NOT NULL,
  	"historia_titulo" varchar NOT NULL,
  	"historia_quote_texto" varchar NOT NULL,
  	"historia_quote_autor" varchar NOT NULL,
  	"fundadora_eyebrow" varchar NOT NULL,
  	"fundadora_nombre" varchar NOT NULL,
  	"fundadora_rol" varchar NOT NULL,
  	"fundadora_foto_id" integer NOT NULL,
  	"equipo_eyebrow" varchar,
  	"equipo_titulo" varchar,
  	"equipo_subtitulo" varchar,
  	"metodologia_eyebrow" varchar NOT NULL,
  	"metodologia_titulo" varchar NOT NULL,
  	"cta_final_titulo" varchar NOT NULL,
  	"cta_final_texto" varchar,
  	"cta_final_boton_label" varchar NOT NULL,
  	"cta_final_boton_href" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "quienes_somos_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"team_members_id" integer
  );
  
  CREATE TABLE "testimonios_page_cta_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "testimonios_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar,
  	"hero_titulo" varchar NOT NULL,
  	"hero_subtitulo" varchar,
  	"grid_titulo" varchar NOT NULL,
  	"logos_texto" varchar,
  	"reto_eyebrow" varchar NOT NULL,
  	"reto_titulo" varchar NOT NULL,
  	"reto_texto" varchar NOT NULL,
  	"cta_titulo" varchar NOT NULL,
  	"cta_texto" varchar,
  	"cta_boton_label" varchar NOT NULL,
  	"cta_boton_href" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "testimonios_page_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"clientes_trabajados_id" integer,
  	"media_id" integer
  );
  
  CREATE TABLE "reto_hero_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "reto_hero_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "reto_razon_no_escalas_frases" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "reto_mentora_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"valor" varchar NOT NULL,
  	"etiqueta" varchar NOT NULL
  );
  
  CREATE TABLE "reto_agenda" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"dia" varchar NOT NULL,
  	"titulo" varchar NOT NULL,
  	"descripcion" varchar NOT NULL,
  	"imagen_id" integer
  );
  
  CREATE TABLE "reto_comparacion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"de_siempre" varchar NOT NULL,
  	"el_reto" varchar NOT NULL
  );
  
  CREATE TABLE "reto_incluye" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "reto_pricing_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "reto_ganadores" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"nombre" varchar NOT NULL,
  	"edicion" varchar NOT NULL,
  	"imagen_id" integer
  );
  
  CREATE TABLE "reto" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"urgencia" varchar NOT NULL,
  	"hero_eyebrow" varchar NOT NULL,
  	"hero_titulo" varchar NOT NULL,
  	"hero_destacado" varchar NOT NULL,
  	"hero_texto" varchar NOT NULL,
  	"hero_precio_texto" varchar NOT NULL,
  	"hero_imagen_id" integer,
  	"razon_no_escalas_titulo" varchar NOT NULL,
  	"razon_no_escalas_parrafo" varchar NOT NULL,
  	"mentora_nombre" varchar NOT NULL,
  	"mentora_rol" varchar NOT NULL,
  	"mentora_historia" varchar NOT NULL,
  	"mentora_quote" varchar NOT NULL,
  	"mentora_cierre" varchar NOT NULL,
  	"mentora_foto_id" integer,
  	"premios_mayor_titulo" varchar NOT NULL,
  	"premios_mayor_imagen_id" integer,
  	"premios_becas_titulo" varchar NOT NULL,
  	"premios_becas_imagen_id" integer,
  	"premios_como_se_gana" varchar NOT NULL,
  	"pricing_precio" varchar NOT NULL,
  	"pricing_precio_nota" varchar NOT NULL,
  	"pricing_incluye_texto" varchar NOT NULL,
  	"pricing_nota" varchar NOT NULL,
  	"pricing_whatsapp" varchar NOT NULL,
  	"ganadores_intro" varchar NOT NULL,
  	"cta_final_titulo" varchar NOT NULL,
  	"cta_final_boton_label" varchar NOT NULL,
  	"cta_final_boton_href" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "reto_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"faq_id" integer
  );
  
  CREATE TABLE "home_hero_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "home_problema_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"titulo" varchar NOT NULL,
  	"descripcion" varchar
  );
  
  CREATE TABLE "home_beneficios_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"titulo" varchar NOT NULL,
  	"descripcion" varchar
  );
  
  CREATE TABLE "home_pricing_planes_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "home_pricing_planes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"nombre" varchar NOT NULL,
  	"badge" varchar,
  	"precio" varchar NOT NULL,
  	"precio_tachado" varchar,
  	"precio_nota" varchar,
  	"cuotas_texto" varchar,
  	"cta_label" varchar NOT NULL,
  	"cta_href" varchar NOT NULL
  );
  
  CREATE TABLE "home_instructor_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "home_cta_final_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "home" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_badge_text" varchar,
  	"hero_eyebrow" varchar,
  	"hero_titulo_pre" varchar,
  	"hero_titulo_accent" varchar,
  	"hero_titulo_post" varchar,
  	"hero_subtitulo" varchar,
  	"hero_texto" varchar,
  	"hero_imagen_id" integer,
  	"hero_cta_primario_label" varchar NOT NULL,
  	"hero_cta_primario_href" varchar NOT NULL,
  	"hero_cta_secundario_label" varchar NOT NULL,
  	"hero_cta_secundario_href" varchar NOT NULL,
  	"hero_microcopy" varchar,
  	"hero_rating_texto" varchar,
  	"hero_video_background_id" integer,
  	"problema_eyebrow" varchar,
  	"problema_titulo" varchar NOT NULL,
  	"problema_subtitulo" varchar,
  	"beneficios_eyebrow" varchar,
  	"beneficios_titulo" varchar NOT NULL,
  	"beneficios_subtitulo" varchar,
  	"programas_eyebrow" varchar,
  	"programas_titulo" varchar NOT NULL,
  	"programas_subtitulo" varchar,
  	"programas_boton_label" varchar NOT NULL,
  	"programas_boton_href" varchar NOT NULL,
  	"pricing_eyebrow" varchar,
  	"pricing_titulo" varchar NOT NULL,
  	"pricing_subtitulo" varchar,
  	"pricing_cta_asesoria_titulo" varchar,
  	"pricing_cta_asesoria_texto" varchar,
  	"pricing_cta_asesoria_cta_label" varchar NOT NULL,
  	"pricing_cta_asesoria_cta_href" varchar NOT NULL,
  	"instructor_eyebrow" varchar NOT NULL,
  	"instructor_nombre" varchar NOT NULL,
  	"instructor_rol" varchar NOT NULL,
  	"instructor_bio_corta1" varchar NOT NULL,
  	"instructor_bio_corta2" varchar NOT NULL,
  	"instructor_foto_id" integer,
  	"instructor_teaser_label" varchar NOT NULL,
  	"instructor_teaser_href" varchar NOT NULL,
  	"testimonios_eyebrow" varchar,
  	"testimonios_titulo" varchar,
  	"logos_texto" varchar,
  	"faq_eyebrow" varchar,
  	"faq_titulo" varchar,
  	"cta_final_titulo" varchar NOT NULL,
  	"cta_final_texto" varchar,
  	"cta_final_boton_label" varchar NOT NULL,
  	"cta_final_boton_href" varchar NOT NULL,
  	"sticky_cta_boton_label" varchar NOT NULL,
  	"sticky_cta_boton_href" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer,
  	"programas_id" integer,
  	"testimonios_id" integer,
  	"clientes_trabajados_id" integer,
  	"faq_id" integer
  );
  
  CREATE TABLE "diplomado_hero_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "diplomado_origin_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"titulo" varchar NOT NULL,
  	"descripcion" varchar
  );
  
  CREATE TABLE "diplomado_audience_perfiles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "diplomado_audience_dudas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "diplomado_methodology_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"titulo" varchar NOT NULL,
  	"descripcion" varchar
  );
  
  CREATE TABLE "diplomado_curriculum_semanas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"numero" numeric NOT NULL,
  	"titulo" varchar NOT NULL,
  	"detalle" varchar NOT NULL
  );
  
  CREATE TABLE "diplomado_how_it_works_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"titulo" varchar NOT NULL,
  	"descripcion" varchar
  );
  
  CREATE TABLE "diplomado_team_mentor_section_bio" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texto" varchar NOT NULL
  );
  
  CREATE TABLE "diplomado_benefits_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texto" varchar NOT NULL,
  	"valor" varchar
  );
  
  CREATE TABLE "diplomado_benefits_extras" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "diplomado_pricing_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "diplomado_cta_final_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "diplomado_related_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "diplomado" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_badge_text" varchar,
  	"hero_eyebrow" varchar,
  	"hero_titulo_pre" varchar,
  	"hero_titulo_accent" varchar,
  	"hero_titulo_post" varchar,
  	"hero_subtitulo" varchar,
  	"hero_texto" varchar,
  	"hero_imagen_id" integer,
  	"hero_cta_primario_label" varchar NOT NULL,
  	"hero_cta_primario_href" varchar NOT NULL,
  	"hero_cta_secundario_label" varchar NOT NULL,
  	"hero_cta_secundario_href" varchar NOT NULL,
  	"hero_microcopy" varchar,
  	"origin_eyebrow" varchar,
  	"origin_titulo" varchar NOT NULL,
  	"origin_subtitulo" varchar,
  	"audience_titulo" varchar NOT NULL,
  	"audience_subtitulo" varchar,
  	"audience_titulo_perfiles" varchar,
  	"audience_titulo_dudas" varchar,
  	"audience_nota_final" varchar,
  	"methodology_eyebrow" varchar,
  	"methodology_titulo" varchar NOT NULL,
  	"methodology_subtitulo" varchar,
  	"curriculum_eyebrow" varchar,
  	"curriculum_titulo" varchar NOT NULL,
  	"how_it_works_eyebrow" varchar,
  	"how_it_works_titulo" varchar NOT NULL,
  	"how_it_works_subtitulo" varchar,
  	"how_it_works_cta_label" varchar,
  	"how_it_works_cta_href" varchar,
  	"team_team_intro_eyebrow" varchar,
  	"team_team_intro_titulo" varchar NOT NULL,
  	"team_team_intro_subtitulo" varchar,
  	"team_equipo_eyebrow" varchar,
  	"team_equipo_titulo" varchar,
  	"team_equipo_subtitulo" varchar,
  	"team_mentor_section_titulo" varchar NOT NULL,
  	"team_mentor_section_nombre" varchar NOT NULL,
  	"team_mentor_section_web" varchar,
  	"team_mentor_section_quote" varchar,
  	"benefits_eyebrow" varchar,
  	"benefits_titulo" varchar NOT NULL,
  	"benefits_subtitulo" varchar,
  	"pricing_titulo" varchar NOT NULL,
  	"pricing_subtitulo" varchar,
  	"pricing_plan_nombre" varchar NOT NULL,
  	"pricing_badge_text" varchar,
  	"pricing_precio" varchar NOT NULL,
  	"pricing_precio_tachado" varchar,
  	"pricing_precio_nota" varchar,
  	"pricing_descripcion" varchar,
  	"pricing_cta_label" varchar,
  	"pricing_cta_href" varchar,
  	"pricing_garantia_texto" varchar,
  	"faq_eyebrow" varchar,
  	"faq_titulo" varchar,
  	"cta_final_titulo" varchar NOT NULL,
  	"cta_final_texto" varchar,
  	"cta_final_boton_label" varchar NOT NULL,
  	"cta_final_boton_href" varchar NOT NULL,
  	"course_meta_price" varchar,
  	"course_meta_course_workload" varchar,
  	"course_meta_start_date" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "diplomado_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"team_members_id" integer,
  	"faq_id" integer
  );
  
  ALTER TABLE "pages_blocks_hero_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_pricing_planes_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_pricing_planes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_pricing" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_cta_banner_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_cta_banner" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_feature_grid_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_feature_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_stats_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_prose" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq_ref" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_testimonial_ref" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_team_grid_ref" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_program_grid_ref" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_logos_ref" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_section_header" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_related_links_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_related_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_hero_home_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_hero_home" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_instructor_stats_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_instructor" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_sticky_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_historia_parrafos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_historia" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_fundadora_bio" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_fundadora" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_metodologia_pilares" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_metodologia" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_reto_galeria" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_taller_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_taller_incluye_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_taller_incluye" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_taller_para_quien" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_taller_pricing_opciones" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_taller_pricing" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_audience_perfiles" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_audience_dudas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_audience" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_curriculum16_semanas_semanas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_curriculum16_semanas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_how_it_works_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_how_it_works" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_diplomado_team_mentor_section_bio" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_diplomado_team" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_diplomado_benefits_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_diplomado_benefits_extras" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_diplomado_benefits" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_diplomado_pricing_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_diplomado_pricing" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_barra_urgencia" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_reto_hero_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_reto_hero_ctas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_reto_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_razon_no_escalas_frases" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_razon_no_escalas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_mentora_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_mentora" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_agenda_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_agenda" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_comparacion_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_comparacion" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_incluye_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_incluye" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_premios" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_reto_pricing_ctas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_reto_pricing" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_ganadores_ganadores" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_ganadores" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_hero_bullets" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_pricing_planes_features" CASCADE;
  DROP TABLE "pages_blocks_pricing_planes" CASCADE;
  DROP TABLE "pages_blocks_pricing" CASCADE;
  DROP TABLE "pages_blocks_cta_banner_bullets" CASCADE;
  DROP TABLE "pages_blocks_cta_banner" CASCADE;
  DROP TABLE "pages_blocks_feature_grid_items" CASCADE;
  DROP TABLE "pages_blocks_feature_grid" CASCADE;
  DROP TABLE "pages_blocks_stats_items" CASCADE;
  DROP TABLE "pages_blocks_stats" CASCADE;
  DROP TABLE "pages_blocks_prose" CASCADE;
  DROP TABLE "pages_blocks_faq_ref" CASCADE;
  DROP TABLE "pages_blocks_testimonial_ref" CASCADE;
  DROP TABLE "pages_blocks_team_grid_ref" CASCADE;
  DROP TABLE "pages_blocks_program_grid_ref" CASCADE;
  DROP TABLE "pages_blocks_logos_ref" CASCADE;
  DROP TABLE "pages_blocks_section_header" CASCADE;
  DROP TABLE "pages_blocks_related_links_links" CASCADE;
  DROP TABLE "pages_blocks_related_links" CASCADE;
  DROP TABLE "pages_blocks_hero_home_bullets" CASCADE;
  DROP TABLE "pages_blocks_hero_home" CASCADE;
  DROP TABLE "pages_blocks_instructor_stats_items" CASCADE;
  DROP TABLE "pages_blocks_instructor" CASCADE;
  DROP TABLE "pages_blocks_sticky_cta" CASCADE;
  DROP TABLE "pages_blocks_historia_parrafos" CASCADE;
  DROP TABLE "pages_blocks_historia" CASCADE;
  DROP TABLE "pages_blocks_fundadora_bio" CASCADE;
  DROP TABLE "pages_blocks_fundadora" CASCADE;
  DROP TABLE "pages_blocks_metodologia_pilares" CASCADE;
  DROP TABLE "pages_blocks_metodologia" CASCADE;
  DROP TABLE "pages_blocks_reto_galeria" CASCADE;
  DROP TABLE "pages_blocks_taller_hero" CASCADE;
  DROP TABLE "pages_blocks_taller_incluye_items" CASCADE;
  DROP TABLE "pages_blocks_taller_incluye" CASCADE;
  DROP TABLE "pages_blocks_taller_para_quien" CASCADE;
  DROP TABLE "pages_blocks_taller_pricing_opciones" CASCADE;
  DROP TABLE "pages_blocks_taller_pricing" CASCADE;
  DROP TABLE "pages_blocks_audience_perfiles" CASCADE;
  DROP TABLE "pages_blocks_audience_dudas" CASCADE;
  DROP TABLE "pages_blocks_audience" CASCADE;
  DROP TABLE "pages_blocks_curriculum16_semanas_semanas" CASCADE;
  DROP TABLE "pages_blocks_curriculum16_semanas" CASCADE;
  DROP TABLE "pages_blocks_how_it_works_items" CASCADE;
  DROP TABLE "pages_blocks_how_it_works" CASCADE;
  DROP TABLE "pages_blocks_diplomado_team_mentor_section_bio" CASCADE;
  DROP TABLE "pages_blocks_diplomado_team" CASCADE;
  DROP TABLE "pages_blocks_diplomado_benefits_items" CASCADE;
  DROP TABLE "pages_blocks_diplomado_benefits_extras" CASCADE;
  DROP TABLE "pages_blocks_diplomado_benefits" CASCADE;
  DROP TABLE "pages_blocks_diplomado_pricing_features" CASCADE;
  DROP TABLE "pages_blocks_diplomado_pricing" CASCADE;
  DROP TABLE "pages_blocks_barra_urgencia" CASCADE;
  DROP TABLE "pages_blocks_reto_hero_bullets" CASCADE;
  DROP TABLE "pages_blocks_reto_hero_ctas" CASCADE;
  DROP TABLE "pages_blocks_reto_hero" CASCADE;
  DROP TABLE "pages_blocks_razon_no_escalas_frases" CASCADE;
  DROP TABLE "pages_blocks_razon_no_escalas" CASCADE;
  DROP TABLE "pages_blocks_mentora_stats" CASCADE;
  DROP TABLE "pages_blocks_mentora" CASCADE;
  DROP TABLE "pages_blocks_agenda_items" CASCADE;
  DROP TABLE "pages_blocks_agenda" CASCADE;
  DROP TABLE "pages_blocks_comparacion_items" CASCADE;
  DROP TABLE "pages_blocks_comparacion" CASCADE;
  DROP TABLE "pages_blocks_incluye_items" CASCADE;
  DROP TABLE "pages_blocks_incluye" CASCADE;
  DROP TABLE "pages_blocks_premios" CASCADE;
  DROP TABLE "pages_blocks_reto_pricing_ctas" CASCADE;
  DROP TABLE "pages_blocks_reto_pricing" CASCADE;
  DROP TABLE "pages_blocks_ganadores_ganadores" CASCADE;
  DROP TABLE "pages_blocks_ganadores" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  ALTER TABLE "redirects_rels" DROP CONSTRAINT "redirects_rels_pages_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_pages_fk";
  
  DROP INDEX "redirects_rels_pages_id_idx";
  DROP INDEX "payload_locked_documents_rels_pages_id_idx";
  ALTER TABLE "programas_hub_related_links_links" ADD CONSTRAINT "programas_hub_related_links_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programas_hub"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programas_hub_rels" ADD CONSTRAINT "programas_hub_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."programas_hub"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programas_hub_rels" ADD CONSTRAINT "programas_hub_rels_programas_fk" FOREIGN KEY ("programas_id") REFERENCES "public"."programas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "taller_seo_con_ia_incluye" ADD CONSTRAINT "taller_seo_con_ia_incluye_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."taller_seo_con_ia"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "taller_seo_con_ia_precio_opciones" ADD CONSTRAINT "taller_seo_con_ia_precio_opciones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."taller_seo_con_ia"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "quienes_somos_historia_parrafos" ADD CONSTRAINT "quienes_somos_historia_parrafos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."quienes_somos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "quienes_somos_fundadora_bio" ADD CONSTRAINT "quienes_somos_fundadora_bio_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."quienes_somos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "quienes_somos_metodologia_pilares" ADD CONSTRAINT "quienes_somos_metodologia_pilares_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."quienes_somos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "quienes_somos_stats_items" ADD CONSTRAINT "quienes_somos_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."quienes_somos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "quienes_somos_cta_final_bullets" ADD CONSTRAINT "quienes_somos_cta_final_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."quienes_somos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "quienes_somos" ADD CONSTRAINT "quienes_somos_fundadora_foto_id_media_id_fk" FOREIGN KEY ("fundadora_foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "quienes_somos_rels" ADD CONSTRAINT "quienes_somos_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."quienes_somos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "quienes_somos_rels" ADD CONSTRAINT "quienes_somos_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "testimonios_page_cta_bullets" ADD CONSTRAINT "testimonios_page_cta_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."testimonios_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "testimonios_page_rels" ADD CONSTRAINT "testimonios_page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."testimonios_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "testimonios_page_rels" ADD CONSTRAINT "testimonios_page_rels_clientes_trabajados_fk" FOREIGN KEY ("clientes_trabajados_id") REFERENCES "public"."clientes_trabajados"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "testimonios_page_rels" ADD CONSTRAINT "testimonios_page_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reto_hero_bullets" ADD CONSTRAINT "reto_hero_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reto"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reto_hero_ctas" ADD CONSTRAINT "reto_hero_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reto"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reto_razon_no_escalas_frases" ADD CONSTRAINT "reto_razon_no_escalas_frases_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reto"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reto_mentora_stats" ADD CONSTRAINT "reto_mentora_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reto"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reto_agenda" ADD CONSTRAINT "reto_agenda_imagen_id_media_id_fk" FOREIGN KEY ("imagen_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reto_agenda" ADD CONSTRAINT "reto_agenda_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reto"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reto_comparacion" ADD CONSTRAINT "reto_comparacion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reto"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reto_incluye" ADD CONSTRAINT "reto_incluye_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reto"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reto_pricing_ctas" ADD CONSTRAINT "reto_pricing_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reto"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reto_ganadores" ADD CONSTRAINT "reto_ganadores_imagen_id_media_id_fk" FOREIGN KEY ("imagen_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reto_ganadores" ADD CONSTRAINT "reto_ganadores_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reto"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reto" ADD CONSTRAINT "reto_hero_imagen_id_media_id_fk" FOREIGN KEY ("hero_imagen_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reto" ADD CONSTRAINT "reto_mentora_foto_id_media_id_fk" FOREIGN KEY ("mentora_foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reto" ADD CONSTRAINT "reto_premios_mayor_imagen_id_media_id_fk" FOREIGN KEY ("premios_mayor_imagen_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reto" ADD CONSTRAINT "reto_premios_becas_imagen_id_media_id_fk" FOREIGN KEY ("premios_becas_imagen_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reto_rels" ADD CONSTRAINT "reto_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."reto"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reto_rels" ADD CONSTRAINT "reto_rels_faq_fk" FOREIGN KEY ("faq_id") REFERENCES "public"."faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_hero_bullets" ADD CONSTRAINT "home_hero_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_problema_items" ADD CONSTRAINT "home_problema_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_beneficios_items" ADD CONSTRAINT "home_beneficios_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_pricing_planes_features" ADD CONSTRAINT "home_pricing_planes_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_pricing_planes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_pricing_planes" ADD CONSTRAINT "home_pricing_planes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_instructor_stats_items" ADD CONSTRAINT "home_instructor_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_cta_final_bullets" ADD CONSTRAINT "home_cta_final_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_hero_imagen_id_media_id_fk" FOREIGN KEY ("hero_imagen_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_hero_video_background_id_media_id_fk" FOREIGN KEY ("hero_video_background_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_instructor_foto_id_media_id_fk" FOREIGN KEY ("instructor_foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_rels" ADD CONSTRAINT "home_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_rels" ADD CONSTRAINT "home_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_rels" ADD CONSTRAINT "home_rels_programas_fk" FOREIGN KEY ("programas_id") REFERENCES "public"."programas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_rels" ADD CONSTRAINT "home_rels_testimonios_fk" FOREIGN KEY ("testimonios_id") REFERENCES "public"."testimonios"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_rels" ADD CONSTRAINT "home_rels_clientes_trabajados_fk" FOREIGN KEY ("clientes_trabajados_id") REFERENCES "public"."clientes_trabajados"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_rels" ADD CONSTRAINT "home_rels_faq_fk" FOREIGN KEY ("faq_id") REFERENCES "public"."faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "diplomado_hero_bullets" ADD CONSTRAINT "diplomado_hero_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."diplomado"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "diplomado_origin_items" ADD CONSTRAINT "diplomado_origin_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."diplomado"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "diplomado_audience_perfiles" ADD CONSTRAINT "diplomado_audience_perfiles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."diplomado"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "diplomado_audience_dudas" ADD CONSTRAINT "diplomado_audience_dudas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."diplomado"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "diplomado_methodology_items" ADD CONSTRAINT "diplomado_methodology_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."diplomado"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "diplomado_curriculum_semanas" ADD CONSTRAINT "diplomado_curriculum_semanas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."diplomado"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "diplomado_how_it_works_items" ADD CONSTRAINT "diplomado_how_it_works_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."diplomado"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "diplomado_team_mentor_section_bio" ADD CONSTRAINT "diplomado_team_mentor_section_bio_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."diplomado"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "diplomado_benefits_items" ADD CONSTRAINT "diplomado_benefits_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."diplomado"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "diplomado_benefits_extras" ADD CONSTRAINT "diplomado_benefits_extras_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."diplomado"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "diplomado_pricing_features" ADD CONSTRAINT "diplomado_pricing_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."diplomado"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "diplomado_cta_final_bullets" ADD CONSTRAINT "diplomado_cta_final_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."diplomado"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "diplomado_related_links" ADD CONSTRAINT "diplomado_related_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."diplomado"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "diplomado" ADD CONSTRAINT "diplomado_hero_imagen_id_media_id_fk" FOREIGN KEY ("hero_imagen_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "diplomado_rels" ADD CONSTRAINT "diplomado_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."diplomado"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "diplomado_rels" ADD CONSTRAINT "diplomado_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "diplomado_rels" ADD CONSTRAINT "diplomado_rels_faq_fk" FOREIGN KEY ("faq_id") REFERENCES "public"."faq"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "programas_hub_related_links_links_order_idx" ON "programas_hub_related_links_links" USING btree ("_order");
  CREATE INDEX "programas_hub_related_links_links_parent_id_idx" ON "programas_hub_related_links_links" USING btree ("_parent_id");
  CREATE INDEX "programas_hub_rels_order_idx" ON "programas_hub_rels" USING btree ("order");
  CREATE INDEX "programas_hub_rels_parent_idx" ON "programas_hub_rels" USING btree ("parent_id");
  CREATE INDEX "programas_hub_rels_path_idx" ON "programas_hub_rels" USING btree ("path");
  CREATE INDEX "programas_hub_rels_programas_id_idx" ON "programas_hub_rels" USING btree ("programas_id");
  CREATE INDEX "taller_seo_con_ia_incluye_order_idx" ON "taller_seo_con_ia_incluye" USING btree ("_order");
  CREATE INDEX "taller_seo_con_ia_incluye_parent_id_idx" ON "taller_seo_con_ia_incluye" USING btree ("_parent_id");
  CREATE INDEX "taller_seo_con_ia_precio_opciones_order_idx" ON "taller_seo_con_ia_precio_opciones" USING btree ("_order");
  CREATE INDEX "taller_seo_con_ia_precio_opciones_parent_id_idx" ON "taller_seo_con_ia_precio_opciones" USING btree ("_parent_id");
  CREATE INDEX "quienes_somos_historia_parrafos_order_idx" ON "quienes_somos_historia_parrafos" USING btree ("_order");
  CREATE INDEX "quienes_somos_historia_parrafos_parent_id_idx" ON "quienes_somos_historia_parrafos" USING btree ("_parent_id");
  CREATE INDEX "quienes_somos_fundadora_bio_order_idx" ON "quienes_somos_fundadora_bio" USING btree ("_order");
  CREATE INDEX "quienes_somos_fundadora_bio_parent_id_idx" ON "quienes_somos_fundadora_bio" USING btree ("_parent_id");
  CREATE INDEX "quienes_somos_metodologia_pilares_order_idx" ON "quienes_somos_metodologia_pilares" USING btree ("_order");
  CREATE INDEX "quienes_somos_metodologia_pilares_parent_id_idx" ON "quienes_somos_metodologia_pilares" USING btree ("_parent_id");
  CREATE INDEX "quienes_somos_stats_items_order_idx" ON "quienes_somos_stats_items" USING btree ("_order");
  CREATE INDEX "quienes_somos_stats_items_parent_id_idx" ON "quienes_somos_stats_items" USING btree ("_parent_id");
  CREATE INDEX "quienes_somos_cta_final_bullets_order_idx" ON "quienes_somos_cta_final_bullets" USING btree ("_order");
  CREATE INDEX "quienes_somos_cta_final_bullets_parent_id_idx" ON "quienes_somos_cta_final_bullets" USING btree ("_parent_id");
  CREATE INDEX "quienes_somos_fundadora_fundadora_foto_idx" ON "quienes_somos" USING btree ("fundadora_foto_id");
  CREATE INDEX "quienes_somos_rels_order_idx" ON "quienes_somos_rels" USING btree ("order");
  CREATE INDEX "quienes_somos_rels_parent_idx" ON "quienes_somos_rels" USING btree ("parent_id");
  CREATE INDEX "quienes_somos_rels_path_idx" ON "quienes_somos_rels" USING btree ("path");
  CREATE INDEX "quienes_somos_rels_team_members_id_idx" ON "quienes_somos_rels" USING btree ("team_members_id");
  CREATE INDEX "testimonios_page_cta_bullets_order_idx" ON "testimonios_page_cta_bullets" USING btree ("_order");
  CREATE INDEX "testimonios_page_cta_bullets_parent_id_idx" ON "testimonios_page_cta_bullets" USING btree ("_parent_id");
  CREATE INDEX "testimonios_page_rels_order_idx" ON "testimonios_page_rels" USING btree ("order");
  CREATE INDEX "testimonios_page_rels_parent_idx" ON "testimonios_page_rels" USING btree ("parent_id");
  CREATE INDEX "testimonios_page_rels_path_idx" ON "testimonios_page_rels" USING btree ("path");
  CREATE INDEX "testimonios_page_rels_clientes_trabajados_id_idx" ON "testimonios_page_rels" USING btree ("clientes_trabajados_id");
  CREATE INDEX "testimonios_page_rels_media_id_idx" ON "testimonios_page_rels" USING btree ("media_id");
  CREATE INDEX "reto_hero_bullets_order_idx" ON "reto_hero_bullets" USING btree ("_order");
  CREATE INDEX "reto_hero_bullets_parent_id_idx" ON "reto_hero_bullets" USING btree ("_parent_id");
  CREATE INDEX "reto_hero_ctas_order_idx" ON "reto_hero_ctas" USING btree ("_order");
  CREATE INDEX "reto_hero_ctas_parent_id_idx" ON "reto_hero_ctas" USING btree ("_parent_id");
  CREATE INDEX "reto_razon_no_escalas_frases_order_idx" ON "reto_razon_no_escalas_frases" USING btree ("_order");
  CREATE INDEX "reto_razon_no_escalas_frases_parent_id_idx" ON "reto_razon_no_escalas_frases" USING btree ("_parent_id");
  CREATE INDEX "reto_mentora_stats_order_idx" ON "reto_mentora_stats" USING btree ("_order");
  CREATE INDEX "reto_mentora_stats_parent_id_idx" ON "reto_mentora_stats" USING btree ("_parent_id");
  CREATE INDEX "reto_agenda_order_idx" ON "reto_agenda" USING btree ("_order");
  CREATE INDEX "reto_agenda_parent_id_idx" ON "reto_agenda" USING btree ("_parent_id");
  CREATE INDEX "reto_agenda_imagen_idx" ON "reto_agenda" USING btree ("imagen_id");
  CREATE INDEX "reto_comparacion_order_idx" ON "reto_comparacion" USING btree ("_order");
  CREATE INDEX "reto_comparacion_parent_id_idx" ON "reto_comparacion" USING btree ("_parent_id");
  CREATE INDEX "reto_incluye_order_idx" ON "reto_incluye" USING btree ("_order");
  CREATE INDEX "reto_incluye_parent_id_idx" ON "reto_incluye" USING btree ("_parent_id");
  CREATE INDEX "reto_pricing_ctas_order_idx" ON "reto_pricing_ctas" USING btree ("_order");
  CREATE INDEX "reto_pricing_ctas_parent_id_idx" ON "reto_pricing_ctas" USING btree ("_parent_id");
  CREATE INDEX "reto_ganadores_order_idx" ON "reto_ganadores" USING btree ("_order");
  CREATE INDEX "reto_ganadores_parent_id_idx" ON "reto_ganadores" USING btree ("_parent_id");
  CREATE INDEX "reto_ganadores_imagen_idx" ON "reto_ganadores" USING btree ("imagen_id");
  CREATE INDEX "reto_hero_hero_imagen_idx" ON "reto" USING btree ("hero_imagen_id");
  CREATE INDEX "reto_mentora_mentora_foto_idx" ON "reto" USING btree ("mentora_foto_id");
  CREATE INDEX "reto_premios_mayor_premios_mayor_imagen_idx" ON "reto" USING btree ("premios_mayor_imagen_id");
  CREATE INDEX "reto_premios_becas_premios_becas_imagen_idx" ON "reto" USING btree ("premios_becas_imagen_id");
  CREATE INDEX "reto_rels_order_idx" ON "reto_rels" USING btree ("order");
  CREATE INDEX "reto_rels_parent_idx" ON "reto_rels" USING btree ("parent_id");
  CREATE INDEX "reto_rels_path_idx" ON "reto_rels" USING btree ("path");
  CREATE INDEX "reto_rels_faq_id_idx" ON "reto_rels" USING btree ("faq_id");
  CREATE INDEX "home_hero_bullets_order_idx" ON "home_hero_bullets" USING btree ("_order");
  CREATE INDEX "home_hero_bullets_parent_id_idx" ON "home_hero_bullets" USING btree ("_parent_id");
  CREATE INDEX "home_problema_items_order_idx" ON "home_problema_items" USING btree ("_order");
  CREATE INDEX "home_problema_items_parent_id_idx" ON "home_problema_items" USING btree ("_parent_id");
  CREATE INDEX "home_beneficios_items_order_idx" ON "home_beneficios_items" USING btree ("_order");
  CREATE INDEX "home_beneficios_items_parent_id_idx" ON "home_beneficios_items" USING btree ("_parent_id");
  CREATE INDEX "home_pricing_planes_features_order_idx" ON "home_pricing_planes_features" USING btree ("_order");
  CREATE INDEX "home_pricing_planes_features_parent_id_idx" ON "home_pricing_planes_features" USING btree ("_parent_id");
  CREATE INDEX "home_pricing_planes_order_idx" ON "home_pricing_planes" USING btree ("_order");
  CREATE INDEX "home_pricing_planes_parent_id_idx" ON "home_pricing_planes" USING btree ("_parent_id");
  CREATE INDEX "home_instructor_stats_items_order_idx" ON "home_instructor_stats_items" USING btree ("_order");
  CREATE INDEX "home_instructor_stats_items_parent_id_idx" ON "home_instructor_stats_items" USING btree ("_parent_id");
  CREATE INDEX "home_cta_final_bullets_order_idx" ON "home_cta_final_bullets" USING btree ("_order");
  CREATE INDEX "home_cta_final_bullets_parent_id_idx" ON "home_cta_final_bullets" USING btree ("_parent_id");
  CREATE INDEX "home_hero_hero_imagen_idx" ON "home" USING btree ("hero_imagen_id");
  CREATE INDEX "home_hero_hero_video_background_idx" ON "home" USING btree ("hero_video_background_id");
  CREATE INDEX "home_instructor_instructor_foto_idx" ON "home" USING btree ("instructor_foto_id");
  CREATE INDEX "home_rels_order_idx" ON "home_rels" USING btree ("order");
  CREATE INDEX "home_rels_parent_idx" ON "home_rels" USING btree ("parent_id");
  CREATE INDEX "home_rels_path_idx" ON "home_rels" USING btree ("path");
  CREATE INDEX "home_rels_media_id_idx" ON "home_rels" USING btree ("media_id");
  CREATE INDEX "home_rels_programas_id_idx" ON "home_rels" USING btree ("programas_id");
  CREATE INDEX "home_rels_testimonios_id_idx" ON "home_rels" USING btree ("testimonios_id");
  CREATE INDEX "home_rels_clientes_trabajados_id_idx" ON "home_rels" USING btree ("clientes_trabajados_id");
  CREATE INDEX "home_rels_faq_id_idx" ON "home_rels" USING btree ("faq_id");
  CREATE INDEX "diplomado_hero_bullets_order_idx" ON "diplomado_hero_bullets" USING btree ("_order");
  CREATE INDEX "diplomado_hero_bullets_parent_id_idx" ON "diplomado_hero_bullets" USING btree ("_parent_id");
  CREATE INDEX "diplomado_origin_items_order_idx" ON "diplomado_origin_items" USING btree ("_order");
  CREATE INDEX "diplomado_origin_items_parent_id_idx" ON "diplomado_origin_items" USING btree ("_parent_id");
  CREATE INDEX "diplomado_audience_perfiles_order_idx" ON "diplomado_audience_perfiles" USING btree ("_order");
  CREATE INDEX "diplomado_audience_perfiles_parent_id_idx" ON "diplomado_audience_perfiles" USING btree ("_parent_id");
  CREATE INDEX "diplomado_audience_dudas_order_idx" ON "diplomado_audience_dudas" USING btree ("_order");
  CREATE INDEX "diplomado_audience_dudas_parent_id_idx" ON "diplomado_audience_dudas" USING btree ("_parent_id");
  CREATE INDEX "diplomado_methodology_items_order_idx" ON "diplomado_methodology_items" USING btree ("_order");
  CREATE INDEX "diplomado_methodology_items_parent_id_idx" ON "diplomado_methodology_items" USING btree ("_parent_id");
  CREATE INDEX "diplomado_curriculum_semanas_order_idx" ON "diplomado_curriculum_semanas" USING btree ("_order");
  CREATE INDEX "diplomado_curriculum_semanas_parent_id_idx" ON "diplomado_curriculum_semanas" USING btree ("_parent_id");
  CREATE INDEX "diplomado_how_it_works_items_order_idx" ON "diplomado_how_it_works_items" USING btree ("_order");
  CREATE INDEX "diplomado_how_it_works_items_parent_id_idx" ON "diplomado_how_it_works_items" USING btree ("_parent_id");
  CREATE INDEX "diplomado_team_mentor_section_bio_order_idx" ON "diplomado_team_mentor_section_bio" USING btree ("_order");
  CREATE INDEX "diplomado_team_mentor_section_bio_parent_id_idx" ON "diplomado_team_mentor_section_bio" USING btree ("_parent_id");
  CREATE INDEX "diplomado_benefits_items_order_idx" ON "diplomado_benefits_items" USING btree ("_order");
  CREATE INDEX "diplomado_benefits_items_parent_id_idx" ON "diplomado_benefits_items" USING btree ("_parent_id");
  CREATE INDEX "diplomado_benefits_extras_order_idx" ON "diplomado_benefits_extras" USING btree ("_order");
  CREATE INDEX "diplomado_benefits_extras_parent_id_idx" ON "diplomado_benefits_extras" USING btree ("_parent_id");
  CREATE INDEX "diplomado_pricing_features_order_idx" ON "diplomado_pricing_features" USING btree ("_order");
  CREATE INDEX "diplomado_pricing_features_parent_id_idx" ON "diplomado_pricing_features" USING btree ("_parent_id");
  CREATE INDEX "diplomado_cta_final_bullets_order_idx" ON "diplomado_cta_final_bullets" USING btree ("_order");
  CREATE INDEX "diplomado_cta_final_bullets_parent_id_idx" ON "diplomado_cta_final_bullets" USING btree ("_parent_id");
  CREATE INDEX "diplomado_related_links_order_idx" ON "diplomado_related_links" USING btree ("_order");
  CREATE INDEX "diplomado_related_links_parent_id_idx" ON "diplomado_related_links" USING btree ("_parent_id");
  CREATE INDEX "diplomado_hero_hero_imagen_idx" ON "diplomado" USING btree ("hero_imagen_id");
  CREATE INDEX "diplomado_rels_order_idx" ON "diplomado_rels" USING btree ("order");
  CREATE INDEX "diplomado_rels_parent_idx" ON "diplomado_rels" USING btree ("parent_id");
  CREATE INDEX "diplomado_rels_path_idx" ON "diplomado_rels" USING btree ("path");
  CREATE INDEX "diplomado_rels_team_members_id_idx" ON "diplomado_rels" USING btree ("team_members_id");
  CREATE INDEX "diplomado_rels_faq_id_idx" ON "diplomado_rels" USING btree ("faq_id");
  ALTER TABLE "redirects_rels" DROP COLUMN "pages_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "pages_id";`)
}
