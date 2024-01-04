import { z } from "zod"

export const ReadUserSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    emailVerified: z.null(),
    image: z.string(),
  }),
)
