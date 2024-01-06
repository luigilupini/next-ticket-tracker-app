import { Issues } from "@prisma/client"

export const columns: {
  label: string
  value: keyof Issues
  className?: string
}[] = [
  {
    label: "Issue",
    value: "title",
    className: "max-w-[40%] w-full",
  },
  {
    label: "Status",
    value: "status",
  },
  {
    label: "Created",
    value: "createdAt",
  },
  {
    label: "Updated",
    value: "updatedAt",
  },
]
