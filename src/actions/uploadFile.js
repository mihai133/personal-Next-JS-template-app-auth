"use server";

import fs from "node:fs/promises";
import { revalidatePath } from "next/cache";

export async function uploadFile(file) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  console.log(file);

  await fs.writeFile(`./public/uploads/${file.name}`, buffer);

  return file;
}
