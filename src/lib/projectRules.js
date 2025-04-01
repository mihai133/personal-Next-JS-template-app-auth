import * as z from "zod";

export const ProjectSchema = z.object({
  metaTitle: z
    .string()
    .max(70, { message: "Meta Title cannot be longer than 70 characters" })
    .optional(),
  metaDesc: z
    .string()
    .max(150, {
      message: "Meta Description cannot be longer than 150 characters",
    })
    .optional(),
  title: z.string().min(1, {
    message: "Title must not be empty.",
  }),
  content: z.string().min(1, {
    message: "Content must not be empty.",
  }),
  featured: z.boolean({ message: "Boolean value expected." }).optional(),
});
