import Link from "next/link"
import { Status } from "@prisma/client"

import { readIssues } from "@/lib/action/issues"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import StatusBadge from "@/components/status-badge"

export default async function IssuesPage() {
  const issues = await readIssues()
  return (
    <main className="flex flex-col gap-6">
      <Button className="w-fit" size="sm">
        <Link href="/issues/new">New Issue</Link>
      </Button>

      <div className="flex-1 overflow-hidden rounded-md border shadow-sm">
        <Table className="h-full">
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead>Issue</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-[13px]">
            {issues.map((issue) => (
              <TableRow key={issue.id} className="border-muted">
                <TableCell>{issue.title}</TableCell>
                <TableCell>
                  <StatusBadge status={issue.status as Status} />
                </TableCell>
                <TableCell className="text-right">
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
