"use server";

import prisma from "@/lib/db";
import { LoginFormSchema, RegisterFormSchema } from "@/lib/rules";
import { createSession } from "@/lib/sessions";
import { createServerComponentClient } from "@/lib/supabase/supabaseServer";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function register(state, formData) {
  const supabase = await createServerComponentClient();
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
    // const hashedPassword = await bcrypt.hash(password, 10);
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    console.log(data);
    if (error) {
      console.log(error);
      return {
        errors: { email: "Failed to register user" },
      };
    }

    // Save in DB
    // Create AuthUsers record first
    const authUser = await prisma.user.create({
      data: {
        id: data.user.id,
        email: email,
        password: password,
      },
    });
    console.log("AuthUsers record created:", authUser); // Log authUser

    // // Then create User record, linking to AuthUsers
    // const user = await prisma.user.create({
    //   data: {
    //     supabaseUserId: authUser.id, // Use authUser.id here
    //     email: email,
    //     password: hashedPassword,
    //   },
    // });
    // console.log("User record created:", user); // Log user

    // Create a session
    await createSession(data.user.id);

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
  const supabase = await createServerComponentClient();
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
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    // Check if email exists
    // const existingUser = await prisma.user.findUnique({
    //   where: {
    //     email: email,
    //   },
    // });

    // if (!existingUser) {
    //   return {
    //     errors: {
    //       email: "User not found!",
    //     },
    //   };
    // }

    // Check if the password is correct
    // const matchedPassword = await bcrypt.compare(
    //   password,
    //   userResponse.user.password
    // );

    // if (!matchedPassword) return { errors: { email: "Invalid credentials!" } };

    console.log("DATA", data);
    // Create a session
    await createSession(data.user.id);

    // Redirect
    return { success: true, redirectUrl: "/dashboard" };
  } catch (error) {
    console.error(error);
    return {
      errors: { email: "Failed to login" },
    };
  }
}

export async function logout() {
  const supabase = await createServerComponentClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
    return {
      errors: { email: "Failed to logout" },
    };
  }
  // Delete the session cookie
  const cookieStore = await cookies();
  cookieStore.delete("session");

  // Redirect
  redirect("/");
}
