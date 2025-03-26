import PostCard from "@/components/PostCard";
import { getCollection } from "@/lib/db";

export default async function HomePage() {
  const postsCollection = await getCollection("posts");
  const posts = await postsCollection?.find().sort({ $natural: -1 }).toArray();

  console.log(posts);
  if (posts) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <div key={post._id}>
            <PostCard post={post} />
          </div>
        ))}
      </div>
    );
  } else {
    return <div>No posts found</div>;
  }
}
