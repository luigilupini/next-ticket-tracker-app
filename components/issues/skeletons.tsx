import { Box, Card, Flex } from "@radix-ui/themes"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Skeleton from "@/components/skeleton"

export function TableSkeleton() {
  const issues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  return (
    <main className="flex flex-col gap-6">
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

export function CardSkeleton() {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Flex className="space-x-3" my="2">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Card
        className="prose mt-4 rounded-lg border bg-muted/50 p-6 shadow"
        mt="4"
      >
        <Skeleton count={3} />
      </Card>
    </Box>
  )
}

export function FormSkeleton() {
  return (
    <Box className="mt-1 flex max-w-xl flex-col gap-2">
      <Skeleton height="2rem" />
      <Skeleton height="2rem" width="11rem" />
      <Skeleton height="24rem" />
      <Skeleton height="2rem" width="11rem" className="mt-8" />
    </Box>
  )
}
