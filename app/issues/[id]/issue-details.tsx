import Link from "next/link"
import { type Issues } from "@prisma/client"
import { PenBoxIcon } from "lucide-react"
import ReactMarkdown from "react-markdown"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import StatusBadge from "@/components/status-badge"

export default function IssueDetails({ issue }: { issue: Issues }) {
  return (
    <Card className="w-[70%] border-primary/5 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-4xl uppercase">{issue.title}</CardTitle>
          <Link href={`/issues/${issue.id}/edit`}>
            <Button className="text-[13px]" variant="default" size="sm">
              <PenBoxIcon className="mr-2 h-4 w-4" />
              Edit Issue
            </Button>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status={issue.status} className="inline-block" />
          <span className="text-sm opacity-70">
            {issue.createdAt.toLocaleDateString()}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <article className="rounded-lg border bg-muted p-4">
          <div className="prose">
            <ReactMarkdown>{issue.description}</ReactMarkdown>
          </div>
        </article>
      </CardContent>
    </Card>
  )
}
