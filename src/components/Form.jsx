"use client";

import { PencilIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useActionState, useRef, useState, useEffect } from "react";

export default function Form({ handler, post, type, images }) {
  const [state, action, isPending] = useActionState(handler, undefined);
  const uploadRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);

  // const handleFileChange = (event) => {
  //   const file = event.target.files?.[0];

  //   if (file) {
  //     const reader = new FileReader();

  //     reader.onloadend = () => {
  //       setImagePreview(reader.result);
  //     };

  //     reader.readAsDataURL(file);
  //   } else {
  //     setImagePreview(null);
  //   }
  // };
  console.log(post);
  return (
    <form action={action} className="space-y-4">
      <input
        type="hidden"
        name={`${type.toLowerCase()}Id`}
        defaultValue={`${post?.id}`}
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

      {imagePreview ? (
        <div className="relative">
          <img
            src={imagePreview}
            alt="Image Preview"
            className="relative w-full h-64 object-cover rounded-lg"
          />

          <button
            className="absolute top-0 right-0 z-10 p-2 text-gray-500 transition duration-300 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white cursor-pointer"
            onClick={() => setImagePreview(null)}
          >
            <PencilIcon className="w-6 h-6" />
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.5 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              ref={uploadRef}
              id="dropzone-file"
              type="file"
              className="hidden"
              name="file"
              defaultValue={state?.file}
              // onChange={handleFileChange}
            />
          </label>
        </div>
      )}

      <button disabled={isPending} type="submit" className="button-primary">
        {post ? "Update" : "Create"} {type}
      </button>
    </form>
  );
}
