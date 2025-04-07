

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS "pgsodium";








ALTER SCHEMA "public" OWNER TO "postgres";


CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";





SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."Post" (
    "title" "text" NOT NULL,
    "content" "text" NOT NULL,
    "featImageName" "text" NOT NULL,
    "metaTitle" "text",
    "metaDesc" "text",
    "createdAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "id" "uuid" NOT NULL,
    "userId" "uuid" NOT NULL
);


ALTER TABLE "public"."Post" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."Project" (
    "title" "text" NOT NULL,
    "content" "text" NOT NULL,
    "metaTitle" "text",
    "metaDesc" "text",
    "featured" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "id" "uuid" NOT NULL,
    "userId" "uuid" NOT NULL
);


ALTER TABLE "public"."Project" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."User" (
    "email" "text" NOT NULL,
    "password" "text" NOT NULL,
    "id" "uuid" NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."User" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."_prisma_migrations" (
    "id" character varying(36) NOT NULL,
    "checksum" character varying(64) NOT NULL,
    "finished_at" timestamp with time zone,
    "migration_name" character varying(255) NOT NULL,
    "logs" "text",
    "rolled_back_at" timestamp with time zone,
    "started_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "applied_steps_count" integer DEFAULT 0 NOT NULL
);


ALTER TABLE "public"."_prisma_migrations" OWNER TO "postgres";


ALTER TABLE ONLY "public"."Post"
    ADD CONSTRAINT "Post_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."Project"
    ADD CONSTRAINT "Project_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."_prisma_migrations"
    ADD CONSTRAINT "_prisma_migrations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."Post"
    ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."Project"
    ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON UPDATE CASCADE ON DELETE RESTRICT;





ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


REVOKE USAGE ON SCHEMA "public" FROM PUBLIC;



























































































































































































































RESET ALL;
