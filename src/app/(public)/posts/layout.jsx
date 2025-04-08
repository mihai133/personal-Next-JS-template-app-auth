import LoadingArticles from "@/components/LoadingArticles";
import Navigation from "@/components/navigation/Navigation";
import PrivateNavItems from "@/components/navigation/PrivateNavItems";
import { Suspense } from "react";

export const metadata = {
  title: "TW | Blog Posts Page",
  description: "Blog posts page",
  keywords: "next.js, blog, template",
};

export default function BlogLayout({ children }) {
  return (
    <>
      <Navigation serverComponent={<PrivateNavItems />} />
      <Suspense fallback={<LoadingArticles title={"Blog"} />}>
        <main className="mx-auto  min-h-screen px-3 lg:px-0">{children}</main>
      </Suspense>
    </>
  );
}
