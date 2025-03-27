import PostCard from "@/components/blog/PostCard";
import { getCollection } from "@/lib/db";

export default async function ProjectsIndex() {
  const postsCollection = await getCollection("posts");
  const posts = await postsCollection?.find().sort({ $natural: -1 }).toArray();

  if (posts) {
    return (
      <div className="flex flex-col gap-6">
        <h1>Projects</h1>
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
