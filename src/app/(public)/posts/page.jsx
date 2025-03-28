import PostCard from "@/components/blog/PostCard";
import { getCollection } from "@/lib/db";

export default async function BlogPage() {
  const postsCollection = await getCollection("posts");
  const posts = await postsCollection?.find().sort({ $natural: -1 }).toArray();

  if (!posts) {
    return <div className="text-white">Failed to load posts</div>;
  }

  return (
    <div className="container max-w-[900px] mx-auto mt-10 flex flex-col gap-6">
      <h1>Blog</h1>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id}>
            <PostCard post={post} />
          </div>
        ))
      ) : (
        <div className="text-white">No posts found</div>
      )}
    </div>
  );
}
