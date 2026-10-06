import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "blogposts" ADD COLUMN "video_thumbnail_id" integer;
  ALTER TABLE "blogposts" ADD CONSTRAINT "blogposts_video_thumbnail_id_media_id_fk" FOREIGN KEY ("video_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "blogposts_video_thumbnail_idx" ON "blogposts" USING btree ("video_thumbnail_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "blogposts" DROP CONSTRAINT "blogposts_video_thumbnail_id_media_id_fk";
  
  DROP INDEX "blogposts_video_thumbnail_idx";
  ALTER TABLE "blogposts" DROP COLUMN "video_thumbnail_id";`)
}
