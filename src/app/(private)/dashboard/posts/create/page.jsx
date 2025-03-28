import { createBlogPost } from "@/actions/posts";
import PostForm from "@/components/blog/PostForm";
import Form from "@/components/Form";

export default async function CreatePost() {
  return (
    <div className="container md:w-1/2 mx-auto">
      <h1 title="title">Create Post</h1>

      <Form handler={createBlogPost} type="Post" />
    </div>
  );
}
