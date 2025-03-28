import PostCard from "@/components/blog/PostCard";
import { getCollection } from "@/lib/db";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default async function ProjectsPage() {
  const projectsCollection = await getCollection("projects");
  const projects = await projectsCollection
    ?.find()
    .sort({ $natural: -1 })
    .toArray();

  if (!projects) {
    return <div className="text-white">Failed to load projects</div>;
  }

  return (
    <div className="container max-w-[900px] mx-auto mt-10 flex flex-col gap-6">
      <h1>Projects</h1>
      {projects.length > 0 ? (
        projects.map((project) => (
          <div key={project._id.toString()}>
            <PostCard path="projects" post={project} />
          </div>
        ))
      ) : (
        <div className="text-white">No projects found</div>
      )}
    </div>
  );
}
