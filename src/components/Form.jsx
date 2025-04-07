"use client";

import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useActionState, useState } from "react";
import FormField from "./FormField";
import { useUploadFile } from "@/lib/hooks";

export default function Form({ handler, post, type, images }) {
  const [files, setFile, message, handleFile, removeImage] = useUploadFile(1);
  const [state, action, isPending] = useActionState(handler, null);

  console.log(post);
  return (
    <form action={action} className="space-y-4">
      {post && (
        <input
          type="hidden"
          name={`${type.toLowerCase()}Id`}
          defaultValue={`${post?.id}`}
        />
      )}
      <h3>Content</h3>
      <FormField
        formType="text"
        label="Title"
        name={`title`}
        // handleChange={handleChange}
        state={state}
        post={post}
      />
      <FormField
        formType="textarea"
        label="Content"
        name={`content`}
        // // handleChange={handleChange}
        state={state}
        post={post}
      />

      {type === "Project" && (
        <FormField
          formType="checkbox"
          label="Featured post"
          name={`featured`}
          // // handleChange={handleChange}
          state={state}
          post={post}
        />
      )}

      {!!post?.featImage && (
        <>
          <Image
            src={post?.featImage?.publicUrl}
            alt="Image Preview"
            edi
            className=" w-full aspect-video object-cover rounded-lg"
            width={600}
            height={400}
          />
          <input
            defaultValue={post?.featImageName}
            name="existingFeatImageName"
          />
        </>
      )}

      {type === "Post" && (
        <FormField
          formType="file"
          label="Featured Image (Optional)"
          name="files[]"
          state={state}
          post={post}
          files={files}
          handleFile={handleFile}
          message={message}
          removeImage={removeImage}
        />
      )}
      <hr className="border-gray-200 dark:border-gray-700" />
      <h3>SEO</h3>
      <FormField
        formType="text"
        label="Meta Title"
        name={`metaTitle`}
        // // handleChange={handleChange}
        state={state}
        post={post}
      />
      <FormField
        formType="textarea"
        label="Meta Description"
        name={`metaDesc`}
        // // handleChange={handleChange}
        state={state}
        post={post}
      />

      <button disabled={isPending} type="submit" className="button-primary">
        {post ? "Update" : "Create"} {type}
      </button>
    </form>
  );
}
