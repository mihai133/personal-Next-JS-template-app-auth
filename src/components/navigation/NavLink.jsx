"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ label, href }) {
  const pathName = usePathname();
  const paths = ["/projects", "/posts"];

  return (
    <Link
      href={href}
      className={`nav-link ${
        pathName === href || (pathName.startsWith(href) && paths.includes(href))
          ? "bg-[var(--color-primary)]/40 dark:bg-[var(--color-primary-500)]"
          : ""
      }`}
    >
      {label}
    </Link>
  );
}
