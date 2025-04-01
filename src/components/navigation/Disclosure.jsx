import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React from "react";

export default function DisclosureItems({ items }) {
  return (
    <Disclosure as="div" className="-mx-3">
      <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
        Servicii
        <ChevronDownIcon
          aria-hidden="true"
          className="size-5 flex-none group-data-open:rotate-180"
        />
      </DisclosureButton>
      <DisclosurePanel className="mt-2 space-y-2">
        {/* {items.map((item) => (
                       <DisclosureButton
                         key={item.name}
                         as="a"
                         href={item.href}
                         className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
                       >
                         {item.name}
                       </DisclosureButton>
                     ))} */}
      </DisclosurePanel>
    </Disclosure>
  );
}
