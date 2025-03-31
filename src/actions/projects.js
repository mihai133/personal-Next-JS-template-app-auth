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
  const title = formData.get("title");
  const content = formData.get("content");

  const validatedField = ProjectSchema.safeParse({
    title,
    content,
  });
  // If any form fields are invalid
  if (!validatedField.success) {
    return {
      errors: validatedField.error.flatten().fieldErrors,
      title,
      content,
    };
  }

  // Save the project to the database
  try {
    await prisma.project.create({
      data: {
        title: validatedField.data.title,
        content: validatedField.data.content,
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
  const title = formData.get("title");
  const content = formData.get("content");
  const projectId = formData.get("projectId");

  const validatedField = ProjectSchema.safeParse({
    title,
    content,
  });

  // If any form fields are invalid
  if (!validatedField.success) {
    return {
      errors: validatedField.error.flatten().fieldErrors,
      title,
      content,
    };
  }

  // Find the project
  try {
    const project = await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        title: validatedField.data.title,
        content: validatedField.data.content,
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
