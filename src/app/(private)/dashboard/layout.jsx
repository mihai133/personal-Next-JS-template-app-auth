import LoadingArticles from "@/components/LoadingArticles";
import Navigation from "@/components/navigation/Navigation";
import Sidebar from "@/components/navigation/Sidebar";
import { Suspense } from "react";

export const metadata = {
  title: "TW | Blog Posts Page",
  description: "Blog posts page",
  keywords: "next.js, blog, template",
};

export default function DashboardLayout({ children }) {
  return (
    <>
      <Sidebar />
      <main className="p-4 sm:ml-64 min-h-screen">{children}</main>
    </>
  );
}
