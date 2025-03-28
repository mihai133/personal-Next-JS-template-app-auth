import { createProject } from "@/actions/projects";
import ProjectForm from "@/components/Projects/ProjectForm";
import React from "react";

export default async function Edit({ params }) {
  const { id } = await params;

  const user = await getAuthUser();

  const projectsCollection = await getCollection("projects");
  let project;
  if (id.length === 24 && projectsCollection) {
    project = await projectsCollection.findOne({
      _id: ObjectId.createFromHexString(id),
    });
    return (
      <div>
        <h1>Create Project</h1>
        <ProjectForm action={createProject} project={project} />
      </div>
    );
  }
}
