"use client";
import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function GoBackButton({ label }) {
  const router = useRouter();
  return (
    <button
      className="inline-flex gap-3 cursor-pointer"
      onClick={() => router.back()}
    >
      <ArrowLongLeftIcon height={24} width={24} className="" />
      <p>{label}</p>
    </button>
  );
}
