"use server";

import {
  createProject,
  updateProject,
  deleteProject,
} from "@/actions/projects";
import { getCollection } from "@/lib/db";
import ProjectForm from "@/components/Projects/ProjectForm";
import handler from "@/actions/cautare-dosar";
import CautareDosar from "@/actions/cautare-dosar";
import Link from "next/link";

export default async function DashboardProjectsPage() {
  const projectsCollection = await getCollection("projects");
  const projects = await projectsCollection
    ?.find()
    .sort({ $natural: -1 })
    .toArray();

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="title">Projects</h1>
        <Link href="/dashboard/projects/create">
          <button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-100)] dark:bg-[var(--color-primary-300)] dark:hover:bg-[var(--color-primary-500)] text-white px-4 py-2 rounded-md shadow-sm  transition duration-300 active:bg-slate-800 disabled:bg-slate-300 disabled:text-slate-100 disabled:cursor-not-allowed">
            Create Project
          </button>
        </Link>
      </div>
      {projects.length > 0 ? (
        projects.map((project) => (
          <div key={project._id}>
            <h2>{project.title}</h2>
            <p className="text-white">{project.content}</p>
            <form action={deleteProject}>
              <input
                type="hidden"
                name="projectId"
                value={project._id.toString()}
              />
              <button type="submit" className="text-white">
                Delete
              </button>
            </form>
          </div>
        ))
      ) : (
        <div className="text-white">No projects found</div>
      )}
    </div>
  );
}
