import PostContent from "@/components/blog/PostContent";
import prisma, { getCollection } from "@/lib/db";
import getAuthUser from "@/lib/getAuthUser";
import { ObjectId } from "mongodb";
import React from "react";

export default async function ShowDashboardProject({ params }) {
  const { id } = await params;

  const user = await getAuthUser();

  // const projectsCollection = await getCollection("projects");
  // const project =
  //   id.length === 24
  //     ? await projectsCollection?.findOne({
  //         _id: ObjectId.createFromHexString(id),
  //       })
  //     : null;
  // console.log(typeof user?.userId);
  // console.log(typeof project.userId.toString());
  console.log(id.length);
  const project = await prisma.project.findUnique({
    where: {
      id: id,
    },
  });

  console.log(project);
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
