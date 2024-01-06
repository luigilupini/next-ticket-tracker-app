import Link from "next/link"
import prisma from "@/prisma/client"

import StatusBadge from "../status-badge"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Table, TableBody, TableCell, TableRow } from "../ui/table"

export async function LatestIssues() {
  const issues = await prisma.issues.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      assignedToUser: true,
    },
  })

  return (
    <section className="w-full min-w-96 max-w-xl rounded-md bg-muted p-2 pt-3 shadow">
      <h1 className="mb-1 text-xl">Latest Issues</h1>
      <Table>
        <TableBody>
          {issues.map((issue) => {
            console.log(issue)
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
    </section>
  )
}
