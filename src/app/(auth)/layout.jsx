import LoadingArticles from "@/components/LoadingArticles";
import Navigation from "@/components/Navigation";
import { Suspense } from "react";

export const metadata = {
  title: "TW | Blog Posts Page",
  description: "Blog posts page",
  keywords: "next.js, blog, template",
};

export default function BlogLayout({ children }) {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <main className="">{children}</main>
    </>
  );
}
