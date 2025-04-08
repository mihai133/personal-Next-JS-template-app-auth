"use client";
import NavLink from "./NavLink";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useState } from "react";
import MobileMenu from "./MobileMenu";
import WebsiteLogo from "../ui/WebsiteLogo";

export default function Navigation({ showHome, serverComponent }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function toggleMobileMenu() {
    setMobileMenuOpen(!mobileMenuOpen);
  }
  return (
    <>
      <header className="sticky top-3 left-0 z-[10]">
        <nav className="relative flex items-center text-black justify-between dark:text-white  dark:bg-[var(--color-primary-800)] dark:border-[var(--color-primary-400)] mx-auto mt-3 flex max-w-[1400px] items-center justify-between rounded-3xl border-1 bg-[var(--color-secondary-200)]/98 border-[var(--color-primary-100)] px-6 py-4 lg:px-8 shadow-xl">
          <div className="flex lg:flex-1">
            <WebsiteLogo />
          </div>

          <div className="hidden md:inline-flex items-center space-x-2">
            <NavLink href="/posts" label="Blog" />
            <NavLink href="/projects" label="Projects" />
            {serverComponent}
          </div>
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-900 dark:text-white"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
        </nav>
      </header>
      <MobileMenu {...{ mobileMenuOpen, setMobileMenuOpen, serverComponent }} />
    </>
  );
}
