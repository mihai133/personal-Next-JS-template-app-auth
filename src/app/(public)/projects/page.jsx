import PostCard from "@/components/blog/PostCard";
import ProjectCard from "@/components/Projects/ProjectCard";
import prisma, { getCollection } from "@/lib/db";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany();

  if (!projects) {
    return <div className="text-white">Failed to load projects</div>;
  }

  return (
    <div className="container max-w-[900px] mx-auto mt-10 flex flex-col gap-6">
      <h1>Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.length > 0 ? (
          projects.map((project) => (
            <div
              key={project.id.toString()}
              className={`${
                project.featured
                  ? "order-first md:col-span-2 lg:col-span-3"
                  : ""
              }`}
            >
              {/* <PostCard path="projects" post={project} /> */}
              <ProjectCard project={project} path="projects" />
            </div>
          ))
        ) : (
          <div className="text-white">No projects found</div>
        )}
      </div>
    </div>
  );
}
