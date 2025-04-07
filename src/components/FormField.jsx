import {
  CheckIcon,
  CloudArrowUpIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import React from "react";

export default function FormField({
  formType,
  label,
  name,
  handleChange,
  state,
  post,
  files,
  handleFile,
  message,
  removeImage,
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
        <div className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg  bg-gray-50  dark:bg-gray-700  dark:border-gray-600    px-6">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 dark:hover:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 border-dashed hover:bg-gray-100 dark:hover:border-gray-500 dark:hover:bg-gray-600 cursor-pointer rounded-lg"
          >
            <div className="flex flex-col items-center justify-center h-full gap-1">
              <CloudArrowUpIcon className="h-10 w-10" />
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
              onChange={handleFile}
              defaultValue={state?.file || post?.file}
            />
          </label>
          <div className="flex flex-wrap w-full gap-2 mt-2">
            {files.map((file, key) => {
              return (
                <div key={key} className="relative w-1/4 rounded-lg">
                  <Image
                    src={URL.createObjectURL(file)}
                    alt="Image Preview"
                    className="relative  aspect-video object-cover shadow-lg shadow-slate-700 dark:shadow-slate-800 rounded-lg"
                    width={600}
                    height={400}
                  />
                  <button onClick={() => removeImage(file.name)}>
                    <XMarkIcon className="absolute right-2 top-1 w-10 h-10 dark:peer-checked:text-[var(--color-primary-100)] dark:text-white cursor-pointer" />
                  </button>
                </div>
              );
            })}
          </div>
          {state?.errors?.file && (
            <p className="error">{state?.errors?.file}</p>
          )}
        </div>
      );

    default:
      <></>;
  }
}
