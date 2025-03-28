"use client";

import { useActionState } from "react";

export default function Form({ handler, post, type }) {
  const [state, action, isPending] = useActionState(handler, undefined);

  return (
    <form action={action} className="space-y-4">
      <input
        type="hidden"
        name={`${type.toLowerCase()}Id`}
        defaultValue={`${post?._id}`}
      />
      <div>
        <label htmlFor="title" className="text-white">
          Title
        </label>
        <input
          type="text"
          name="title"
          placeholder="Title"
          defaultValue={state?.title || post?.title}
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
          rows={12}
          defaultValue={state?.content || post?.content}
        />
      </div>
      <button disabled={isPending} type="submit" className="button-primary">
        {post ? "Update" : "Create"} {type}
      </button>
    </form>
  );
}
