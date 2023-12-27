import { z } from "zod";

export const ReadIssueSchema = z.array(
  z.object({
    title: z.string(),
    description: z.string(),
  })
);

export const CreateIssueSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  description: z
    .string()
    .min(5, "Description is required")
    .max(250, "Description is too long"),
});