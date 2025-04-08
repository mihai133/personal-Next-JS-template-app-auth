import GoBackButton from "../navigation/GoBackButton";
import getAuthUser from "@/lib/getAuthUser";
import BlogHero from "./BlogHero";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default async function PostContent({ type, post }) {
  const user = await getAuthUser();
  const userOwns = user?.userId === post.userId.toString();

  return (
    <div className="flex flex-col gap-4 max-w-screen md:max-w-[1400px] mx-auto">
      <BlogHero post={post} userOwns={userOwns} type={type} />

      <div className="post-content-container container max-w-[900px] mx-auto dark:text-slate-400 dark:bg-neutral-900 rounded-lg px-4 py-6 lg:px-6 lg:py-10 text-sm mb-2 text-balance space-y-4 text-pretty">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
