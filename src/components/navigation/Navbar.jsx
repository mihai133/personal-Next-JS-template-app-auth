"use client";

import { useState } from "react";
import { FadeInDown } from "../ui/FadeIn";
import { callsToAction, subMenuItems } from "./items";
import MobileMenu from "./MobileMenu";
import {
  ArrowLeftCircleIcon,
  ArrowLeftIcon,
  ArrowLongLeftIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { DesktopNav } from "./DesktopNav";
import NavLink from "../NavLink";
import Link from "next/link";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <FadeInDown duration={300} className="sticky top-3 right-0 z-10 mx-4">
      <header className="">
        <nav
          aria-label="Global"
          className="dark:bg-primary-800/95 dark:border-primary/40 mx-auto mt-3 flex max-w-[1400px] items-center justify-between rounded-3xl border-1 bg-primary px-6 py-4 lg:px-8"
        >
          <div className="flex lg:flex-1">
            <Link href={"/"}>
              <span className="sr-only">Back to Homepage</span>
              <ArrowLongLeftIcon
                height={24}
                width={24}
                className="text-gray-100"
              />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-100"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <DesktopNav />
        </nav>
        {/* Insert Here */}
        <MobileMenu
          items={[...subMenuItems, ...callsToAction]}
          {...{ setMobileMenuOpen, mobileMenuOpen }}
        />
      </header>
    </FadeInDown>
  );
}
