"use client";
import { sendMessage } from "@/actions/contact";
import ContactForm from "@/components/ContactForm";
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
          <h1 className="dark:text-white title">Contact</h1>
        </div>
        <div
          className={`grid grid-cols-1 min-h-72 lg:grid-cols-2 lg:max-w-[1200px]  gap-4 mt-10 transition duration-300 ease-in-out`}
        >
          <ContactForm
            showForm={showForm}
            toggleForm={toggleForm}
            action={action}
            state={state}
            isPending={isPending}
          />

          <OverlayCard
            className={`flex flex-col justify-between ${
              showForm
                ? "opacity-0 translate-x-full transition duration-300 ease-in-out"
                : "opacity-100 translate-x-0 transition duration-300 delay-150 ease-in-out"
            }`}
          >
            <div>
              <h3 className="text-white title">Send a mail</h3>
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
