"use server";

import prisma from "@/lib/db";
import getAuthUser from "@/lib/getAuthUser";
import { BlogPostSchema } from "@/lib/rules";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { uploadFile } from "./uploadFile";

export async function createBlogPost(state, formData) {
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
  const file = formData.get("file");

  const validatedField = BlogPostSchema.safeParse({
    metaTitle,
    metaDesc,
    title,
    content,
  });

  // If any form fields are invalid
  if (!validatedField.success) {
    return {
      errors: validatedField.error.flatten().fieldErrors,
      metaTitle,
      metaDesc,
      title,
      content,
    };
  }

  // Save the post to the database
  try {
    let featImageName = null;
    if (file) {
      // Upload the file
      const uploadResult = await uploadFile(file);
      if (uploadResult?.error) {
        return {
          errors: { file: uploadResult.error },
          title: title,
          content: content,
        };
      }
      console.log(uploadResult);
      featImageName = uploadResult?.name;
    }
    console.log("IMAGE NAME", typeof featImageName, featImageName);
    // return;
    await prisma.post.create({
      data: {
        metaTitle: validatedField.data.metaTitle,
        metaDesc: validatedField.data.metaDesc,
        title: validatedField.data.title,
        content: validatedField.data.content,
        userId: user.userId,
        featImageName: featImageName,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      errors: { title: error.message },
      metaTitle: metaTitle,
      metaDesc: metaDesc,
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
  const metaTitle = formData.get("metaTitle");
  const metaDesc = formData.get("metaDesc");
  const title = formData.get("title");
  const content = formData.get("content");
  const postId = formData.get("postId");
  const file = formData.get("file");
  const existingFeatImageName = formData.get("existingFeatImageName");

  const validatedField = BlogPostSchema.safeParse({
    metaTitle,
    metaDesc,
    title,
    content,
  });

  // If any form fields are invalid
  if (!validatedField.success) {
    return {
      errors: validatedField.error.flatten().fieldErrors,
      metaTitle,
      metaDesc,
      title,
      content,
    };
  }

  // Find the post
  try {
    if (!existingFeatImageName) {
      let featImageName = null;
      if (file) {
        // Upload the file
        const uploadResult = await uploadFile(file);
        if (uploadResult?.error) {
          return {
            errors: { file: uploadResult.error },
            title: title,
            content: content,
          };
        }

        featImageName = uploadResult?.name;
      }
    }

    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        metaTitle: validatedField.data.metaTitle,
        metaDesc: validatedField.data.metaDesc,
        title: validatedField.data.title,
        content: validatedField.data.content,
        featImageName: existingFeatImageName || featImageName,
      },
    });
  } catch (error) {
    console.error(error.message);
    return {
      errors: { title: "Failed to update post" },
      metaTitle: metaTitle,
      metaDesc: metaDesc,
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
