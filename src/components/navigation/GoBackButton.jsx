"use client";
import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import React from "react";

export default function GoBackButton({ label, className }) {
  const router = useRouter();
  return (
    <button
      className={`inline-flex gap-3 cursor-pointer ${className} `}
      onClick={() => router.back()}
    >
      <ArrowLongLeftIcon height={24} width={24} className="" />
      <p>{label}</p>
    </button>
  );
}
