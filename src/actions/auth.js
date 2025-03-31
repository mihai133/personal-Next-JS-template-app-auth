"use server";

import prisma from "@/lib/db";
import { LoginFormSchema, RegisterFormSchema } from "@/lib/rules";
import { createSession } from "@/lib/sessions";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save in DB
    const user = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });

    // Create a session
    await createSession(user.id);

    // Redirect
    return { success: true, redirectUrl: "/dashboard" };
  } catch (error) {
    console.error(error);
    return {
      errors: { email: "Failed to register user" },
    };
  }
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

  try {
    // Check if email exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!existingUser) {
      return {
        errors: {
          email: "User not found!",
        },
      };
    }

    // Check if the password is correct
    const matchedPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!matchedPassword) return { errors: { email: "Invalid credentials!" } };

    // Create a session
    await createSession(existingUser.id);

    // Redirect
    redirect("/dashboard");
  } catch (error) {
    console.error(error);
    return {
      errors: { email: "Failed to login" },
    };
  }
}

export async function logout() {
  // Delete the session cookie
  const cookieStore = await cookies();
  cookieStore.delete("session");

  // Redirect
  redirect("/");
}
