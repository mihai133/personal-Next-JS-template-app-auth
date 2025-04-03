"use server";

import fs from "node:fs/promises";
import { revalidatePath } from "next/cache";
import supabase from "@/lib/storage";
import { cookies } from "next/headers";
import { createServerComponentClient } from "../lib/supabase/supabaseServer";

export async function uploadFile(file) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  const supabase = await createServerComponentClient();

  console.log(file);

  // await fs.writeFile(`./public/uploads/${file.name}`, buffer);
  const { data, error } = await supabase.storage
    .from("uploads")
    .upload(`${file.name}`, buffer, {
      cacheControl: "3600",
      upsert: true,
    });
  console.log(data);
  console.log(error);
  return file;
}
