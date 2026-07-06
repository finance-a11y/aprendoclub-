import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_youtube_testimonials_videos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"nombre" varchar NOT NULL,
  	"youtube" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_youtube_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"titulo" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_youtube_testimonials_videos" ADD CONSTRAINT "pages_blocks_youtube_testimonials_videos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_youtube_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_youtube_testimonials" ADD CONSTRAINT "pages_blocks_youtube_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_youtube_testimonials_videos_order_idx" ON "pages_blocks_youtube_testimonials_videos" USING btree ("_order");
  CREATE INDEX "pages_blocks_youtube_testimonials_videos_parent_id_idx" ON "pages_blocks_youtube_testimonials_videos" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_youtube_testimonials_order_idx" ON "pages_blocks_youtube_testimonials" USING btree ("_order");
  CREATE INDEX "pages_blocks_youtube_testimonials_parent_id_idx" ON "pages_blocks_youtube_testimonials" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_youtube_testimonials_path_idx" ON "pages_blocks_youtube_testimonials" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_youtube_testimonials_videos" CASCADE;
  DROP TABLE "pages_blocks_youtube_testimonials" CASCADE;`)
}
