"use server";

import { getCollection } from "@/lib/db";
import getAuthUser from "@/lib/getAuthUser";
import { BlogPostSchema } from "@/lib/rules";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";

export async function createBlogPost(state, formData) {
  // Check if the user is authenticated
  const user = await getAuthUser();
  if (!user) {
    return redirect("/");
  }
  // console.log(user);
  // return;

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
    const postsCollection = await getCollection("posts");
    const post = {
      title: validatedField.data.title,
      content: validatedField.data.content,
      userId: ObjectId.createFromHexString(user.userId),
    };

    await postsCollection.insertOne(post);
  } catch (error) {
    return {
      errors: { title: error.message },
    };
  }
  // Redirect to the dashboard
  redirect("/dashboard");
  console.log(title, content);
}
