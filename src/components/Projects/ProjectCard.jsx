import React from "react";
import OverlayCard from "../ui/OverlayCard";
import Link from "next/link";
import { StarIcon } from "@heroicons/react/24/outline";

export default function ProjectCard({ project, path }) {
  return (
    <>
      <OverlayCard
        className="relative z-[1]"
        spotlightColor={`${
          project.featured
            ? "var(--color-primary-500)"
            : "rgba(255, 255, 255, 0.25)"
        }`}
      >
        <div className="pe-10">
          <h3 className=" text-white dark:text-white title font-bold mb-2 text-balance">
            <Link href={`/${path}/show/${project.id.toString()}`}>
              {project.title}
            </Link>
          </h3>
          <p className="text-slate-400 text-sm mb-6 truncate">
            {project.content}
          </p>
        </div>
        <Link
          href={`/${path}/show/${project.id.toString()}`}
          className="text-white dark:text-gray-400 hover:underline"
        >
          Read project
        </Link>
        {project.featured && (
          <StarIcon className="absolute right-4 top-4 w-8 h-8 text-yellow-500 dark:text-[var(--color-primary-100)]" />
        )}
      </OverlayCard>
    </>
  );
}
