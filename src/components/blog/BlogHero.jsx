import Image from "next/image";
import Link from "next/link";
import React from "react";
import GoBackButton from "../navigation/GoBackButton";
import { createServerComponentClient } from "@/lib/supabase/supabaseServer";

export default async function BlogHero({ post, userOwns, type }) {
  const supabase = await createServerComponentClient();
  const backButtonType =
    (type === "projects" && "Back to Projects") ||
    (type === "posts" && "Back to Blog") ||
    "Go Back";

  const { data: featuredImage } = supabase.storage
    .from("uploads")
    .getPublicUrl(`public/${post?.featImageName}`);

  const imageUrl = featuredImage
    ? `url('${featuredImage?.publicUrl}')`
    : `url('/uploads/${post?.featImageName}')`;

  return (
    <div
      className="relative max-xl:h-94 xl:aspect-video xl:max-w-7xl xl:w-[1400px]  flex flex-col items-center justify-center rounded-b-xl mx-auto bg-[var(--color-primary-100)] dark:bg-[var(--color-primary-500)] z-1"
      style={{
        backgroundImage: post?.featImageName ? imageUrl : "none",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 bg-black/50 bg-gradient-to-b from-[var(--color-background-dark)]/100 to-transparent rounded-b-xl"></div>
      <div className="relative z-10 p-4 flex flex-col items-center justify-center ">
        {userOwns && (
          <Link
            href={`/dashboard/${type}/edit/${post.id.toString()}`}
            className="btn-primary w-fit text-sm text-white mb-4"
          >
            Edit
          </Link>
        )}

        <div className="flex flex-col items-center justify-center text-white space-y-4">
          <GoBackButton label={backButtonType} />
          <h1 className="text-4xl text-center text-pretty font-bold text-white">
            {post?.title || "Post not found"}
          </h1>
          <div>
            <p className="text-center text-gray-200 text-lg ">
              {"Post categories"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
