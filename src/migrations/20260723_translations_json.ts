import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "translations_locales" CASCADE;
    CREATE TABLE "translations_locales" (
      "id" serial PRIMARY KEY,
      "labels" jsonb,
      "_locale" varchar NOT NULL,
      "_parent_id" integer NOT NULL
    );
    ALTER TABLE "translations_locales"
      ADD CONSTRAINT "translations_locales_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."translations"("id")
      ON DELETE cascade ON UPDATE no action;
    CREATE UNIQUE INDEX "translations_locales_locale_parent_id_unique"
      ON "translations_locales" USING btree ("_locale","_parent_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`DROP TABLE IF EXISTS "translations_locales" CASCADE;`)
}
