import getAuthUser from "@/lib/getAuthUser";
import NavLink from "./NavLink";
import { logout } from "@/actions/auth";
import Link from "next/link";
import {
  ArrowLongLeftIcon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/24/outline";
import GoBackButton from "./navigation/GoBackButton";

export default async function Navigation({ showHome }) {
  const authUser = await getAuthUser();

  return (
    <nav className="flex items-center text-black justify-between dark:text-white  dark:bg-[var(--color-primary-800)] dark:border-[var(--color-primary-400)] mx-auto mt-3 flex max-w-[1400px] items-center justify-between rounded-3xl border-1 bg-primary px-6 py-4 lg:px-8">
      <div className="flex lg:flex-1">
        <NavLink href={"/"} label={"Home"} />
      </div>
      <div className="inline-flex items-center space-x-2">
        <NavLink href="/posts" label="Blog" />
        <NavLink href="/projects" label="Projects" />
        {authUser ? (
          <>
            <NavLink href="/dashboard" label="Dashboard" />
            <form action={logout}>
              <button className="nav-link inline-flex items-center">
                Logout
                <ArrowRightEndOnRectangleIcon className="w-5 h-5 ml-2 -mr-1 " />
              </button>
            </form>
          </>
        ) : (
          <>
            <NavLink href="/register" label="Register" />
            <NavLink href="/login" label="Login" />
          </>
        )}
      </div>
    </nav>
  );
}
