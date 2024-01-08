import { Suspense } from "react"
import { Issues, Status } from "@prisma/client"
import { z } from "zod"

import ErrorBanner from "@/components/error-banner"
import { NewIssue } from "@/components/issues/buttons"
import { FilterByStatus } from "@/components/issues/filters"
import { TableSkeleton } from "@/components/issues/skeletons"
import IssuesTable from "@/components/issues/table"

export type IssueParams = {
  status?: Status
  orderBy?: keyof Issues
  page?: string
}

type Props = {
  searchParams: IssueParams
}

const searchParamsSchema = z.object({
  status: z.enum(["ALL", "OPEN", "IN_PROGRESS", "CLOSED"]).optional(),
  orderBy: z
    .enum(["id", "title", "status", "createdAt", "updatedAt"])
    .optional(),
  page: z.string().optional(),
})

export default async function IssuesPage({ searchParams }: Props) {
  const validate = searchParamsSchema.safeParse(searchParams)

  if (!validate.success) {
    const message = JSON.stringify(validate.error.flatten().fieldErrors)
    return <ErrorBanner message={message} />
  }

  return (
    <main className="flex flex-col gap-6">
      <nav className="flex items-center justify-between">
        <FilterByStatus />
        <NewIssue />
      </nav>

      <Suspense fallback={<TableSkeleton />}>
        <IssuesTable searchParams={searchParams} />
      </Suspense>
    </main>
  )
}
