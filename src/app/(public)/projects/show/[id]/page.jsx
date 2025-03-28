import PostContent from "@/components/blog/PostContent";
import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";
import React from "react";

export default async function Show({ params }) {
  const { id } = await params;

  const projectsCollection = await getCollection("projects");
  const project =
    id.length === 24
      ? await projectsCollection?.findOne({
          _id: ObjectId.createFromHexString(id),
        })
      : null;

  return (
    <>
      {project ? (
        <PostContent type={"projects"} post={project} showEdit={true} />
      ) : (
        <div>Project not found</div>
      )}
    </>
  );
}
