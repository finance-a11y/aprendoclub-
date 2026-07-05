import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_site_settings_footer_footer_socials_social_id" AS ENUM('youtube', 'tiktok', 'whatsapp', 'instagram', 'linkedin');
  ALTER TABLE "site_settings_footer_footer_socials" ALTER COLUMN "id" SET DATA TYPE varchar;
  ALTER TABLE "site_settings_footer_footer_socials" ADD COLUMN "social_id" "enum_site_settings_footer_footer_socials_social_id" NOT NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings_footer_footer_socials" ALTER COLUMN "id" SET DATA TYPE serial;
  ALTER TABLE "site_settings_footer_footer_socials" DROP COLUMN "social_id";
  DROP TYPE "public"."enum_site_settings_footer_footer_socials_social_id";`)
}
