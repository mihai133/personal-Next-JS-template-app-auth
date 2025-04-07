import { Dialog, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import NavLink from "./NavLink";

// import TheWebfieldLogo from "/assets/TheWebFieldn_new_logo_black.png";

export default function MobileMenu({
  mobileMenuOpen,
  setMobileMenuOpen,
  serverComponent,
  items,
}) {
  return (
    <Dialog
      open={mobileMenuOpen}
      onClose={setMobileMenuOpen}
      className="lg:hidden"
    >
      <div className="fixed inset-0 z-10" />
      <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white dark:bg-[var(--color-background-dark)] px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div className="flex items-center justify-end">
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
            <div className="flex flex-col space-y-2 py-6">
              <NavLink href="/posts" label="Blog" />
              <NavLink href="/projects" label="Projects" />
              {serverComponent}
              {/* {menuItems.map((navItem, index) => (
                <NavItem
                  key={index}
                  text={navItem.text}
                  href={navItem.href}
                  mobile={true}
                />
              ))} */}
            </div>
            {/* <div className="py-6">
              <a
                href="#"
                className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
              >
                Programează o întâlnire
              </a>
            </div> */}
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  );
}
