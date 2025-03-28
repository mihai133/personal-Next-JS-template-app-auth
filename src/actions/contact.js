"use server";

import { ContactFormSchema } from "@/lib/rules";
import sendMail from "@/lib/send-mail";
import { revalidatePath } from "next/cache";

export async function sendMessage(state, formData) {
  // Validate the form fields
  const validatedFields = ContactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  console.log(validatedFields);
  // If any form fields are invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };
  }

  // Extract the validated fields
  const { name, email, message } = validatedFields.data;

  // Send the message
  await sendMail(name, email, message);

  // Redirect to the dashboard
  revalidatePath("/contact");
}
