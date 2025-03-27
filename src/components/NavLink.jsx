"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ label, href }) {
  const pathName = usePathname();
  return (
    <Link
      href={href}
      className={`nav-link h-full text-black dark:text-white  dark:hover:bg-[var(--color-primary-500)] ${
        pathName === href ? "bg-[var(--color-primary-500)] text-white" : ""
      }`}
    >
      {label}
    </Link>
  );
}
