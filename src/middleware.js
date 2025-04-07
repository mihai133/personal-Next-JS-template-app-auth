import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import getAuthUser from "./lib/getAuthUser";

const protectedRoutes = ["/dashboard", "/posts/create"];
const publicRoutes = ["/login", "/register"];

export default async function middleware(req) {
  const path = req.nextUrl.pathname;
  let supabaseResponse = NextResponse.next({
    req,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            req.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            req,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: DO NOT REMOVE auth.getUser()

  const {
    data: { user },
  } = await supabase.auth.getUser();
  // const user = await getAuthUser();
  const isProtected =
    protectedRoutes.includes(path) || path.startsWith("/posts/edit");
  const isPublic = publicRoutes.includes(path);

  // const user = await getAuthUser();
  const userId = user?.id;

  if (!userId && isProtected) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isPublic && userId) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}
