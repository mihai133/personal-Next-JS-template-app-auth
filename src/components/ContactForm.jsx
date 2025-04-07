"use client";

import React from "react";
import OverlayCard from "./ui/OverlayCard";
import { XMarkIcon } from "@heroicons/react/24/outline";
import FormField from "./FormField";

export default function ContactForm({
  showForm,
  toggleForm,
  action,
  state,
  isPending,
}) {
  return (
    <OverlayCard
      className={`flex flex-col justify-between ${
        showForm
          ? "max-sm:translate-y-25 lg:translate-x-75 transition duration-300  ease-in-out"
          : "max-sm:translate-y-0 lg:translate-x-0 transition duration-300 delay-150 ease-in-out"
      }`}
    >
      <div>
        <div className="flex justify-between">
          <h3 className="text-white title">Send a message</h3>
          {showForm && (
            <button onClick={toggleForm}>
              <XMarkIcon className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white cursor-pointer" />
            </button>
          )}
        </div>
        <p className="text-slate-400 text-sm mt-4 mb-4">
          Use a form to send a message to me. I will get back to you as soon as
          possible.
        </p>
        {showForm && (
          <form
            action={action}
            className={`${
              showForm
                ? "opacity-100 transition duration-300 delay-150 ease-in-out"
                : "opacity-0 transition duration-300 ease-in-out"
            } space-y-4`}
          >
            <div>
              <label htmlFor="name" className="label">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="input"
                placeholder="Name"
                // defaultValue={state?.name}
              />
              {state?.errors?.name && (
                <p className="error">{state?.errors?.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="label">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="input"
                placeholder="Email"
                // defaultValue={state?.email}
              />
              {state?.errors?.email && (
                <p className="error">{state?.errors?.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="label">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                className="textarea"
                placeholder="Message"
                // defaultValue={state?.message}
                rows={6}
              />
              {state?.errors?.message && (
                <p className="error">{state?.errors?.message}</p>
              )}
            </div>
            {state?.successMessage ? (
              <div className="text-center text text-xl py-4 text-green-600">
                {state?.successMessage}
              </div>
            ) : (
              <div className="flex items-end gap-4">
                <button
                  disabled={isPending}
                  className="button-secondary w-full  mt-4"
                >
                  {isPending ? "Sending..." : "Send message"}
                </button>
              </div>
            )}
          </form>
        )}
      </div>

      {!showForm && (
        <button className="button-secondary mt-4" onClick={toggleForm}>
          {isPending ? "Sending..." : "Send message"}
        </button>
      )}
    </OverlayCard>
  );
}
