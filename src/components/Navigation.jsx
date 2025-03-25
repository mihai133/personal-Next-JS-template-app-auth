import NavLink from "./NavLink";

export default function Navigation() {
  return (
    <nav className="flex items-center justify-between">
      <NavLink label="Home" href="/" />
      <div className="flex items-center gap-4">
        <NavLink href="/dashboard" label="Dashboard" />
        <NavLink href="/register" label="Register" />
        <NavLink href="/login" label="Login" />
      </div>
    </nav>
  );
}
