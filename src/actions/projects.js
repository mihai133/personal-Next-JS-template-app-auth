"use server";

import { getCollection } from "@/lib/db";
import getAuthUser from "@/lib/getAuthUser";
import { ProjectSchema } from "@/lib/projectRules";
import { ObjectId } from "mongodb";
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
    const projectsCollection = await getCollection("projects");
    const project = {
      title: validatedField.data.title,
      content: validatedField.data.content,
      userId: ObjectId.createFromHexString(user.userId),
    };

    await projectsCollection.insertOne(project);
  } catch (error) {
    return {
      errors: { title: error.message },
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
  const projectsCollection = await getCollection("projects");
  const project = await projectsCollection.findOne({
    _id: ObjectId.createFromHexString(projectId),
  });

  // Check if the user owns the project
  if (user.userId !== project.userId.toString()) return redirect("/");

  // Update the project in the database
  projectsCollection.findOneAndUpdate(
    {
      _id: project._id,
    },
    {
      $set: {
        title: validatedField.data.title,
        content: validatedField.data.content,
      },
    }
  );

  // Revalidate path
  revalidatePath("/dashboard/projects");
  redirect("/dashboard/projects");
}

export async function deleteProject(formData) {
  // Check if the user is authenticated
  const user = await getAuthUser();
  if (!user) return redirect("/");

  // Find the project
  const projectsCollection = await getCollection("projects");
  const project = await projectsCollection.findOne({
    _id: ObjectId.createFromHexString(formData.get("projectId")),
  });

  // Check if the user owns the project
  if (user.userId !== project.userId.toString()) return redirect("/");

  // Delete the project
  projectsCollection
    .findOneAndDelete({
      _id: project._id,
    })
    .then(() => {
      revalidatePath("/dashboard/projects");
    });
}
