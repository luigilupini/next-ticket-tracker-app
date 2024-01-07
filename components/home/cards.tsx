import Link from "next/link"
import prisma from "@/prisma/client"
import { Status } from "@prisma/client"

import StatusBadge from "../status-badge"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Card } from "../ui/card"
import { Table, TableBody, TableCell, TableRow } from "../ui/table"

export async function LatestIssues() {
  const issues = await prisma.issues.findMany({
    orderBy: { createdAt: "desc" },
    take: 12,
    include: {
      assignedToUser: true,
    },
  })

  return (
    <article className="col-start-2 row-span-5 row-start-1 flex h-full w-full flex-col justify-start gap-3 rounded-md border p-3">
      <h1 className="mt-2 font-medium">Latest Issues</h1>
      <Table className="flex-1">
        <TableBody>
          {issues.map((issue) => {
            return (
              <TableRow key={issue.id} className="h-8">
                <TableCell>
                  <article className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Link
                        href={`/issues/${issue.id}`}
                        className="link text-xs text-primary/80"
                      >
                        {issue.title}
                      </Link>
                      <StatusBadge status={issue.status} className="scale-90" />
                    </div>
                    {issue.assignedToUser ? (
                      <div className="flex place-items-center gap-2 text-primary/80">
                        <p className="text-xs">{issue.assignedToUser.email}</p>
                        <Avatar className="h-6 w-6">
                          <AvatarImage
                            src={issue.assignedToUser.image!}
                            alt="@user"
                          />
                          <AvatarFallback>
                            {issue.assignedToUser.name![0].toUpperCase() +
                              issue.assignedToUser.name![1].toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    ) : (
                      <p className="text-xs text-primary/80">
                        Unassigned <span className="text-primary/60">•</span>
                      </p>
                    )}
                  </article>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </article>
  )
}

interface Props {
  open: number
  progress: number
  closed: number
}

export function IssueSummary({ open, progress, closed }: Props) {
  const containers: {
    label: string
    value: number
    status: Status
  }[] = [
    { label: "Open Issues", value: open, status: "OPEN" },
    { label: "Progress Issues", value: progress, status: "IN_PROGRESS" },
    { label: "Closed Issues", value: closed, status: "CLOSED" },
  ]

  return (
    <article className="row-span-1 flex h-full w-full gap-4">
      {containers.map(({ status, label, value }) => (
        <Card
          key={label}
          className="h-full w-full border shadow-none transition-shadow duration-200 ease-in-out hover:shadow-md"
        >
          <Link
            href={`/issues?status=${status}`}
            key={label}
            className="h-full w-full"
          >
            <div className="flex h-full flex-col items-center justify-center gap-1">
              <h1 className="font-bold">{value}</h1>
              <p className="text-wrap text-sm text-primary/80">{label}</p>
            </div>
          </Link>
        </Card>
      ))}
    </article>
  )
}
