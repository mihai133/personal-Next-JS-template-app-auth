import { CheckIcon } from "@heroicons/react/24/outline";
import React from "react";

export default function FormField({
  formType,
  label,
  name,
  handleChange,
  state,
  post,
}) {
  switch (formType) {
    case "text":
      return (
        <div className="flex flex-col">
          <label htmlFor="title" className="text-white">
            {label}
          </label>
          <input
            type="text"
            name={name}
            placeholder="Title"
            onChange={handleChange}
            defaultValue={state?.title || post?.title}
          />
          {state?.errors?.title && (
            <p className="error">{state?.errors?.title}</p>
          )}
        </div>
      );
    case "textarea":
      return (
        <div>
          <label htmlFor="content" className="text-white">
            {label}
          </label>
          <textarea
            name={name}
            placeholder="Content"
            rows={12}
            onChange={handleChange}
            defaultValue={state?.content || post?.content}
          />
        </div>
      );
    case "checkbox":
      return (
        <div className="relative">
          <input
            type="checkbox"
            id="featured"
            name="featured"
            onChange={handleChange}
            defaultChecked={state?.featured || post?.featured}
            className="hidden peer"
          />
          <label
            htmlFor="featured"
            className="flex flex-row items-center justify-between p-5 text-gray-200 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 dark:peer-checked:border-[var(--color-primary-400)] hover:text-gray-600 dark:peer-checked:text-gray-200 dark:peer-checked:bg-[var(--color-primary-600)] peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-500 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <div className="flex flex-col w-fit">
              <div className="w-full text-lg font-semibold">{label}</div>
              <div className="w-full text-sm">
                A JavaScript library for building user interfaces.
              </div>
            </div>
          </label>
          <CheckIcon className="absolute right-6 top-6 w-10 h-10 dark:peer-checked:text-[var(--color-primary-100)] dark:text-gray-500" />
        </div>
      );

    case "file":
      return (
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
              id="dropzone-file"
              type="file"
              className="hidden"
              name={name}
              onChange={handleChange}
              defaultValue={state?.file || post?.file}
            />
          </label>
          {state?.errors?.file && (
            <p className="error">{state?.errors?.file}</p>
          )}
        </div>
      );

    default:
      <></>;
  }
}
