import GoBackButton from "../navigation/GoBackButton";
import getAuthUser from "@/lib/getAuthUser";
import BlogHero from "./BlogHero";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default async function PostContent({ type, post }) {
  const user = await getAuthUser();
  const userOwns = user?.userId === post.userId.toString();

  return (
    <div className="flex flex-col gap-4">
      <BlogHero post={post} userOwns={userOwns} type={type} />

      <div className="post-content-container container max-w-[800px] mx-auto dark:text-slate-400 text-sm mb-2 text-balance space-y-4 text-pretty">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
