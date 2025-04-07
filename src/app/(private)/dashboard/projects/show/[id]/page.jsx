import PostContent from "@/components/blog/PostContent";
import prisma, { getCollection } from "@/lib/db";
import getAuthUser from "@/lib/getAuthUser";
import { ObjectId } from "mongodb";
import React from "react";

export default async function ShowDashboardProject({ params }) {
  const { id } = await params;

  const user = await getAuthUser();

  const project = await prisma.project.findUnique({
    where: {
      id: id,
    },
  });

  return (
    <>
      {project ? (
        <PostContent type={"projects"} post={project} />
      ) : (
        <div className="text-white">Project not found</div>
      )}
    </>
  );
}
