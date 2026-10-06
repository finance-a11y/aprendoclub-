import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "blogposts" ADD COLUMN "video_url" varchar;
  ALTER TABLE "blogposts" ADD COLUMN "short_url" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "blogposts" DROP COLUMN "video_url";
  ALTER TABLE "blogposts" DROP COLUMN "short_url";`)
}
