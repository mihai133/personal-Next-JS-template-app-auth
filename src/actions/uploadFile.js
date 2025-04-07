"use server";

import fs from "node:fs/promises";
import { revalidatePath } from "next/cache";
import supabase from "@/lib/storage";
import { cookies } from "next/headers";
import { createServerComponentClient } from "../lib/supabase/supabaseServer";

export async function uploadFile(file) {
  // const arrayBuffer = await file.arrayBuffer();
  // const buffer = new Uint8Array(arrayBuffer);

  const supabase = await createServerComponentClient();

  // await fs.writeFile(`./public/uploads/${file.name}`, buffer);
  console.log(file);
  if (file) {
    const { data, error } = supabase.storage
      .from("uploads")
      .upload(`/public/${file.name}`, file, {
        cacheControl: "3600",
        upsert: true,
      });
    return file || undefined;
  }
}
