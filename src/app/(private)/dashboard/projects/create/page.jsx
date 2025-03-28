import { createProject } from "@/actions/projects";
import Form from "@/components/Form";

export default function CreateProject() {
  return (
    <div>
      <h1>Create Project</h1>
      <Form handler={createProject} type="Project" />
    </div>
  );
}
