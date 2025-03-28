"use client";
import { sendMessage } from "@/actions/contact";
import GoBackButton from "@/components/navigation/GoBackButton";
import { FadeIn } from "@/components/ui/FadeIn";
import OverlayCard from "@/components/ui/OverlayCard";
import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { useActionState, useState } from "react";

export default function ContactPage() {
  const [showForm, setShowForm] = useState(false);
  const [state, action, isPending] = useActionState(sendMessage, null);

  function toggleForm() {
    setShowForm(!showForm);
  }

  return (
    <FadeIn duration={1000}>
      <div className="relative flex flex-col items-center min-h-[90vh] justify-center z-[10]">
        <div
          className={`flex flex-col items-center ${
            showForm
              ? "max-sm:translate-y-25 transition duration-300  ease-in-out"
              : "max-sm:translate-y-0 transition duration-300 delay-150 ease-in-out"
          }}`}
        >
          <GoBackButton label={"Back to Home"} className={"dark:text-white"} />
          <h1 className="dark:text-white title">Contact</h1>;
        </div>
        <div
          className={`grid grid-cols-1 min-h-72 lg:grid-cols-2 lg:max-w-[1200px]  gap-4 mt-10 transition duration-300 ease-in-out`}
        >
          <OverlayCard
            className={`flex flex-col justify-between ${
              showForm
                ? "max-sm:translate-y-25 lg:translate-x-75 transition duration-300  ease-in-out"
                : "max-sm:translate-y-0 lg:translate-x-0 transition duration-300 delay-150 ease-in-out"
            }`}
          >
            <div>
              <div className="flex justify-between">
                <h3 className="dark:text-white title">Send a message</h3>
                {showForm && (
                  <button onClick={toggleForm}>
                    <XMarkIcon className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white cursor-pointer" />
                  </button>
                )}
              </div>
              <p className="text-slate-400 text-sm mt-4 mb-4">
                Use a form to send a message to me. I will get back to you as
                soon as possible.
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

                  <div className="flex items-end gap-4">
                    <button
                      disabled={false}
                      className="button-secondary w-full  mt-4"
                    >
                      {false ? "Sending..." : "Send message"}
                    </button>
                  </div>
                </form>
              )}
            </div>
            {!showForm && (
              <button className="button-secondary mt-4" onClick={toggleForm}>
                Send message
              </button>
            )}
          </OverlayCard>

          <OverlayCard
            className={`flex flex-col justify-between ${
              showForm
                ? "opacity-0 translate-x-full transition duration-300 ease-in-out"
                : "opacity-100 translate-x-0 transition duration-300 delay-150 ease-in-out"
            }`}
          >
            <div>
              <h3 className="dark:text-white title">Send a mail</h3>
              <p className="text-slate-400 text-sm mb-2">
                Use the old school way to send a mail to me. I will get back to
                you as soon as possible.
              </p>
            </div>
            <button className="button-secondary ">Open mail</button>
          </OverlayCard>

          {/* <OverlayCard className="flex flex-col justify-between">
            <div>
              <h3 className="dark:text-white title">Social media</h3>
              <p className="text-slate-400 text-sm mb-2">
                Follow me on social media to stay updated on my latest projects.
              </p>
            </div>
          </OverlayCard> */}
        </div>
      </div>
    </FadeIn>
  );
}
