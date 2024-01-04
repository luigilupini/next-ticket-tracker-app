import { type Issues } from "@prisma/client"
import ReactMarkdown from "react-markdown"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import StatusBadge from "@/components/status-badge"

import AssigneeSelect from "./assignee-select"
import IssueButtons from "./detail-buttons"

export default function DetailCard({ issue }: { issue: Issues }) {
  return (
    <Card className="w-[70%] border-primary/5 bg-muted/30 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-3xl font-medium">{issue.title}</CardTitle>
          <AssigneeSelect issue={issue} />
          <IssueButtons issue={issue} />
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
