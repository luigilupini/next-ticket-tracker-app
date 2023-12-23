import prisma from "@/prisma/client";
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
  title: z.string().min(1).max(255),
  description: z.string().min(1),
});

type CreateIssue = z.infer<typeof CreateIssueSchema>;

export const createIssue = async (data: CreateIssue) => {
  const validate = CreateIssueSchema.safeParse(data);
  if (!validate.success) throw new Error(validate.error.message);

  console.log(validate.data);

  // const response = await prisma.issues.create({
  //   data: validate.data,
  // });
  // return response;
};
