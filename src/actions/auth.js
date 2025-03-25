"use server"

import { getCollection } from "@/lib/db"
import { LoginFormSchema, RegisterFormSchema } from "@/lib/rules"
import { createSession } from "@/lib/sessions"
import bcrypt from "bcrypt"

export async function register(state, formData) {

  // Validate the form data
  const validatedFields = RegisterFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  })

  // If there are any validation errors, return them
  if (!validatedFields.success) {
    console.log(validatedFields)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    }
  }

  // Extract the validated fields
  const {email, password} = validatedFields.data

  // Check if the user already regostered
  const userCollection = await getCollection("users");
  if(!userCollection) {
    return {errorrs: {email: "Server error!"}}
  }

  const existingUser = await userCollection.findOne({email});
  if(existingUser) {
    return {
      errors: {
        email: "User already registered!"
      }
    }
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);


  // Save in DB
  const result = await userCollection.insertOne({
    email,
    password:hashedPassword,
  });

  // Create a session
  await createSession(result.insertedId);

  // Redirect
  console.log(result)
}

export async function login(state, formData) {
  const validatedSchema = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password")
  })

  if(!validatedSchema.success) {
    state.errors = validatedSchema.error.flatten().fieldErrors;
    return;
  }
  const {email, password} = validatedSchema.data;

  const userCollection = await getCollection("users");
  if(!userCollection) {
    return {errorrs: {email: "Server error!"}}
  }

  const existingUser = await userCollection.findOne({email});
  if(!existingUser) {
    return {
      errors: {
        email: "User not found!"
      }
    }
  }

  // Check if the password is correct
  try {
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if(!isPasswordCorrect) {
      return {
        errors: {
          password: "Incorrect password!"
        }
      }
    }
    console.log("Password is correct")
    // Create a session
    const session = await createSession();
    // Store the user in the session
    session.user = existingUser;
    

  } catch (error) {
    console.log(error)
    return {
      errors: {
        password: "Incorrect password!"
      }
    }
  }

  // Redirect
  // redirect("/");
}