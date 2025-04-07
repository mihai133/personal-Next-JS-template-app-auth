import { createBlogPost, updatePost } from "@/actions/posts";
import Form from "@/components/Form";
import prisma, { getCollection } from "@/lib/db";
import getAuthUser from "@/lib/getAuthUser";
import { createServerComponentClient } from "@/lib/supabase/supabaseServer";
import { ObjectId } from "mongodb";
import React from "react";

export default async function Edit({ params }) {
  const { id } = await params;
  const supabase = await createServerComponentClient();
  const user = await getAuthUser();

  const postData = await prisma.post.findUnique({
    where: {
      id: id,
    },
  });

  const { data: featuredImageFromSupabase } = supabase.storage
    .from("uploads")
    .getPublicUrl(`public/${postData?.featImageName}`);
  if (postData?.userId !== user?.userId) {
    return (
      <div className="text-white">You are not allowed to edit this post</div>
    );
  }

  const post = {
    ...postData,
    featImage: postData?.featImageName && featuredImageFromSupabase,
  };

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
