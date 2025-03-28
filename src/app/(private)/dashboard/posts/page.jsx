"use server";

import { deleteProject } from "@/actions/projects";
import { getCollection } from "@/lib/db";
import getAuthUser from "@/lib/getAuthUser";
import { ObjectId } from "mongodb";
import Link from "next/link";

export default async function DashboardPostsPage() {
  const user = await getAuthUser();
  const postsCollection = await getCollection("posts");
  const posts = await postsCollection
    ?.find({
      userId: ObjectId?.createFromHexString(user.userId),
    })
    .sort({ $natural: -1 })
    .toArray();

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="title">Articles</h1>
        <Link href="/dashboard/posts/create">
          <button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-100)] dark:bg-[var(--color-primary-300)] dark:hover:bg-[var(--color-primary-500)] text-white px-4 py-2 rounded-md shadow-sm  transition duration-300 active:bg-slate-800 disabled:bg-slate-300 disabled:text-slate-100 disabled:cursor-not-allowed">
            Create Article
          </button>
        </Link>
      </div>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id}>
            <h2>{post.title}</h2>
            <p className="text-white">{post.content}</p>
            <Link
              href={`/dashboard/posts/edit/${post._id.toString()}`}
              className="text-white"
            >
              Edit
            </Link>
            <form action={deleteProject}>
              <input
                type="hidden"
                name="projectId"
                value={post._id.toString()}
              />

              <button type="submit" className="text-white">
                Delete
              </button>
            </form>
          </div>
        ))
      ) : (
        <div className="text-white">No projects found</div>
      )}
    </div>
  );
}
