import { updateProject } from "@/actions/projects";
import Form from "@/components/Form";
import prisma, { getCollection } from "@/lib/db";
import getAuthUser from "@/lib/getAuthUser";
import { ObjectId } from "mongodb";

export default async function EditDashboardProject({ params }) {
  const { id } = await params;

  const user = await getAuthUser();

  const project = await prisma.project.findUnique({
    where: {
      id: id,
    },
  });

  if (project?.userId !== user?.userId) {
    return (
      <div className="text-white">You are not allowed to edit this post</div>
    );
  }

  return (
    <div>
      <h1>Update Project</h1>
      {project ? (
        <Form handler={updateProject} post={project} type="Project" />
      ) : (
        <p>Error retrieving project</p>
      )}
    </div>
  );
}
