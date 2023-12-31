import Link from "next/link"
import { Status } from "@prisma/client"

import { readIssues } from "@/lib/action/issues"
import { delay } from "@/lib/utils"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import StatusBadge from "@/components/status-badge"
import IssueButton from "@/app/issues/issue-button"

export default async function IssuesPage() {
  const issues = await readIssues()
  await delay(1000) // Simulate network latency
  return (
    <main className="flex flex-col gap-6">
      <IssueButton />
      <div className="flex-1 overflow-hidden rounded-md border shadow-sm">
        <Table className="h-full">
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead>Issue</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="max-w-7">Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-[13px]">
            {issues.map((issue) => (
              <TableRow key={issue.id} className="border-muted">
                <Link href={`/issues/${issue.id}`} className="link">
                  <TableCell>{issue.title}</TableCell>
                </Link>
                <TableCell>
                  <StatusBadge status={issue.status as Status} />
                </TableCell>
                <TableCell className="max-w-7">
                  {issue.createdAt.toDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  )
}
