import Link from "next/link";

export default function PostCard({ path, post, showEdit }) {
  const CTARead =
    (path === "projects" && "Read project") ||
    (path === "posts" && "Read article") ||
    "Read";

  return (
    <div className="flex flex-col gap-4">
      {showEdit && (
        <Link
          href={`/${path}/edit/${post._id.toString()}`}
          className="btn-primary w-fit text-sm"
        >
          Edit
        </Link>
      )}
      <div className=" mb-2 rounded-md h-full">
        <p className="text-slate-400 text-xs">
          {post._id.getTimestamp().toDateString()}
        </p>
        <Link href={`/${path}/show/${post._id.toString()}`}>
          <h3 className="text-xs font-bold dark:text-white mb-4">
            {post.title}
          </h3>
        </Link>
        <p className="text-slate-500 text-sm mb-2 line-clamp-3">
          {post.content}
        </p>
        <Link
          href={`/${path}/show/${post._id.toString()}`}
          className="dark:text-gray-400 hover:underline"
        >
          {CTARead}
        </Link>
      </div>
    </div>
  );
}
