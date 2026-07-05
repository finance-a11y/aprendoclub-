import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_faq_page" AS ENUM('home', 'diplomado', 'reto', 'taller-seo-con-ia');
  CREATE TABLE "testimonios" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nombre" varchar NOT NULL,
  	"rol" varchar,
  	"ubicacion" varchar,
  	"quote" varchar NOT NULL,
  	"foto_id" integer,
  	"featured_on_home" boolean DEFAULT false,
  	"orden" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "clientes_trabajados" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nombre" varchar NOT NULL,
  	"logo_id" integer NOT NULL,
  	"orden" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "programas" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"badge" varchar NOT NULL,
  	"nombre" varchar NOT NULL,
  	"descripcion" varchar NOT NULL,
  	"precio" varchar NOT NULL,
  	"precio_nota" varchar,
  	"cta_label" varchar NOT NULL,
  	"cta_href" varchar NOT NULL,
  	"orden" numeric,
  	"menu_desc" varchar,
  	"menu_badge" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "programas_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"testimonios_id" integer
  );
  
  CREATE TABLE "team_members" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nombre" varchar NOT NULL,
  	"rol" varchar NOT NULL,
  	"bio" varchar NOT NULL,
  	"foto_id" integer,
  	"iniciales" varchar NOT NULL,
  	"web" varchar,
  	"mostrar_en_quienes_somos" boolean,
  	"mostrar_en_diplomado" boolean,
  	"orden" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "faq" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"page" "enum_faq_page" NOT NULL,
  	"orden" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "redirects_rels" DROP CONSTRAINT "redirects_rels_media_fk";
  
  DROP INDEX "redirects_rels_media_id_idx";
  ALTER TABLE "redirects_rels" ADD COLUMN "programas_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "testimonios_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "clientes_trabajados_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "programas_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "team_members_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "faq_id" integer;
  ALTER TABLE "testimonios" ADD CONSTRAINT "testimonios_foto_id_media_id_fk" FOREIGN KEY ("foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "clientes_trabajados" ADD CONSTRAINT "clientes_trabajados_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "programas_rels" ADD CONSTRAINT "programas_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."programas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programas_rels" ADD CONSTRAINT "programas_rels_testimonios_fk" FOREIGN KEY ("testimonios_id") REFERENCES "public"."testimonios"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "team_members" ADD CONSTRAINT "team_members_foto_id_media_id_fk" FOREIGN KEY ("foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "testimonios_foto_idx" ON "testimonios" USING btree ("foto_id");
  CREATE INDEX "testimonios_updated_at_idx" ON "testimonios" USING btree ("updated_at");
  CREATE INDEX "testimonios_created_at_idx" ON "testimonios" USING btree ("created_at");
  CREATE INDEX "clientes_trabajados_logo_idx" ON "clientes_trabajados" USING btree ("logo_id");
  CREATE INDEX "clientes_trabajados_updated_at_idx" ON "clientes_trabajados" USING btree ("updated_at");
  CREATE INDEX "clientes_trabajados_created_at_idx" ON "clientes_trabajados" USING btree ("created_at");
  CREATE UNIQUE INDEX "programas_slug_idx" ON "programas" USING btree ("slug");
  CREATE INDEX "programas_updated_at_idx" ON "programas" USING btree ("updated_at");
  CREATE INDEX "programas_created_at_idx" ON "programas" USING btree ("created_at");
  CREATE INDEX "programas_rels_order_idx" ON "programas_rels" USING btree ("order");
  CREATE INDEX "programas_rels_parent_idx" ON "programas_rels" USING btree ("parent_id");
  CREATE INDEX "programas_rels_path_idx" ON "programas_rels" USING btree ("path");
  CREATE INDEX "programas_rels_testimonios_id_idx" ON "programas_rels" USING btree ("testimonios_id");
  CREATE INDEX "team_members_foto_idx" ON "team_members" USING btree ("foto_id");
  CREATE INDEX "team_members_updated_at_idx" ON "team_members" USING btree ("updated_at");
  CREATE INDEX "team_members_created_at_idx" ON "team_members" USING btree ("created_at");
  CREATE INDEX "faq_updated_at_idx" ON "faq" USING btree ("updated_at");
  CREATE INDEX "faq_created_at_idx" ON "faq" USING btree ("created_at");
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_programas_fk" FOREIGN KEY ("programas_id") REFERENCES "public"."programas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonios_fk" FOREIGN KEY ("testimonios_id") REFERENCES "public"."testimonios"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_clientes_trabajados_fk" FOREIGN KEY ("clientes_trabajados_id") REFERENCES "public"."clientes_trabajados"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_programas_fk" FOREIGN KEY ("programas_id") REFERENCES "public"."programas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faq_fk" FOREIGN KEY ("faq_id") REFERENCES "public"."faq"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "redirects_rels_programas_id_idx" ON "redirects_rels" USING btree ("programas_id");
  CREATE INDEX "payload_locked_documents_rels_testimonios_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonios_id");
  CREATE INDEX "payload_locked_documents_rels_clientes_trabajados_id_idx" ON "payload_locked_documents_rels" USING btree ("clientes_trabajados_id");
  CREATE INDEX "payload_locked_documents_rels_programas_id_idx" ON "payload_locked_documents_rels" USING btree ("programas_id");
  CREATE INDEX "payload_locked_documents_rels_team_members_id_idx" ON "payload_locked_documents_rels" USING btree ("team_members_id");
  CREATE INDEX "payload_locked_documents_rels_faq_id_idx" ON "payload_locked_documents_rels" USING btree ("faq_id");
  ALTER TABLE "redirects_rels" DROP COLUMN "media_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "testimonios" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "clientes_trabajados" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "programas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "programas_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "team_members" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "faq" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "testimonios" CASCADE;
  DROP TABLE "clientes_trabajados" CASCADE;
  DROP TABLE "programas" CASCADE;
  DROP TABLE "programas_rels" CASCADE;
  DROP TABLE "team_members" CASCADE;
  DROP TABLE "faq" CASCADE;
  ALTER TABLE "redirects_rels" DROP CONSTRAINT "redirects_rels_programas_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_testimonios_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_clientes_trabajados_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_programas_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_team_members_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_faq_fk";
  
  DROP INDEX "redirects_rels_programas_id_idx";
  DROP INDEX "payload_locked_documents_rels_testimonios_id_idx";
  DROP INDEX "payload_locked_documents_rels_clientes_trabajados_id_idx";
  DROP INDEX "payload_locked_documents_rels_programas_id_idx";
  DROP INDEX "payload_locked_documents_rels_team_members_id_idx";
  DROP INDEX "payload_locked_documents_rels_faq_id_idx";
  ALTER TABLE "redirects_rels" ADD COLUMN "media_id" integer;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "redirects_rels_media_id_idx" ON "redirects_rels" USING btree ("media_id");
  ALTER TABLE "redirects_rels" DROP COLUMN "programas_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "testimonios_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "clientes_trabajados_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "programas_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "team_members_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "faq_id";
  DROP TYPE "public"."enum_faq_page";`)
}
