import { createProject } from "@/actions/projects";
import ProjectForm from "@/components/Projects/ProjectForm";
import React from "react";

export default function CreateProject() {
  return (
    <div>
      <h1>Create Project</h1>
      <ProjectForm handler={createProject} />
    </div>
  );
}
