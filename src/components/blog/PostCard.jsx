import Link from "next/link";

export default function PostCard({ post, showEdit }) {
  return (
    <div className="flex flex-col gap-4">
      {showEdit && (
        <Link
          href={`/posts/edit/${post._id.toString()}`}
          className="btn-primary w-fit text-sm"
        >
          Edit
        </Link>
      )}
      <div className=" mb-2 rounded-md h-full">
        <p className="text-slate-400 text-xs">
          {post._id.getTimestamp().toDateString()}
        </p>
        <Link href={`/posts/show/${post._id.toString()}`}>
          <h3 className="text-xs font-bold dark:text-white mb-4">
            {post.title}
          </h3>
        </Link>
        <p className="text-slate-400 text-sm mb-2">{post.content}</p>
        <Link
          href={`/posts/show/${post._id.toString()}`}
          className="dark:text-gray-400 hover:underline"
        >
          Read article
        </Link>
      </div>
    </div>
  );
}
