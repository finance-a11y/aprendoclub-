import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "redirects_rels" ADD COLUMN "blogposts_id" integer;
  ALTER TABLE "redirects_rels" ADD COLUMN "categories_id" integer;
  ALTER TABLE "redirects_rels" ADD COLUMN "authors_id" integer;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_blogposts_fk" FOREIGN KEY ("blogposts_id") REFERENCES "public"."blogposts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_authors_fk" FOREIGN KEY ("authors_id") REFERENCES "public"."authors"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "redirects_rels_blogposts_id_idx" ON "redirects_rels" USING btree ("blogposts_id");
  CREATE INDEX "redirects_rels_categories_id_idx" ON "redirects_rels" USING btree ("categories_id");
  CREATE INDEX "redirects_rels_authors_id_idx" ON "redirects_rels" USING btree ("authors_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "redirects_rels" DROP CONSTRAINT "redirects_rels_blogposts_fk";
  
  ALTER TABLE "redirects_rels" DROP CONSTRAINT "redirects_rels_categories_fk";
  
  ALTER TABLE "redirects_rels" DROP CONSTRAINT "redirects_rels_authors_fk";
  
  DROP INDEX "redirects_rels_blogposts_id_idx";
  DROP INDEX "redirects_rels_categories_id_idx";
  DROP INDEX "redirects_rels_authors_id_idx";
  ALTER TABLE "redirects_rels" DROP COLUMN "blogposts_id";
  ALTER TABLE "redirects_rels" DROP COLUMN "categories_id";
  ALTER TABLE "redirects_rels" DROP COLUMN "authors_id";`)
}
