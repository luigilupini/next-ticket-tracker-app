import prisma from "@/prisma/client"

import { IssueSummary, LatestIssues } from "@/components/home/cards"
import { IssueChart } from "@/components/home/charts"

export default async function HomePage() {
  const open = await prisma.issues.count({
    where: { status: "OPEN" },
  })
  const progress = await prisma.issues.count({
    where: { status: "IN_PROGRESS" },
  })
  const closed = await prisma.issues.count({
    where: { status: "CLOSED" },
  })

  return (
    <main className="grid h-full w-full grid-cols-1 grid-rows-5 gap-5 md:grid-cols-2">
      <IssueSummary open={open} progress={progress} closed={closed} />
      <IssueChart open={open} progress={progress} closed={closed} />
      <LatestIssues />
    </main>
  )
}
