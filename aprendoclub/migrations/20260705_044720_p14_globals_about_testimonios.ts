import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
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
  CREATE INDEX "testimonios_page_rels_media_id_idx" ON "testimonios_page_rels" USING btree ("media_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "quienes_somos_historia_parrafos" CASCADE;
  DROP TABLE "quienes_somos_fundadora_bio" CASCADE;
  DROP TABLE "quienes_somos_metodologia_pilares" CASCADE;
  DROP TABLE "quienes_somos_stats_items" CASCADE;
  DROP TABLE "quienes_somos_cta_final_bullets" CASCADE;
  DROP TABLE "quienes_somos" CASCADE;
  DROP TABLE "quienes_somos_rels" CASCADE;
  DROP TABLE "testimonios_page_cta_bullets" CASCADE;
  DROP TABLE "testimonios_page" CASCADE;
  DROP TABLE "testimonios_page_rels" CASCADE;`)
}
