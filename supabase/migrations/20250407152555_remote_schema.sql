revoke delete on table "public"."Post" from "anon";

revoke insert on table "public"."Post" from "anon";

revoke references on table "public"."Post" from "anon";

revoke select on table "public"."Post" from "anon";

revoke trigger on table "public"."Post" from "anon";

revoke truncate on table "public"."Post" from "anon";

revoke update on table "public"."Post" from "anon";

revoke delete on table "public"."Post" from "authenticated";

revoke insert on table "public"."Post" from "authenticated";

revoke references on table "public"."Post" from "authenticated";

revoke select on table "public"."Post" from "authenticated";

revoke trigger on table "public"."Post" from "authenticated";

revoke truncate on table "public"."Post" from "authenticated";

revoke update on table "public"."Post" from "authenticated";

revoke delete on table "public"."Post" from "service_role";

revoke insert on table "public"."Post" from "service_role";

revoke references on table "public"."Post" from "service_role";

revoke select on table "public"."Post" from "service_role";

revoke trigger on table "public"."Post" from "service_role";

revoke truncate on table "public"."Post" from "service_role";

revoke update on table "public"."Post" from "service_role";

revoke delete on table "public"."Project" from "anon";

revoke insert on table "public"."Project" from "anon";

revoke references on table "public"."Project" from "anon";

revoke select on table "public"."Project" from "anon";

revoke trigger on table "public"."Project" from "anon";

revoke truncate on table "public"."Project" from "anon";

revoke update on table "public"."Project" from "anon";

revoke delete on table "public"."Project" from "authenticated";

revoke insert on table "public"."Project" from "authenticated";

revoke references on table "public"."Project" from "authenticated";

revoke select on table "public"."Project" from "authenticated";

revoke trigger on table "public"."Project" from "authenticated";

revoke truncate on table "public"."Project" from "authenticated";

revoke update on table "public"."Project" from "authenticated";

revoke delete on table "public"."Project" from "service_role";

revoke insert on table "public"."Project" from "service_role";

revoke references on table "public"."Project" from "service_role";

revoke select on table "public"."Project" from "service_role";

revoke trigger on table "public"."Project" from "service_role";

revoke truncate on table "public"."Project" from "service_role";

revoke update on table "public"."Project" from "service_role";

revoke delete on table "public"."User" from "anon";

revoke insert on table "public"."User" from "anon";

revoke references on table "public"."User" from "anon";

revoke select on table "public"."User" from "anon";

revoke trigger on table "public"."User" from "anon";

revoke truncate on table "public"."User" from "anon";

revoke update on table "public"."User" from "anon";

revoke delete on table "public"."User" from "authenticated";

revoke insert on table "public"."User" from "authenticated";

revoke references on table "public"."User" from "authenticated";

revoke select on table "public"."User" from "authenticated";

revoke trigger on table "public"."User" from "authenticated";

revoke truncate on table "public"."User" from "authenticated";

revoke update on table "public"."User" from "authenticated";

revoke delete on table "public"."User" from "service_role";

revoke insert on table "public"."User" from "service_role";

revoke references on table "public"."User" from "service_role";

revoke select on table "public"."User" from "service_role";

revoke trigger on table "public"."User" from "service_role";

revoke truncate on table "public"."User" from "service_role";

revoke update on table "public"."User" from "service_role";

revoke delete on table "public"."_prisma_migrations" from "anon";

revoke insert on table "public"."_prisma_migrations" from "anon";

revoke references on table "public"."_prisma_migrations" from "anon";

revoke select on table "public"."_prisma_migrations" from "anon";

revoke trigger on table "public"."_prisma_migrations" from "anon";

revoke truncate on table "public"."_prisma_migrations" from "anon";

revoke update on table "public"."_prisma_migrations" from "anon";

revoke delete on table "public"."_prisma_migrations" from "authenticated";

revoke insert on table "public"."_prisma_migrations" from "authenticated";

revoke references on table "public"."_prisma_migrations" from "authenticated";

revoke select on table "public"."_prisma_migrations" from "authenticated";

revoke trigger on table "public"."_prisma_migrations" from "authenticated";

revoke truncate on table "public"."_prisma_migrations" from "authenticated";

revoke update on table "public"."_prisma_migrations" from "authenticated";

revoke delete on table "public"."_prisma_migrations" from "service_role";

revoke insert on table "public"."_prisma_migrations" from "service_role";

revoke references on table "public"."_prisma_migrations" from "service_role";

revoke select on table "public"."_prisma_migrations" from "service_role";

revoke trigger on table "public"."_prisma_migrations" from "service_role";

revoke truncate on table "public"."_prisma_migrations" from "service_role";

revoke update on table "public"."_prisma_migrations" from "service_role";

alter table "public"."Post" alter column "featImageName" drop not null;


