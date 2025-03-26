import getAuthUser from "@/lib/getAuthUser";
import NavLink from "./NavLink";
import { logout } from "@/actions/auth";

export default async function Navigation() {
  const authUser = await getAuthUser();

  return (
    <nav className="flex items-center justify-between">
      <NavLink label="Home" href="/" />
      <div className="flex items-center gap-4">
        {authUser ? (
          <div className="flex items-center gap-4">
            <NavLink href="/posts/create" label="New Post" />
            <NavLink href="/dashboard" label="Dashboard" />
            <form action={logout}>
              <button className="nav-link">Logout</button>
            </form>
          </div>
        ) : (
          <div>
            <NavLink href="/register" label="Register" />
            <NavLink href="/login" label="Login" />
          </div>
        )}
      </div>
    </nav>
  );
}
