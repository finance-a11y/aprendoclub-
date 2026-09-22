import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_glosario_categoria" AS ENUM('basico', 'tecnico', 'onpage', 'offpage', 'herramientas', 'ia-algoritmos', 'metricas');
  CREATE TABLE "glosario" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"termino" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"definicion" varchar NOT NULL,
  	"letra" varchar NOT NULL,
  	"categoria" "enum_glosario_categoria" DEFAULT 'basico' NOT NULL,
  	"ejemplo" varchar,
  	"destacado" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "glosario_id" integer;
  CREATE UNIQUE INDEX "glosario_slug_idx" ON "glosario" USING btree ("slug");
  CREATE INDEX "glosario_letra_idx" ON "glosario" USING btree ("letra");
  CREATE INDEX "glosario_updated_at_idx" ON "glosario" USING btree ("updated_at");
  CREATE INDEX "glosario_created_at_idx" ON "glosario" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_glosario_fk" FOREIGN KEY ("glosario_id") REFERENCES "public"."glosario"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_glosario_id_idx" ON "payload_locked_documents_rels" USING btree ("glosario_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "glosario" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "glosario" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_glosario_fk";
  
  DROP INDEX "payload_locked_documents_rels_glosario_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "glosario_id";
  DROP TYPE "public"."enum_glosario_categoria";`)
}
