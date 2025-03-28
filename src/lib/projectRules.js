import * as z from "zod";

export const ProjectSchema = z.object({
  title: z.string().min(1, {
    message: "Title must not be empty.",
  }),
  content: z.string().min(1, {
    message: "Content must not be empty.",
  }),
});
