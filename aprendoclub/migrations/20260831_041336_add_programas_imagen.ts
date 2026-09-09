import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "programas" ADD COLUMN "imagen_id" integer;
  ALTER TABLE "programas" ADD CONSTRAINT "programas_imagen_id_media_id_fk" FOREIGN KEY ("imagen_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "programas_imagen_idx" ON "programas" USING btree ("imagen_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "programas" DROP CONSTRAINT "programas_imagen_id_media_id_fk";
  
  DROP INDEX "programas_imagen_idx";
  ALTER TABLE "programas" DROP COLUMN "imagen_id";`)
}
