import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_asesoria_widget_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_asesoria_widget" (
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
  
  ALTER TABLE "pages_blocks_asesoria_widget_bullets" ADD CONSTRAINT "pages_blocks_asesoria_widget_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_asesoria_widget"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_asesoria_widget" ADD CONSTRAINT "pages_blocks_asesoria_widget_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_asesoria_widget_bullets_order_idx" ON "pages_blocks_asesoria_widget_bullets" USING btree ("_order");
  CREATE INDEX "pages_blocks_asesoria_widget_bullets_parent_id_idx" ON "pages_blocks_asesoria_widget_bullets" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_asesoria_widget_order_idx" ON "pages_blocks_asesoria_widget" USING btree ("_order");
  CREATE INDEX "pages_blocks_asesoria_widget_parent_id_idx" ON "pages_blocks_asesoria_widget" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_asesoria_widget_path_idx" ON "pages_blocks_asesoria_widget" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_asesoria_widget_bullets" CASCADE;
  DROP TABLE "pages_blocks_asesoria_widget" CASCADE;`)
}
