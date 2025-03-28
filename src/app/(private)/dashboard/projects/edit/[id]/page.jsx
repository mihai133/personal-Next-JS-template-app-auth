import { updateProject } from "@/actions/projects";
import Form from "@/components/Form";
import { getCollection } from "@/lib/db";
import getAuthUser from "@/lib/getAuthUser";
import { ObjectId } from "mongodb";

export default async function Edit({ params }) {
  const { id } = await params;

  const user = await getAuthUser();

  const projectsCollection = await getCollection("projects");
  let project;
  if (id.length === 24 && projectsCollection) {
    project = await projectsCollection.findOne({
      _id: ObjectId.createFromHexString(id),
    });

    project = JSON.parse(JSON.stringify(project));

    if (user?.userId !== project.userId) {
      return (
        <div className="text-white">
          You are not allowed to edit this project
        </div>
      );
    }
  } else {
    project = null;
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
