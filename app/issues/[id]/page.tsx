import { Suspense } from "react"
import { notFound } from "next/navigation"
import prisma from "@/prisma/client"

import DetailCard from "@/components/issues/detail-card"
import { CardSkeleton } from "@/components/issues/skeletons"

type Props = {
  params: { id: string }
}

export default async function IssueDetailPage({ params }: Props) {
  const issue = await prisma.issues.findUnique({
    where: { id: Number(params.id) },
  })
  if (!issue) return notFound()
  return (
    <main>
      <Suspense fallback={<CardSkeleton />}>
        <DetailCard issue={issue} />
      </Suspense>
    </main>
  )
}
