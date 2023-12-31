import { notFound } from "next/navigation"
import prisma from "@/prisma/client"

import { delay } from "@/lib/utils"

import IssueDetails from "./issue-details"

type Props = {
  params: { id: string }
}

export default async function IssueDetailPage({ params }: Props) {
  const issue = await prisma.issues.findUnique({
    where: { id: Number(params.id) },
  })
  if (!issue) return notFound()
  await delay(1000)
  return (
    <main>
      <IssueDetails issue={issue} />
    </main>
  )
}
