import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_antes_despues_antes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texto" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_antes_despues_despues" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texto" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_antes_despues" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"titulo" varchar NOT NULL,
  	"antes_label" varchar DEFAULT 'Antes de entrar',
  	"despues_label" varchar DEFAULT 'Al completar el programa',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_comparativa_tabla_filas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"nombre" varchar NOT NULL,
  	"ofrecen" varchar NOT NULL,
  	"falta" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_comparativa_tabla" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"titulo" varchar NOT NULL,
  	"subtitulo" varchar,
  	"col_ofrecen_label" varchar DEFAULT 'Lo que ofrecen',
  	"col_falta_label" varchar DEFAULT 'Lo que no tienen',
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_stats_items" ADD COLUMN "titulo" varchar;
  ALTER TABLE "pages_blocks_stats" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "pages_blocks_stats" ADD COLUMN "header_titulo" varchar;
  ALTER TABLE "pages_blocks_stats" ADD COLUMN "subtitulo" varchar;
  ALTER TABLE "pages_blocks_instructor_stats_items" ADD COLUMN "titulo" varchar;
  ALTER TABLE "pages_blocks_instructor" ADD COLUMN "stats_eyebrow" varchar;
  ALTER TABLE "pages_blocks_instructor" ADD COLUMN "stats_header_titulo" varchar;
  ALTER TABLE "pages_blocks_instructor" ADD COLUMN "stats_subtitulo" varchar;
  ALTER TABLE "pages_blocks_antes_despues_antes" ADD CONSTRAINT "pages_blocks_antes_despues_antes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_antes_despues"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_antes_despues_despues" ADD CONSTRAINT "pages_blocks_antes_despues_despues_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_antes_despues"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_antes_despues" ADD CONSTRAINT "pages_blocks_antes_despues_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_comparativa_tabla_filas" ADD CONSTRAINT "pages_blocks_comparativa_tabla_filas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_comparativa_tabla"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_comparativa_tabla" ADD CONSTRAINT "pages_blocks_comparativa_tabla_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_antes_despues_antes_order_idx" ON "pages_blocks_antes_despues_antes" USING btree ("_order");
  CREATE INDEX "pages_blocks_antes_despues_antes_parent_id_idx" ON "pages_blocks_antes_despues_antes" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_antes_despues_despues_order_idx" ON "pages_blocks_antes_despues_despues" USING btree ("_order");
  CREATE INDEX "pages_blocks_antes_despues_despues_parent_id_idx" ON "pages_blocks_antes_despues_despues" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_antes_despues_order_idx" ON "pages_blocks_antes_despues" USING btree ("_order");
  CREATE INDEX "pages_blocks_antes_despues_parent_id_idx" ON "pages_blocks_antes_despues" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_antes_despues_path_idx" ON "pages_blocks_antes_despues" USING btree ("_path");
  CREATE INDEX "pages_blocks_comparativa_tabla_filas_order_idx" ON "pages_blocks_comparativa_tabla_filas" USING btree ("_order");
  CREATE INDEX "pages_blocks_comparativa_tabla_filas_parent_id_idx" ON "pages_blocks_comparativa_tabla_filas" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_comparativa_tabla_order_idx" ON "pages_blocks_comparativa_tabla" USING btree ("_order");
  CREATE INDEX "pages_blocks_comparativa_tabla_parent_id_idx" ON "pages_blocks_comparativa_tabla" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_comparativa_tabla_path_idx" ON "pages_blocks_comparativa_tabla" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_antes_despues_antes" CASCADE;
  DROP TABLE "pages_blocks_antes_despues_despues" CASCADE;
  DROP TABLE "pages_blocks_antes_despues" CASCADE;
  DROP TABLE "pages_blocks_comparativa_tabla_filas" CASCADE;
  DROP TABLE "pages_blocks_comparativa_tabla" CASCADE;
  ALTER TABLE "pages_blocks_stats_items" DROP COLUMN "titulo";
  ALTER TABLE "pages_blocks_stats" DROP COLUMN "eyebrow";
  ALTER TABLE "pages_blocks_stats" DROP COLUMN "header_titulo";
  ALTER TABLE "pages_blocks_stats" DROP COLUMN "subtitulo";
  ALTER TABLE "pages_blocks_instructor_stats_items" DROP COLUMN "titulo";
  ALTER TABLE "pages_blocks_instructor" DROP COLUMN "stats_eyebrow";
  ALTER TABLE "pages_blocks_instructor" DROP COLUMN "stats_header_titulo";
  ALTER TABLE "pages_blocks_instructor" DROP COLUMN "stats_subtitulo";`)
}
