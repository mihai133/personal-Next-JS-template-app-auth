"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarNavItem({ href, icon: Icon, label }) {
  const pathName = usePathname();

  return (
    <Link
      href={href}
      className={`flex items-center p-2 text-gray-900 rounded-lg ${
        pathName === href
          ? "bg-[var(--color-gray-200)] dark:bg-[var(--color-gray-700)]"
          : ""
      } dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group`}
    >
      {Icon && (
        <Icon className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
      )}
      <span className="ms-3">{label}</span>
      {/* <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                  Pro
                </span> */}

      {/* <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  3
                </span> */}
    </Link>
  );
}
