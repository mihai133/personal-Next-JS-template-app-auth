import { createBlogPost } from "@/actions/posts";
import PostForm from "@/components/blog/PostForm";

export default async function CreatePost() {
  return (
    <div className="container md:w-1/2 mx-auto">
      <h1 title="title">Create Post</h1>

      <PostForm handler={createBlogPost} />
    </div>
  );
}
