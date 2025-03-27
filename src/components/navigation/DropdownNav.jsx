import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { callsToAction, subMenuItems } from "./items";
import Link from "next/link";

export default function DropdownNav() {
  return (
    <Popover className="relative">
      <PopoverButton className="flex cursor-pointer items-center gap-x-1 text-sm/6 font-semibold text-gray-100">
        Servicii
        <ChevronDownIcon
          aria-hidden="true"
          className="size-5 flex-none text-gray-400"
        />
      </PopoverButton>

      <PopoverPanel
        transition
        className="absolute top-full -left-8 mt-10 w-screen max-w-md overflow-hidden rounded-3xl bg-white ring-1 shadow-lg ring-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
      >
        <div className="p-4">
          {subMenuItems.map((item) => (
            <div
              key={item.name}
              className="group hover:bg-primary-800/30 relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 text-gray-800"
            >
              <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                <item.icon
                  aria-hidden="true"
                  className="group-hover:text-primary size-6 text-gray-600"
                />
              </div>
              <div className="flex-auto">
                <Link
                  href={item.href}
                  className="hover:text-primary-800 block font-semibold text-gray-900"
                >
                  {item.name}
                  {/* <span className="absolute inset-0" /> */}
                  <p className="z-1 mt-1 text-gray-800">{item.description}</p>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
          {callsToAction.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-100"
            >
              <item.icon
                aria-hidden="true"
                className="size-5 flex-none text-gray-400"
              />
              {item.name}
            </a>
          ))}
        </div>
      </PopoverPanel>
    </Popover>
  );
}
