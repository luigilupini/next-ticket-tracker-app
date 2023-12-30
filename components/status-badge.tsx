import { Status } from "@prisma/client"

import { cn } from "@/lib/utils"

import { Badge } from "./ui/badge"

const statusMap = {
  OPEN: { label: "Open", color: "bg-red-600/10 text-red-600" },
  // prettier-ignore
  IN_PROGRESS: { label: "In Progress", color: "bg-violet-600/10 text-violet-600" },
  CLOSED: { label: "Closed", color: "bg-green-600/10 text-green-600" },
}

export default function StatusBadge({
  status,
  className,
}: {
  status: Status
  className?: string
}) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        statusMap[status].color,
        "text-xs font-semibold shadow-none",
        className,
      )}
    >
      {statusMap[status].label}
    </Badge>
  )
}
