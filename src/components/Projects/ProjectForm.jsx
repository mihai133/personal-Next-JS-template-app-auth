"use client";

import { useActionState } from "react";

export default function ProjectForm({ handler, project }) {
  const [state, action, isPending] = useActionState(handler, undefined);

  console.log(state);
  return (
    <form action={action}>
      <input type="hidden" name="projectId" defaultValue={project?._id} />
      <div>
        <label htmlFor="title" className="text-white">
          Title
        </label>
        <input
          type="text"
          name="title"
          placeholder="Title"
          defaultValue={project?.title}
        />
        {state?.errors?.title && (
          <p className="error">{state?.errors?.title}</p>
        )}
      </div>
      <div>
        <label htmlFor="content" className="text-white">
          Content
        </label>
        <textarea
          name="content"
          placeholder="Content"
          defaultValue={project?.content}
        />
      </div>
      <button type="submit" className="text-white">
        {project ? "Update" : "Create"} Project
      </button>
    </form>
  );
}
