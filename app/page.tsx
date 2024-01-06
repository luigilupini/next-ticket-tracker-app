import { LatestIssues } from "@/components/home/cards"

export default function HomePage({
  searchParams,
}: {
  searchParams: { page: string }
}) {
  return (
    <main>
      <LatestIssues />
    </main>
  )
}
