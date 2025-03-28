"use server";
import getAuthUser from "@/lib/getAuthUser";
import NavLink from "../NavLink";
import DropdownNav from "./DropdownNav";
import { menuItems } from "./items";
import Link from "next/link";
import { logout } from "@/actions/auth";

export default async function DesktopNav() {
  const authUser = await getAuthUser();

  return (
    <div className="hidden lg:flex lg:gap-x-12">
      {/* <PopoverGroup className="z-50 hidden lg:flex lg:gap-x-12"> */}
      {/* <DropdownNav /> */}
      {/* {menuItems.map((navItem, index) => (
        <NavItem
          key={index}
          text={navItem.text}
          href={navItem.href}
          viewTransition
        />
      ))} */}

      <NavLink label="Home" href="/" />
      <div className="flex items-center gap-4">
        {authUser ? (
          <div className="flex items-center gap-4">
            <NavLink href="/posts/create" label="New Post" />
            <NavLink href="/dashboard" label="Dashboard" />
            <form action={logout}>
              <button className="nav-link">Logout</button>
            </form>
          </div>
        ) : (
          <div>
            <NavLink href="/register" label="Register" />
            <NavLink href="/login" label="Login" />
          </div>
        )}
      </div>
    </div>
  );
}

// export function NavItem({ text, href, mobile }) {
//   return (
//     <Link
//       href={href}
//       className={`${
//         mobile
//           ? "-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
//           : "text-sm/6 font-semibold text-gray-100"
//       }`}
//     >
//       {text}
//     </Link>
//   );
// }
