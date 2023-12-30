import { notFound } from "next/navigation"
import prisma from "@/prisma/client"
import ReactMarkdown from "react-markdown"

import { delay } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import StatusBadge from "@/components/status-badge"

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
    <Card className="relative w-1/2 border shadow-none">
      <CardHeader>
        <CardTitle>{issue.title}</CardTitle>
        <StatusBadge status={issue.status} className="absolute right-2 top-0" />
        <CardDescription>
          <span className="text-xs">{issue.createdAt.toDateString()}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="prose">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  )
}
