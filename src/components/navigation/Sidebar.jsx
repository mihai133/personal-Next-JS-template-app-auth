"use client";
import {
  ArrowLeftIcon,
  Bars3Icon,
  ChartPieIcon,
  DocumentIcon,
  RectangleGroupIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import SidebarNavItem from "./SidebarNavItem";
import LogoutButton from "./SidebarNavLogout";

export default function Sidebar({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <button onClick={toggleDrawer} type="button" className="">
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="h-10 w-10 p-2 text-gray-500 transition duration-175 dark:text-gray-400  text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" />
      </button>
      <div
        onClick={toggleDrawer}
        id="overlay"
        className={`bg-[var(--color-secondary-200)] dark:bg-[var(--color-secondary-800)] z-40 w-screen h-screen transition-opacity duration-500 opacity-0 sm:hidden ${
          isOpen ? "fixed top-0 left-0" : "hidden"
        }`}
      ></div>
      <aside
        id="separator-sidebar"
        className={` fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <SidebarNavItem
                href="/"
                icon={ArrowLeftIcon}
                label="Back to public"
              />
            </li>
            <li>
              <SidebarNavItem
                href="/dashboard"
                icon={ChartPieIcon}
                label="Dashboard"
              />
            </li>
            <li>
              <SidebarNavItem
                href="/dashboard/posts"
                icon={DocumentIcon}
                label="Articles"
              />
            </li>
            <li>
              <SidebarNavItem
                href="/dashboard/projects"
                icon={RectangleGroupIcon}
                label="Projects"
              />
            </li>

            <li>
              <LogoutButton />
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
