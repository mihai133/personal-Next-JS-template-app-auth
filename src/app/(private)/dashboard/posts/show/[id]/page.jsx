import PostCard from "@/components/blog/PostCard";
import PostContent from "@/components/blog/PostContent";
import { getCollection } from "@/lib/db";
import getAuthUser from "@/lib/getAuthUser";
import { ObjectId } from "mongodb";
import React from "react";

export async function generateMetadata({ params, searchParams }, parent) {
  // read route params
  const { id } = await params;
  const postsCollection = await getCollection("posts");
  const post =
    id.length === 24
      ? await postsCollection?.findOne({
          _id: ObjectId.createFromHexString(id),
        })
      : null;

  return {
    title: post?.title,
    description: post?.content,
  };
}

export default async function Show({ params }) {
  const { id } = await params;

  const user = await getAuthUser();

  const postsCollection = await getCollection("posts");
  const post =
    id.length === 24
      ? await postsCollection?.findOne({
          _id: ObjectId.createFromHexString(id),
        })
      : null;

  return (
    <>
      {post ? (
        <PostContent
          post={post}
          showEdit={user && user?.userId === post.userId}
        />
      ) : (
        <div>Post not found</div>
      )}
    </>
  );
}
