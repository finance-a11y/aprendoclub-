import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
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
  	"programas_id" integer,
  	"testimonios_id" integer,
  	"clientes_trabajados_id" integer,
  	"faq_id" integer
  );
  
  ALTER TABLE "home_hero_bullets" ADD CONSTRAINT "home_hero_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_problema_items" ADD CONSTRAINT "home_problema_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_beneficios_items" ADD CONSTRAINT "home_beneficios_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_pricing_planes_features" ADD CONSTRAINT "home_pricing_planes_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_pricing_planes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_pricing_planes" ADD CONSTRAINT "home_pricing_planes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_instructor_stats_items" ADD CONSTRAINT "home_instructor_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_cta_final_bullets" ADD CONSTRAINT "home_cta_final_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_hero_imagen_id_media_id_fk" FOREIGN KEY ("hero_imagen_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_instructor_foto_id_media_id_fk" FOREIGN KEY ("instructor_foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_rels" ADD CONSTRAINT "home_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_rels" ADD CONSTRAINT "home_rels_programas_fk" FOREIGN KEY ("programas_id") REFERENCES "public"."programas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_rels" ADD CONSTRAINT "home_rels_testimonios_fk" FOREIGN KEY ("testimonios_id") REFERENCES "public"."testimonios"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_rels" ADD CONSTRAINT "home_rels_clientes_trabajados_fk" FOREIGN KEY ("clientes_trabajados_id") REFERENCES "public"."clientes_trabajados"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_rels" ADD CONSTRAINT "home_rels_faq_fk" FOREIGN KEY ("faq_id") REFERENCES "public"."faq"("id") ON DELETE cascade ON UPDATE no action;
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
  CREATE INDEX "home_instructor_instructor_foto_idx" ON "home" USING btree ("instructor_foto_id");
  CREATE INDEX "home_rels_order_idx" ON "home_rels" USING btree ("order");
  CREATE INDEX "home_rels_parent_idx" ON "home_rels" USING btree ("parent_id");
  CREATE INDEX "home_rels_path_idx" ON "home_rels" USING btree ("path");
  CREATE INDEX "home_rels_programas_id_idx" ON "home_rels" USING btree ("programas_id");
  CREATE INDEX "home_rels_testimonios_id_idx" ON "home_rels" USING btree ("testimonios_id");
  CREATE INDEX "home_rels_clientes_trabajados_id_idx" ON "home_rels" USING btree ("clientes_trabajados_id");
  CREATE INDEX "home_rels_faq_id_idx" ON "home_rels" USING btree ("faq_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "home_hero_bullets" CASCADE;
  DROP TABLE "home_problema_items" CASCADE;
  DROP TABLE "home_beneficios_items" CASCADE;
  DROP TABLE "home_pricing_planes_features" CASCADE;
  DROP TABLE "home_pricing_planes" CASCADE;
  DROP TABLE "home_instructor_stats_items" CASCADE;
  DROP TABLE "home_cta_final_bullets" CASCADE;
  DROP TABLE "home" CASCADE;
  DROP TABLE "home_rels" CASCADE;`)
}
