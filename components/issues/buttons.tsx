import Link from "next/link"

import { Button } from "@/components/ui/button"

export function NewIssue({ disabled = false }) {
  return (
    <Button className="w-fit" size="sm" disabled={disabled}>
      <Link href="/issues/new">New Issue</Link>
    </Button>
  )
}
