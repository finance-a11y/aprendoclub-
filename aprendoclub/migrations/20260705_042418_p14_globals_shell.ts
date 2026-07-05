import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_site_settings_navbar_site_nav_type" AS ENUM('route', 'anchor');
  CREATE TABLE "site_settings_navbar_site_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"type" "enum_site_settings_navbar_site_nav_type" NOT NULL
  );
  
  CREATE TABLE "site_settings_navbar_program_menu" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"desc" varchar NOT NULL,
  	"badge" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_footer_footer_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"external" boolean DEFAULT false
  );
  
  CREATE TABLE "site_settings_footer_footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_footer_footer_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_seo_same_as" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"navbar_site_cta_label" varchar NOT NULL,
  	"navbar_site_cta_href" varchar NOT NULL,
  	"footer_footer_meta_blurb" varchar NOT NULL,
  	"footer_footer_meta_copyright_left" varchar NOT NULL,
  	"footer_footer_meta_copyright_right" varchar NOT NULL,
  	"footer_footer_meta_mobile_panel_blurb" varchar NOT NULL,
  	"seo_site_url" varchar NOT NULL,
  	"seo_org_name" varchar NOT NULL,
  	"seo_org_alternate_name" varchar,
  	"seo_org_logo_id" integer,
  	"seo_org_description" varchar NOT NULL,
  	"seo_org_founding_date" varchar NOT NULL,
  	"seo_founder_name" varchar NOT NULL,
  	"seo_founder_job_title" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
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
  
  ALTER TABLE "site_settings_navbar_site_nav" ADD CONSTRAINT "site_settings_navbar_site_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_navbar_program_menu" ADD CONSTRAINT "site_settings_navbar_program_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_footer_footer_columns_links" ADD CONSTRAINT "site_settings_footer_footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings_footer_footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_footer_footer_columns" ADD CONSTRAINT "site_settings_footer_footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_footer_footer_socials" ADD CONSTRAINT "site_settings_footer_footer_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_seo_same_as" ADD CONSTRAINT "site_settings_seo_same_as_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_seo_org_logo_id_media_id_fk" FOREIGN KEY ("seo_org_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "programas_hub_related_links_links" ADD CONSTRAINT "programas_hub_related_links_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programas_hub"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programas_hub_rels" ADD CONSTRAINT "programas_hub_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."programas_hub"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programas_hub_rels" ADD CONSTRAINT "programas_hub_rels_programas_fk" FOREIGN KEY ("programas_id") REFERENCES "public"."programas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "taller_seo_con_ia_incluye" ADD CONSTRAINT "taller_seo_con_ia_incluye_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."taller_seo_con_ia"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "taller_seo_con_ia_precio_opciones" ADD CONSTRAINT "taller_seo_con_ia_precio_opciones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."taller_seo_con_ia"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "site_settings_navbar_site_nav_order_idx" ON "site_settings_navbar_site_nav" USING btree ("_order");
  CREATE INDEX "site_settings_navbar_site_nav_parent_id_idx" ON "site_settings_navbar_site_nav" USING btree ("_parent_id");
  CREATE INDEX "site_settings_navbar_program_menu_order_idx" ON "site_settings_navbar_program_menu" USING btree ("_order");
  CREATE INDEX "site_settings_navbar_program_menu_parent_id_idx" ON "site_settings_navbar_program_menu" USING btree ("_parent_id");
  CREATE INDEX "site_settings_footer_footer_columns_links_order_idx" ON "site_settings_footer_footer_columns_links" USING btree ("_order");
  CREATE INDEX "site_settings_footer_footer_columns_links_parent_id_idx" ON "site_settings_footer_footer_columns_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_footer_footer_columns_order_idx" ON "site_settings_footer_footer_columns" USING btree ("_order");
  CREATE INDEX "site_settings_footer_footer_columns_parent_id_idx" ON "site_settings_footer_footer_columns" USING btree ("_parent_id");
  CREATE INDEX "site_settings_footer_footer_socials_order_idx" ON "site_settings_footer_footer_socials" USING btree ("_order");
  CREATE INDEX "site_settings_footer_footer_socials_parent_id_idx" ON "site_settings_footer_footer_socials" USING btree ("_parent_id");
  CREATE INDEX "site_settings_seo_same_as_order_idx" ON "site_settings_seo_same_as" USING btree ("_order");
  CREATE INDEX "site_settings_seo_same_as_parent_id_idx" ON "site_settings_seo_same_as" USING btree ("_parent_id");
  CREATE INDEX "site_settings_seo_seo_org_logo_idx" ON "site_settings" USING btree ("seo_org_logo_id");
  CREATE INDEX "programas_hub_related_links_links_order_idx" ON "programas_hub_related_links_links" USING btree ("_order");
  CREATE INDEX "programas_hub_related_links_links_parent_id_idx" ON "programas_hub_related_links_links" USING btree ("_parent_id");
  CREATE INDEX "programas_hub_rels_order_idx" ON "programas_hub_rels" USING btree ("order");
  CREATE INDEX "programas_hub_rels_parent_idx" ON "programas_hub_rels" USING btree ("parent_id");
  CREATE INDEX "programas_hub_rels_path_idx" ON "programas_hub_rels" USING btree ("path");
  CREATE INDEX "programas_hub_rels_programas_id_idx" ON "programas_hub_rels" USING btree ("programas_id");
  CREATE INDEX "taller_seo_con_ia_incluye_order_idx" ON "taller_seo_con_ia_incluye" USING btree ("_order");
  CREATE INDEX "taller_seo_con_ia_incluye_parent_id_idx" ON "taller_seo_con_ia_incluye" USING btree ("_parent_id");
  CREATE INDEX "taller_seo_con_ia_precio_opciones_order_idx" ON "taller_seo_con_ia_precio_opciones" USING btree ("_order");
  CREATE INDEX "taller_seo_con_ia_precio_opciones_parent_id_idx" ON "taller_seo_con_ia_precio_opciones" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "site_settings_navbar_site_nav" CASCADE;
  DROP TABLE "site_settings_navbar_program_menu" CASCADE;
  DROP TABLE "site_settings_footer_footer_columns_links" CASCADE;
  DROP TABLE "site_settings_footer_footer_columns" CASCADE;
  DROP TABLE "site_settings_footer_footer_socials" CASCADE;
  DROP TABLE "site_settings_seo_same_as" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "programas_hub_related_links_links" CASCADE;
  DROP TABLE "programas_hub" CASCADE;
  DROP TABLE "programas_hub_rels" CASCADE;
  DROP TABLE "taller_seo_con_ia_incluye" CASCADE;
  DROP TABLE "taller_seo_con_ia_precio_opciones" CASCADE;
  DROP TABLE "taller_seo_con_ia" CASCADE;
  DROP TYPE "public"."enum_site_settings_navbar_site_nav_type";`)
}
