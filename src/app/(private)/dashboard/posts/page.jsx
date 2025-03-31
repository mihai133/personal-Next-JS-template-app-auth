import { deletePost } from "@/actions/posts";
import ActionButton from "@/components/DeleteActionButton";
import prisma, { getCollection } from "@/lib/db";
import getAuthUser from "@/lib/getAuthUser";
import { ObjectId } from "mongodb";
import Link from "next/link";

export default async function DashboardPostsPage() {
  const user = await getAuthUser();
  const posts = await prisma.post.findMany({
    where: {
      userId: user.userId,
    },
  });

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="title">Articles</h1>
        <Link href="/dashboard/posts/create">
          <button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-100)] dark:bg-[var(--color-primary-300)] dark:hover:bg-[var(--color-primary-500)] text-white px-4 py-2 rounded-md shadow-sm  transition duration-300 active:bg-slate-800 disabled:bg-slate-300 disabled:text-slate-100 disabled:cursor-not-allowed">
            Create Article
          </button>
        </Link>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {posts.length > 0 ? (
              posts?.map((post) => (
                <tr
                  key={post.id}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <Link href={`/dashboard/posts/show/${post.id.toString()}`}>
                      {post.title}
                    </Link>
                  </th>

                  <td className="px-6 py-4 flex flex-row space-x-4">
                    <Link
                      href={`/dashboard/posts/show/${post.id.toString()}`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      View
                    </Link>
                    <Link
                      href={`/dashboard/posts/edit/${post.id.toString()}`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </Link>
                    <ActionButton
                      action={deletePost}
                      name={"postId"}
                      value={post.id.toString()}
                      label="Delete"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>
                  <p>No posts found</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
