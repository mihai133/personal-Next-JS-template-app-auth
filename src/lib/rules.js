import { z } from "zod"

export const RegisterFormSchema = z.object({
  email: z.string().email({message: "Please enter a valid email"}),
  password: z
  .string()
  .min(8, { message: 'Be at least 8 characters long' })
  .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
  .regex(/[0-9]/, { message: 'Contain at least one number.' })
  .regex(/[^a-zA-Z0-9]/, {
    message: 'Contain at least one special character.',
  })
  .trim(),
  confirmPassword: z.string().trim(),
}).superRefine((val, ctx) => {
  if (val.password !== val.confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Passwords do not match",
      path: ["confirmPassword"],
    })
  }
})

export const LoginFormSchema = z.object({
  email: z.string().email().trim(),
  password: z.string().trim(),
})