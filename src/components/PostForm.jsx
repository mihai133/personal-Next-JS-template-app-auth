"use client";

import { useActionState } from "react";

export default function PostForm({ handler }) {
  const [state, action, isPending] = useActionState(handler, undefined);
  return (
    <form action={action} className="space-y-4">
      <div>
        <label htmlFor="title" className="label">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className="input"
          placeholder="Title"
          defaultValue={state?.title}
        />
        {state?.errors?.title && (
          <p className="error">{state?.errors?.title}</p>
        )}
      </div>

      <div>
        <label htmlFor="content" className="label">
          Content
        </label>
        <textarea
          name="content"
          id="content"
          className="textarea"
          placeholder="Content"
          defaultValue={state?.content}
          rows={6}
        />
        {state?.errors?.content && (
          <p className="error">{state?.errors?.content}</p>
        )}
      </div>

      <div className="flex items-end gap-4">
        <button disabled={isPending} className="btn-primary">
          {isPending ? "Loading..." : "Submit"}
        </button>
      </div>
    </form>
  );
}
