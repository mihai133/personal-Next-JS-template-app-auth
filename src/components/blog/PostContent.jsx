import Link from "next/link";
import GoBackButton from "../navigation/GoBackButton";
import getAuthUser from "@/lib/getAuthUser";

export default async function PostContent({ type, post }) {
  const user = await getAuthUser();
  const userOwns = user?.userId === post.userId.toString();

  return (
    <div className="flex flex-col gap-4">
      {userOwns && (
        <Link
          href={`/dashboard/${type}/edit/${post._id.toString()}`}
          className="btn-primary w-fit text-sm"
        >
          Edit
        </Link>
      )}
      <div className="bg-white py-24 shadow-md rounded-lg w-full text-white">
        <div className="container-white text-middle max-w-[900px] mx-auto">
          <div className="text-center mb-2 rounded-md h-full space-y-4">
            <GoBackButton label={"Back to Blog"} />
            <h1 className=" text-4xl font-bold">
              {post?.title || "Post not found"}
            </h1>
            <div>
              <p className="text-slate-400 text-xs">
                {post._id.getTimestamp().toDateString()}
              </p>
              <p className="text-center text-gray-600 dark:text-gray-400 text-lg ">
                {post?.excerpt || "No excerpt found"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <p className="container max-w-[600px] mx-auto dark:text-slate-400 text-sm mb-2 text-balance">
        {post.content}
      </p>
    </div>
  );
}
