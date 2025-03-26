import { createBlogPost } from "@/actions/posts";
import PostForm from "@/components/PostForm";

export default async function createPost() {
  return (
    <div className="container w-1/2 mx-auto">
      <h1 title="title">Create Post</h1>

      <PostForm handler={createBlogPost} />
    </div>
  );
}
