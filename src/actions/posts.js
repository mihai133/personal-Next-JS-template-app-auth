"use server";

import prisma from "@/lib/db";
import getAuthUser from "@/lib/getAuthUser";
import { BlogPostSchema } from "@/lib/rules";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createBlogPost(state, formData) {
  // Check if the user is authenticated
  const user = await getAuthUser();
  if (!user) {
    return redirect("/");
  }

  // Validate the form fields
  const title = formData.get("title");
  const content = formData.get("content");

  const validatedField = BlogPostSchema.safeParse({
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

  // Save the post to the database
  try {
    const post = await prisma.post.create({
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
  // Redirect to the dashboard
  revalidatePath("/dashboard/posts");
  redirect("/dashboard/posts");
}

export async function updatePost(state, formData) {
  // Check if the user is authenticated
  const user = await getAuthUser();
  if (!user) return redirect("/");

  // Validate the form fields
  const title = formData.get("title");
  const content = formData.get("content");
  const postId = formData.get("postId");

  const validatedField = BlogPostSchema.safeParse({
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

  // Find the post
  try {
    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        title: validatedField.data.title,
        content: validatedField.data.content,
      },
    });
  } catch (error) {
    console.error(error.message);
    return {
      errors: { title: "Failed to update post" },
      title: title,
      content: content,
    };
  }

  // Redirect to the dashboard
  revalidatePath("/dashboard/posts");
  redirect("/dashboard/posts");
}

export async function deletePost(formData) {
  // Check if the user is authenticated
  const postId = formData.get("postId");
  const user = await getAuthUser();
  if (!user) return redirect("/");

  try {
    // Delete the post
    await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    revalidatePath("/dashboard/posts");
  } catch (error) {
    console.error(error);
    return {
      errors: { title: "Failed to delete post" },
    };
  }

  // Revalidate path
  revalidatePath("/dashboard/posts");
}
