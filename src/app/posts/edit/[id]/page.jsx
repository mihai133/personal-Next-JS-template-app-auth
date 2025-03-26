import { createBlogPost, updatePost } from "@/actions/posts";
import PostCard from "@/components/PostCard";
import PostForm from "@/components/PostForm";
import { getCollection } from "@/lib/db";
import getAuthUser from "@/lib/getAuthUser";
import { ObjectId } from "mongodb";
import React from "react";

export default async function Edit({ params }) {
  const { id } = await params;

  const user = await getAuthUser();

  const postsCollection = await getCollection("posts");
  let post;
  if (id.length === 24 && postsCollection) {
    post = await postsCollection.findOne({
      _id: ObjectId.createFromHexString(id),
    });

    post = JSON.parse(JSON.stringify(post));
    if (user?.userId !== post.userId) {
      return <div>You are not allowed to edit this post</div>;
    }
  } else {
    post = null;
  }

  return (
    <div className="container md:w-1/2 mx-auto">
      <h1 title="title" className="title">
        Edit Post
      </h1>

      {post ? <PostForm handler={updatePost} post={post} /> : <p>Error</p>}
    </div>
  );
}
