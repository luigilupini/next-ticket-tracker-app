import { NewIssue } from "@/components/issues/buttons"
import Table from "@/components/issues/table"

export default async function IssuesPage() {
  return (
    <main className="flex flex-col gap-6">
      <NewIssue />
      <div className="flex-1 overflow-hidden rounded-lg border shadow-sm">
        <Table />
      </div>
    </main>
  )
}
