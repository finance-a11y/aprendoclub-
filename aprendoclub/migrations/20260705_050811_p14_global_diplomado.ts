import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
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
  CREATE INDEX "diplomado_rels_faq_id_idx" ON "diplomado_rels" USING btree ("faq_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
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
  DROP TABLE "diplomado_rels" CASCADE;`)
}
