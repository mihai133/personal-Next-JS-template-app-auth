import { createBlogPost, updatePost } from "@/actions/posts";
import Form from "@/components/Form";
import prisma, { getCollection } from "@/lib/db";
import getAuthUser from "@/lib/getAuthUser";
import { ObjectId } from "mongodb";
import React from "react";

export default async function Edit({ params }) {
  const { id } = await params;
  const user = await getAuthUser();

  const post = await prisma.post.findUnique({
    where: {
      id: id,
    },
  });

  if (post?.userId !== user?.userId) {
    return (
      <div className="text-white">You are not allowed to edit this post</div>
    );
  }

  return (
    <div className="container md:w-1/2 mx-auto">
      <h1 title="title" className="title">
        Edit Post
      </h1>

      {post ? (
        <Form handler={updatePost} post={post} type="Post" />
      ) : (
        <p>Error</p>
      )}
    </div>
  );
}
