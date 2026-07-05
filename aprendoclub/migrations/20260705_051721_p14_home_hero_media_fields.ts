import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "home" ADD COLUMN "hero_rating_texto" varchar;
  ALTER TABLE "home" ADD COLUMN "hero_video_background_id" integer;
  ALTER TABLE "home_rels" ADD COLUMN "media_id" integer;
  ALTER TABLE "home" ADD CONSTRAINT "home_hero_video_background_id_media_id_fk" FOREIGN KEY ("hero_video_background_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_rels" ADD CONSTRAINT "home_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "home_hero_hero_video_background_idx" ON "home" USING btree ("hero_video_background_id");
  CREATE INDEX "home_rels_media_id_idx" ON "home_rels" USING btree ("media_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "home" DROP CONSTRAINT "home_hero_video_background_id_media_id_fk";
  
  ALTER TABLE "home_rels" DROP CONSTRAINT "home_rels_media_fk";
  
  DROP INDEX "home_hero_hero_video_background_idx";
  DROP INDEX "home_rels_media_id_idx";
  ALTER TABLE "home" DROP COLUMN "hero_rating_texto";
  ALTER TABLE "home" DROP COLUMN "hero_video_background_id";
  ALTER TABLE "home_rels" DROP COLUMN "media_id";`)
}
