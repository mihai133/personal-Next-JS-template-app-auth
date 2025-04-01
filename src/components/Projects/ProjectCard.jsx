import React from "react";
import OverlayCard from "../ui/OverlayCard";
import Link from "next/link";
import { StarIcon } from "@heroicons/react/24/outline";

export default function ProjectCard({ project, path }) {
  console.log(project.featured);
  return (
    <>
      <OverlayCard
        className="relative"
        spotlightColor={`${
          project.featured
            ? "var(--color-primary-500)"
            : "rgba(255, 255, 255, 0.25)"
        }`}
      >
        <div>
          <Link href={`/${path}/show/${project.id.toString()}`}>
            <h3 className="pointer dark:text-white title">{project.title}</h3>
          </Link>
          <p className="text-slate-400 text-sm mb-2 truncate">
            {project.content}
          </p>
        </div>
        <Link
          href={`/${path}/show/${project.id.toString()}`}
          className="dark:text-gray-400 hover:underline"
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
