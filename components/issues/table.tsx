import Link from "next/link"
import { Status } from "@prisma/client"

import { readIssues } from "@/lib/action/issues"
import {
  Table as ShadTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import StatusBadge from "@/components/status-badge"

export default async function Table() {
  const issues = await readIssues()
  return (
    <ShadTable className="h-full">
      <TableHeader>
        <TableRow className="bg-muted text-sm">
          <TableHead>Issue</TableHead>
          <TableHead className="min-w-14 max-w-20">Status</TableHead>
          <TableHead className="min-w-14 max-w-20">Created</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="text-[13px]">
        {issues.map((issue) => {
          console.log(issue)
          return (
            <TableRow key={issue.id} className="border-muted">
              <Link href={`/issues/${issue.id}`} className="link">
                <TableCell>{issue.title}</TableCell>
              </Link>
              <TableCell className="min-w-14 max-w-20">
                <StatusBadge status={issue.status as Status} />
              </TableCell>
              <TableCell className="min-w-14 max-w-20">
                {issue.createdAt.toDateString()}
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </ShadTable>
  )
}
