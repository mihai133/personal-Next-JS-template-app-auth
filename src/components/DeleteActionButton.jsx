import React from "react";

export default function DeleteActionButton({ action, name, value, label }) {
  return (
    <form action={action}>
      <input type="hidden" name={name} value={value} />

      <button
        type="submit"
        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
      >
        {label}
      </button>
    </form>
  );
}
