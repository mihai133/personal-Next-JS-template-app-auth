import { getCollection } from "@/lib/db";

export default async function ProjectsPage() {
  const projectsCollection = await getCollection("projects");
  const projects = await projectsCollection
    ?.find()
    .sort({ $natural: -1 })
    .toArray();

  console.log(projects);
  if (!projects) {
    return <div className="text-white">Failed to load projects</div>;
  }

  return (
    <div>
      <h1>Projects</h1>
      {projects.length > 0 ? (
        projects.map((project) => (
          <div key={project._id.toString()}>
            <h2>{project.title}</h2>
            <p>{project.content}</p>
          </div>
        ))
      ) : (
        <div className="text-white">No projects found</div>
      )}
    </div>
  );
}
