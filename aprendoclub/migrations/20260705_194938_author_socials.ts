import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_authors_socials_platform" AS ENUM('linkedin', 'instagram', 'youtube', 'tiktok', 'twitter', 'facebook', 'whatsapp', 'website');
  CREATE TABLE "authors_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_authors_socials_platform" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  ALTER TABLE "authors_socials" ADD CONSTRAINT "authors_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."authors"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "authors_socials_order_idx" ON "authors_socials" USING btree ("_order");
  CREATE INDEX "authors_socials_parent_id_idx" ON "authors_socials" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "authors_socials" CASCADE;
  DROP TYPE "public"."enum_authors_socials_platform";`)
}
