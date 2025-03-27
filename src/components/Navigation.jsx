import getAuthUser from "@/lib/getAuthUser";
import NavLink from "./NavLink";
import { logout } from "@/actions/auth";
import Link from "next/link";
import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";

export default async function Navigation() {
  const authUser = await getAuthUser();

  return (
    <nav className="flex items-center text-black justify-between dark:text-white  dark:bg-[var(--color-primary-800)] dark:border-[var(--color-primary-400)] mx-auto mt-3 flex max-w-[1400px] items-center justify-between rounded-3xl border-1 bg-primary px-6 py-4 lg:px-8">
      <div className="flex lg:flex-1">
        <Link href={"/"}>
          <span className="sr-only">Back to Homepage</span>
          <ArrowLongLeftIcon height={24} width={24} className="" />
        </Link>
      </div>
      <div className="inline-flex items-center gap-4">
        <NavLink href="/posts" label="Blog" />
        <NavLink href="/projects" label="Projects" />
        {authUser ? (
          <form action={logout}>
            <button className="nav-link">Logout</button>
          </form>
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
