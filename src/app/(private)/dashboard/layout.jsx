import LoadingArticles from "@/components/LoadingArticles";
import Navigation from "@/components/Navigation";
import Sidebar from "@/components/Sidebar";
import { Suspense } from "react";

export const metadata = {
  title: "TW | Blog Posts Page",
  description: "Blog posts page",
  keywords: "next.js, blog, template",
};

export default function BlogLayout({ children }) {
  return (
    <>
      <Sidebar />
      <main className="p-4 sm:ml-64 min-h-screen">{children}</main>
    </>
  );
}
