import { deleteProject } from "@/actions/projects";
import { getCollection } from "@/lib/db";
import Link from "next/link";
import DeleteActionButton from "@/components/DeleteActionButton";

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

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Title
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {projects.length > 0 ? (
            projects.map((project) => (
              <tr
                key={project._id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <Link
                    href={`/dashboard/projects/show/${project._id.toString()}`}
                  >
                    {project.title}
                  </Link>
                </th>

                <td className="px-6 py-4 flex flex-row space-x-4">
                  <Link
                    href={`/dashboard/projects/show/${project._id.toString()}`}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    View
                  </Link>
                  <Link
                    href={`/dashboard/projects/edit/${project._id.toString()}`}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </Link>
                  <DeleteActionButton
                    action={deleteProject}
                    name={"projectId"}
                    value={project._id.toString()}
                    label="Delete"
                  />
                </td>
              </tr>
            ))
          ) : (
            <p>No posts found</p>
          )}
        </tbody>
      </table>
    </div>
  );
}
