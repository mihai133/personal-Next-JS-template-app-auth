import { logout } from "@/actions/auth";
import {
  ArrowLeftEndOnRectangleIcon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/24/outline";
import React from "react";

export default function LogoutButton() {
  return (
    <form action={logout}>
      <button className="flex items-center w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
        <ArrowLeftEndOnRectangleIcon className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
        <span className="ms-3">Logout</span>
      </button>
    </form>
  );
}
