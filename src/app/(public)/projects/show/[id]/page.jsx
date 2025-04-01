import PostCard from "@/components/blog/PostCard";
import PostContent from "@/components/blog/PostContent";
import prisma, { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";
import React from "react";

export async function generateMetadata({ params, searchParams }, parent) {
  // read route params
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: {
      id: id,
    },
  });

  return {
    title: project?.metaTitle || project?.title,
    description: project?.metaDesc || project?.content,
  };
}

export default async function ShowPublicProject({ params }) {
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: {
      id: id,
    },
  });

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
