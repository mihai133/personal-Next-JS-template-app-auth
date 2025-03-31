import GoBackButton from "../navigation/GoBackButton";
import getAuthUser from "@/lib/getAuthUser";
import BlogHero from "./BlogHero";

export default async function PostContent({ type, post }) {
  const user = await getAuthUser();
  const userOwns = user?.userId === post.userId.toString();
  const backButtonType =
    (type === "projects" && "Back to Projects") ||
    (type === "posts" && "Back to Blog") ||
    "Go Back";
  console.log(post);

  return (
    <div className="flex flex-col gap-4">
      <BlogHero post={post} userOwns={userOwns} type={type} />

      <p className="container max-w-[600px] mx-auto dark:text-slate-400 text-sm mb-2 text-balance">
        {post.content}
      </p>
    </div>
  );
}
