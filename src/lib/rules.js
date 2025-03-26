import { z } from "zod";

export const RegisterFormSchema = z
  .object({
    email: z.string().email({ message: "Please enter a valid email" }),
    password: z
      .string()
      .min(1, { message: "Not be empty" })
      .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
      .regex(/[0-9]/, { message: "Contain at least one number." })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Contain at least one special character.",
      })
      .trim(),
    confirmPassword: z.string().trim(),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }).trim(),
  password: z.string().min(1, { message: "Not be empty" }),
});

export const BlogPostSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: "Title is required" })
    .max(50, { message: "Title cannot be longer than 50 characters" }),
  content: z.string().min(1, { message: "Content is required" }).trim(),
});
