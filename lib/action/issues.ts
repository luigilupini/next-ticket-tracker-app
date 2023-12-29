"use server"

import { redirect } from "next/navigation"
import prisma from "@/prisma/client"

// ...
import { CreateIssueSchema, ReadIssueSchema } from "@/lib/schema/issues"

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
  redirect("/issues")
}
