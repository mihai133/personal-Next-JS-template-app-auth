import PostCard from "@/components/PostCard";
import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";
import React from "react";

export default async function Show({ params }) {
  const { id } = await params;

  const postsCollection = await getCollection("posts");
  const post =
    id.length === 24
      ? await postsCollection?.findOne({
          _id: ObjectId.createFromHexString(id),
        })
      : null;

  return (
    <div className="container md:w-1/2 mx-auto">
      {post ? (
        <PostCard post={post} showEdit={true} />
      ) : (
        <div>Post not found</div>
      )}
    </div>
  );
}
