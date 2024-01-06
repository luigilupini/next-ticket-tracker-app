"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import prisma from "@/prisma/client"
import { Issues, Status } from "@prisma/client"

// ...
import {
  CreateIssueSchema,
  PatchIssueSchema,
  ReadIssueSchema,
  UpdateIssueSchema,
} from "@/lib/schema/issues"
import { delay } from "@/lib/utils"

let currentSortOrder = "asc"
function toggleSortOrder() {
  currentSortOrder = currentSortOrder === "asc" ? "desc" : "asc"
  // console.log(currentSortOrder)
  return currentSortOrder
}

export const readIssues = async ({
  status,
  orderBy = "id",
  page,
  pageSize,
}: {
  status: Status | undefined | "ALL"
  orderBy: keyof Issues | undefined
  page: number
  pageSize: number
}) => {
  await delay(1000)

  const issues =
    status === "ALL" || undefined
      ? await prisma.issues.findMany({
          orderBy: {
            [orderBy]: toggleSortOrder(),
          },
          // The number of records we "skip" per page request
          skip: (page - 1) * pageSize,
          // The number of records per page we want request
          take: pageSize,
        })
      : await prisma.issues.findMany({
          where: {
            status: status,
          },
          orderBy: {
            [orderBy]: toggleSortOrder(),
          },
          // The number of records we "skip" per page request
          skip: (page - 1) * pageSize,
          // The number of records per page we want request
          take: pageSize,
        })

  const validate = ReadIssueSchema.safeParse(issues)

  if (!validate.success) throw new Error(validate.error.message)

  return validate.data
}

export const readIssueCount = async (status: Status | undefined | "ALL") => {
  const issuesCount =
    status === "ALL" || undefined
      ? await prisma.issues.count()
      : await prisma.issues.count({
          where: {
            status: status as Status,
          },
        })

  return issuesCount
}

export const createIssue = async (data: any) => {
  const validate = CreateIssueSchema.safeParse(data)

  await delay(1000)

  if (!validate.success) {
    console.log(validate.error.format())
    throw new Error(validate.error.message)
  }

  const { title, description, status } = validate.data

  const response = await prisma.issues.create({
    data: {
      title: title,
      description: description,
      status: status,
    },
  })

  revalidatePath("/issues")
  redirect("/issues")
}

export const updateIssue = async (data: any) => {
  const validate = UpdateIssueSchema.safeParse(data)

  await delay(1000)

  if (!validate.success) throw new Error(validate.error.message)

  const { id, title, description, status } = validate.data

  const response = await prisma.issues.update({
    where: {
      id: id,
    },
    data: {
      title: title,
      description: description,
      status: status,
    },
  })

  revalidatePath("/issues")
  redirect("/issues")
}

export const patchIssue = async (data: any) => {
  const validate = PatchIssueSchema.safeParse(data)

  await delay(1000)

  if (!validate.success) throw new Error(validate.error.message)

  const { id, assignedToUserId } = validate.data

  const issue = await prisma.issues.update({
    where: {
      id: id,
    },
    data: {
      assignedToUserId:
        assignedToUserId === "unassigned" ? null : assignedToUserId,
    },
  })
  if (!issue) throw new Error(`Problem updating issue: ${issue}`)
  revalidatePath("/issues")
}

export const deleteIssue = async (id: number) => {
  await delay(1000)

  const issue = await prisma.issues.findUnique({
    where: {
      id: id,
    },
  })
  if (!issue) throw new Error(`The issue ${issue} not found`)

  const response = await prisma.issues.delete({
    where: {
      id: id,
    },
  })

  return response
}
