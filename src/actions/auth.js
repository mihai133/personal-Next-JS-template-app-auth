"use server";

import { getCollection } from "@/lib/db";
import { LoginFormSchema, RegisterFormSchema } from "@/lib/rules";
import { createSession } from "@/lib/sessions";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Validate form fields
// If any form fields are invalid
// Extract form fields
// Check if email exists
// Check if the password is correct
// Create a session
// Redirect

export async function register(state, formData) {
  // Validate the form data
  const validatedFields = RegisterFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  // If there are any validation errors, return them
  if (!validatedFields.success) {
    console.log(validatedFields);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };
  }

  // Extract the validated fields
  const { email, password } = validatedFields.data;

  // Check if the user already regostered
  const userCollection = await getCollection("users");
  if (!userCollection) {
    return { errorrs: { email: "Server error!" } };
  }

  const existingUser = await userCollection.findOne({ email });
  if (existingUser) {
    return {
      errors: {
        email: "User already registered!",
      },
    };
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save in DB
  const result = await userCollection.insertOne({
    email,
    password: hashedPassword,
  });

  // Create a session
  await createSession(result.insertedId.toString());

  // Redirect
  console.log(result);
}

export async function login(state, formData) {
  // Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Extract form fields
  const { email, password } = validatedFields.data;

  // Check if email exists
  const userCollection = await getCollection("users");
  if (!userCollection) return { errorrs: { email: "Server error!" } };

  const existingUser = await userCollection.findOne({ email });
  if (!existingUser) {
    return {
      errors: {
        email: "User not found!",
      },
    };
  }

  // Check if the password is correct
  const matchedPassword = await bcrypt.compare(password, existingUser.password);
  if (!matchedPassword) return { errors: { email: "Invalid credentials!" } };

  // Create a session
  await createSession(existingUser._id.toString());

  // Redirect
  redirect("/dashboard");
}

export async function logout() {
  // Delete the session cookie
  const cookieStore = await cookies();
  cookieStore.delete("session");

  // Redirect
  redirect("/");
}
