import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavItem } from "./DesktopNav";
import { menuItems } from "./items";
import Link from "next/link";
// import TheWebfieldLogo from "/assets/TheWebFieldn_new_logo_black.png";

export default function MobileMenu({
  mobileMenuOpen,
  setMobileMenuOpen,
  items,
}) {
  return (
    <Dialog
      open={mobileMenuOpen}
      onClose={setMobileMenuOpen}
      className="lg:hidden"
    >
      <div className="fixed inset-0 z-10" />
      <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div className="flex items-center justify-between">
          {/* <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">The Webfield</span>
            <img
              alt=""
              src={TheWebfieldLogo}
              className="m-0 h-12 w-auto -translate-x-5"
            />
          </a> */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="-m-2.5 rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Close menu</span>
            <XMarkIcon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">
              <Disclosure as="div" className="-mx-3">
                <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                  Servicii
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="size-5 flex-none group-data-open:rotate-180"
                  />
                </DisclosureButton>
                <DisclosurePanel className="mt-2 space-y-2">
                  {items.map((item) => (
                    <DisclosureButton
                      key={item.name}
                      as="a"
                      href={item.href}
                      className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </DisclosureButton>
                  ))}
                </DisclosurePanel>
              </Disclosure>

              {menuItems.map((navItem, index) => (
                <NavItem
                  key={index}
                  text={navItem.text}
                  href={navItem.href}
                  mobile={true}
                />
              ))}
            </div>
            <div className="py-6">
              <a
                href="#"
                className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
              >
                Programează o întâlnire
              </a>
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  );
}
