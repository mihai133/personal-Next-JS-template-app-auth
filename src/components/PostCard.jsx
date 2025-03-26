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
      <div className="border border-slate-400 border-dashed p-4 rounded-md h-full">
        <p className="text-slate-400 text-xs">
          {post._id.getTimestamp().toDateString()}
        </p>
        <Link href={`/posts/show/${post._id.toString()}`}>{post.title}</Link>
        <p className="text-slate-400 text-sm">{post.content}</p>
      </div>
    </div>
  );
}
