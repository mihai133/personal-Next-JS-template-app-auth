import { createBlogPost } from "@/actions/posts";
import Form from "@/components/Form";
import fs from "node:fs/promises";

export default async function CreatePost() {
  const files = await fs.readdir("./public/uploads");
  const images = files
    .filter((file) => file.endsWith(".jpg") || file.endsWith(".png"))
    .map((file) => ({
      path: `/uploads/${file}`,
    }));

  return (
    <div className="container md:w-1/2 mx-auto">
      <h1 title="title">Create Post</h1>
      <Form handler={createBlogPost} type="Post" images={images} />
      images
    </div>
  );
}
