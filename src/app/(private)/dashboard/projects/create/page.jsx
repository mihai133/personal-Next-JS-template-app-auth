import { createProject } from "@/actions/projects";
import Form from "@/components/Form";

export default function CreateDashboardProject() {
  return (
    <div className="container md:w-1/2 mx-auto">
      <h1>Create Project</h1>
      <Form handler={createProject} type="Project" />
    </div>
  );
}
