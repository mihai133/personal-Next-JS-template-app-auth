import LoadingArticles from "@/components/LoadingArticles";
import Navigation from "@/components/Navigation";
import { Suspense } from "react";

export const metadata = {
  title: "TW | Blog Posts Page",
  description: "Blog posts page",
  keywords: "next.js, blog, template",
};

export default async function BlogLayout({ children }) {
  return (
    <>
      <header className="sticky top-3 left-0">
        <Navigation />
      </header>
      <Suspense fallback={<LoadingArticles title={"Projects"} />}>
        <main className=" mx-auto min-h-screen px-3 lg:px-0">{children}</main>
      </Suspense>
    </>
  );
}
