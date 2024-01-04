"use server"

import prisma from "@/prisma/client"

// ...
import { ReadUserSchema } from "@/lib/schema/users"

export const readUsers = async () => {
  const response = await prisma.user.findMany({
    orderBy: { name: "asc" },
  })

  const validate = ReadUserSchema.safeParse(response)

  if (!validate.success) throw new Error(validate.error.message)
  return validate.data
}
