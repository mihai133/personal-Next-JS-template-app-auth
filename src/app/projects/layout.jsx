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
      <header>
        <Navigation />
      </header>
      <Suspense fallback={<LoadingArticles title={"Projects"} />}>
        <main className="container max-w-[900px] mx-auto mt-10 min-h-screen">
          {children}
        </main>
      </Suspense>
    </>
  );
}
