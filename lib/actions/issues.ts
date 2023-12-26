"use server";

import prisma from "@/prisma/client";
import { redirect } from "next/navigation";
import { z } from "zod";

const ReadIssueSchema = z.array(
  z.object({
    title: z.string(),
    description: z.string(),
  })
);

export const readIssues = async () => {
  const response = await prisma.issues.findMany();
  const validate = ReadIssueSchema.safeParse(response);
  if (!validate.success) throw new Error(validate.error.message);
  return validate.data;
};

const CreateIssueSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(250, "Description is too long"),
});

type CreateIssue = z.infer<typeof CreateIssueSchema>;

export const createIssue = async (data: CreateIssue) => {
  const validate = CreateIssueSchema.safeParse(data);
  if (!validate.success) {
    console.log(validate.error.message);
    throw new Error(validate.error.message);
  }
  const { title, description } = validate.data;

  const response = await prisma.issues.create({
    data: {
      title: title,
      description: description,
    },
  });
  console.log(response);
  redirect("/issues");
};
