"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import prisma from "@/prisma/client"

// ...
import {
  CreateIssueSchema,
  ReadIssueSchema,
  UpdateIssueSchema,
} from "@/lib/schema/issues"

import { delay } from "../utils"

export const readIssues = async () => {
  const response = await prisma.issues.findMany()
  const validate = ReadIssueSchema.safeParse(response)

  if (!validate.success) throw new Error(validate.error.message)
  return validate.data
}

export const createIssue = async (data: any) => {
  const validate = CreateIssueSchema.safeParse(data)

  await delay(3000)

  if (!validate.success) {
    console.log(validate.error.format())
    throw new Error(validate.error.message)
  }

  const { title, description } = validate.data

  const response = await prisma.issues.create({
    data: {
      title: title,
      description: description,
    },
  })

  console.log(response)
  revalidatePath("/issues")
  redirect("/issues")
}

export const updateIssue = async (data: any) => {
  console.log(data)
  const validate = UpdateIssueSchema.safeParse(data)

  await delay(3000)

  if (!validate.success) throw new Error(validate.error.message)

  const { id, title, description } = validate.data

  const response = await prisma.issues.update({
    where: {
      id: id,
    },
    data: {
      title: title,
      description: description,
    },
  })

  console.log(response)
  revalidatePath("/issues")
  redirect("/issues")
}
