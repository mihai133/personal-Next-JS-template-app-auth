"use client";

import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useActionState, useState } from "react";
import FormField from "./FormField";

export default function Form({ handler, post, type, images }) {
  const [formData, setFormData] = useState(null || post);
  const [state, action, isPending] = useActionState(handler, formData);

  function handleChange(e) {
    if (e.target.name === "file") {
      const file = e.target.files[0];
      setFormData({ ...formData, file: file });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  }

  function handleRemoveImage() {
    setFormData({ ...formData, file: null });
  }

  console.log(formData);
  return (
    <form action={action} className="space-y-4">
      <input
        type="hidden"
        name={`${type.toLowerCase()}Id`}
        defaultValue={`${post?.id}`}
      />
      <h3>Content</h3>
      <FormField
        formType="text"
        label="Title"
        handleChange={handleChange}
        state={state}
        post={post}
      />
      <FormField
        formType="textarea"
        label="Content"
        handleChange={handleChange}
        state={state}
        post={post}
      />

      {type === "Project" && (
        <FormField
          formType="checkbox"
          label="Featured post"
          handleChange={handleChange}
          state={state}
          post={post}
        />
      )}

      {formData?.file && (
        <div className="relative">
          <Image
            src={URL.createObjectURL(formData?.file)}
            alt="Image Preview"
            className="relative w-full aspect-video object-cover rounded-lg"
            width={600}
            height={400}
          />
          <button
            onClick={handleRemoveImage}
            className="absolute top-0 right-0"
          >
            <XMarkIcon className="absolute right-6 top-6 w-10 h-10 dark:peer-checked:text-[var(--color-primary-100)] dark:text-white" />
          </button>
        </div>
      )}
      {post?.featImageName && (
        <Image
          src={post?.featImageName?.publicUrl}
          alt="Image Preview"
          className=" w-full aspect-video object-cover rounded-lg"
          width={600}
          height={400}
        />
      )}
      <FormField
        formType="file"
        label="Featured post"
        handleChange={handleChange}
        state={state}
        post={post}
      />

      <hr className="border-gray-200 dark:border-gray-700" />
      <h3>SEO</h3>
      <FormField
        formType="text"
        label="Meta Title"
        handleChange={handleChange}
        state={state}
        post={post}
      />
      <FormField
        formType="textarea"
        label="Meta Description"
        handleChange={handleChange}
        state={state}
        post={post}
      />

      <button disabled={isPending} type="submit" className="button-primary">
        {post ? "Update" : "Create"} {type}
      </button>
    </form>
  );
}
