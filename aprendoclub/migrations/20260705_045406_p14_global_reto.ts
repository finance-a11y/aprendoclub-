import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
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
  CREATE INDEX "reto_rels_faq_id_idx" ON "reto_rels" USING btree ("faq_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
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
  DROP TABLE "reto_rels" CASCADE;`)
}
