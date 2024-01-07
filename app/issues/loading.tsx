import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { NewIssue } from "@/components/issues/buttons"
import Skeleton from "@/components/skeleton"

export default function Loading() {
  const issues = [1, 2, 3, 4, 5, 6]
  return (
    <main className="flex flex-col gap-6">
      <NewIssue disabled={true} />
      <div className="flex-1 overflow-hidden rounded-md border shadow-sm">
        <Table className="h-full">
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead>Issue</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="max-w-7">Created</TableHead>
              <TableHead className="max-w-7">Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-[13px]">
            {issues.map((issue) => (
              <TableRow key={issue} className="border-muted">
                <TableCell>
                  <Skeleton />
                </TableCell>
                <TableCell>
                  <Skeleton />
                </TableCell>
                <TableCell className="max-w-7">
                  <Skeleton />
                </TableCell>
                <TableCell className="max-w-7">
                  <Skeleton />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  )
}
