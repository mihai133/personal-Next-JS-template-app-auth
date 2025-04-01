"use server";

import prisma from "@/lib/db";
import getAuthUser from "@/lib/getAuthUser";
import { ProjectSchema } from "@/lib/projectRules";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProject(state, formData) {
  // Check if the user is authenticated
  const user = await getAuthUser();
  if (!user) {
    return redirect("/");
  }

  // Validate the form fields
  const metaTitle = formData.get("metaTitle");
  const metaDesc = formData.get("metaDesc");
  const title = formData.get("title");
  const content = formData.get("content");
  const featured = formData.get("featured") ? true : false;

  const validatedField = ProjectSchema.safeParse({
    metaTitle,
    metaDesc,
    title,
    content,
    featured,
  });
  // If any form fields are invalid
  if (!validatedField.success) {
    return {
      errors: validatedField.error.flatten().fieldErrors,
      metaTitle,
      metaDesc,
      title,
      content,
      featured,
    };
  }

  // Save the project to the database
  try {
    await prisma.project.create({
      data: {
        metaTitle: validatedField.data.metaTitle,
        metaDesc: validatedField.data.metaDesc,
        title: validatedField.data.title,
        content: validatedField.data.content,
        featured: validatedField.data.featured,
        userId: user.userId,
      },
    });
  } catch (error) {
    return {
      errors: { title: error.message },
      title: title,
      content: content,
    };
  }

  // Redirect to the dashboard projects page
  revalidatePath("/dashboard/projects");
  redirect("/dashboard/projects");
}

export async function updateProject(state, formData) {
  // Check if the user is authenticated
  const user = await getAuthUser();
  if (!user) return redirect("/");

  // Validate the form fields
  const projectId = formData.get("projectId");
  const metaTitle = formData.get("metaTitle");
  const metaDesc = formData.get("metaDesc");
  const title = formData.get("title");
  const content = formData.get("content");
  const featured = formData.get("featured") ? true : false;

  const validatedField = ProjectSchema.safeParse({
    metaTitle,
    metaDesc,
    title,
    content,
    featured,
  });

  // If any form fields are invalid
  if (!validatedField.success) {
    return {
      errors: validatedField.error.flatten().fieldErrors,
      metaTitle: metaTitle,
      metaDesc: metaDesc,
      title: title,
      content: content,
      featured: featured,
    };
  }
  // Find the project
  try {
    await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        metaTitle: validatedField.data.metaTitle,
        metaDesc: validatedField.data.metaDesc,
        title: validatedField.data.title,
        content: validatedField.data.content,
        featured: validatedField.data.featured,
      },
    });
  } catch (error) {
    console.error(error);
    return {
      errors: { title: "Failed to update project" },
    };
  }

  // Revalidate path
  revalidatePath("/dashboard/projects");
  redirect("/dashboard/projects");
}

export async function deleteProject(formData) {
  // Check if the user is authenticated
  const user = await getAuthUser();
  if (!user) return redirect("/");

  const projectId = formData.get("projectId");

  try {
    // Delete the project
    await prisma.project.delete({
      where: {
        id: projectId,
      },
    });
    revalidatePath("/dashboard/projects");
  } catch (error) {
    console.error(error);
    return {
      errors: { title: "Failed to delete project" },
    };
  }
}
