"use server";
import { logout } from "@/actions/auth";
import getAuthUser from "@/lib/getAuthUser";
import React from "react";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import NavLink from "./NavLink";

export default async function PrivateNavItems() {
  console.log("PRivate");
  const authUser = await getAuthUser();
  return authUser ? (
    <>
      <NavLink href="/dashboard" label="Dashboard" />
      <form action={logout}>
        <button className="nav-link inline-flex max-sm:w-full items-center">
          Logout
          <ArrowRightEndOnRectangleIcon className="w-5 h-5 ml-2 -mr-1 " />
        </button>
      </form>
    </>
  ) : (
    <>
      {/* <NavLink href="/register" label="Register" />
      <NavLink href="/login" label="Login" /> */}
    </>
  );
}
