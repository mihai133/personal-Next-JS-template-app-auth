import PostCard from "@/components/blog/PostCard";
import prisma, { getCollection } from "@/lib/db";

export default async function BlogPage() {
  const posts = await prisma.post.findMany();

  if (!posts) {
    return <div className="text-white">Failed to load posts</div>;
  }

  return (
    <div className="container max-w-[900px] mx-auto mt-10 flex flex-col gap-6">
      <h1>Blog</h1>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id.toString()}>
            <PostCard path={"posts"} post={post} />
          </div>
        ))
      ) : (
        <div className="text-white">No posts found</div>
      )}
    </div>
  );
}
