import { Status } from "@prisma/client"
import { z } from "zod"

export const ReadIssueSchema = z.array(
  z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    status: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    assignedToUserId: z.string().nullable(),
  }),
)

const statusEnum = z.enum([Status.OPEN, Status.IN_PROGRESS, Status.CLOSED])

export const CreateIssueSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  description: z
    .string()
    .min(5, "Description is required")
    .max(65535, "Description is too long"),
  status: statusEnum,
})

export const UpdateIssueSchema = z.object({
  id: z.number(),
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  description: z
    .string()
    .min(5, "Description is required")
    .max(65535, "Description is too long"),
  status: statusEnum,
})

export const PatchIssueSchema = z.object({
  id: z.number(),
  assignedToUserId: z
    .string()
    .min(1, "User assignment required")
    .max(100)
    .optional()
    .nullable(),
})
