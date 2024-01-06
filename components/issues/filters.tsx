"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Status } from "@prisma/client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const statuses: { label: string; value?: Status | "ALL" }[] = [
  { label: "All", value: "ALL" },
  { label: "Open", value: Status.OPEN },
  { label: "In Progress", value: Status.IN_PROGRESS },
  { label: "Closed", value: Status.CLOSED },
]

export function FilterByStatus() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const orderBy = searchParams.get("orderBy")
  const status = searchParams.get("status")

  const handleChange = (status: string) => {
    const params = new URLSearchParams()
    if (status) params.set("status", status)
    if (orderBy) params.set("orderBy", orderBy)
    const url = `/issues?${params.toString()}`
    router.push(url)
  }

  return (
    <Select
      defaultValue={status || undefined}
      onValueChange={(value) => handleChange(value)}
    >
      <SelectTrigger className="h-8 w-36 cursor-pointer shadow-none">
        <SelectValue placeholder="Filter by status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Status</SelectLabel>
          {statuses.map((status) => (
            <SelectItem key={status.label} value={status.value || " "}>
              {status.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
