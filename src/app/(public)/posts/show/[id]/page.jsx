import PostCard from "@/components/blog/PostCard";
import PostContent from "@/components/blog/PostContent";
import prisma, { getCollection } from "@/lib/db";
import getAuthUser from "@/lib/getAuthUser";
import { ObjectId } from "mongodb";
import React from "react";

export async function generateMetadata({ params, searchParams }, parent) {
  // read route params
  const { id } = await params;

  const post = await prisma.post.findUnique({
    where: {
      id: id,
    },
  });

  return {
    title: post?.metaTitle || post?.title,
    description: post?.metaDesc || post?.content,
  };
}

export default async function ShowPublicPost({ params }) {
  const { id } = await params;

  const user = await getAuthUser();
  const post = await prisma.post.findUnique({
    where: {
      id: id,
    },
  });

  return (
    <>
      {post ? (
        <PostContent
          type={"posts"}
          post={post}
          showEdit={user && user?.userId === post.userId}
        />
      ) : (
        <div>Post not found</div>
      )}
    </>
  );
}
