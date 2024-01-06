import Link from "next/link"
import { Issues, Status } from "@prisma/client"
import { ArrowUpDown } from "lucide-react"

import { readIssueCount, readIssues } from "@/lib/action/issues"
import { lastSeen } from "@/lib/utils"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { columns } from "@/components/issues/columns"
import { BasicPagination } from "@/components/issues/pagination"
import StatusBadge from "@/components/status-badge"
import { IssueParams } from "@/app/issues/page"

export default async function IssuesTable({
  searchParams,
}: {
  searchParams: IssueParams
}) {
  let orderBy = searchParams?.orderBy
  let status = searchParams?.status
  let page = parseInt(searchParams.page || "1")
  const pageSize = 6

  // prettier-ignore
  const issues = await readIssues({
    status,
    orderBy,
    page,
    pageSize,
  }) as Issues[]

  const issuesCount = await readIssueCount(status)

  return (
    <section className="flex flex-col gap-4">
      <div className="flex-1 overflow-hidden rounded-lg border shadow-sm">
        <Table className="h-full w-full min-w-[600px]">
          <TableHeader>
            <TableRow className="bg-muted text-sm">
              {columns.map(({ value, className, label }) => (
                <TableHead key={value} className={className}>
                  <span className="flex items-center gap-2">
                    <Link href={{ query: { ...searchParams, orderBy: value } }}>
                      {label}
                    </Link>
                    {value === orderBy && (
                      <ArrowUpDown
                        size={22}
                        className="rounded-md bg-muted-foreground/10 p-1 shadow-sm"
                      />
                    )}
                  </span>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody className="text-[13px]">
            {issues.map((issue) => {
              return (
                <TableRow key={issue.id} className="border-muted">
                  <TableCell>
                    <Link href={`/issues/${issue.id}`} className="link">
                      {issue.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={issue.status as Status} />
                  </TableCell>
                  <TableCell>{issue.createdAt.toDateString()}</TableCell>
                  <TableCell>{lastSeen(issue.updatedAt)}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
      <BasicPagination amount={issuesCount} size={pageSize} current={page} />
    </section>
  )
}
