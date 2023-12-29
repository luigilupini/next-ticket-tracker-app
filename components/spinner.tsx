import { cn } from "@/lib/utils"

import styles from "./spinner.module.css"

export default function Spinner({
  strokeColor,
  strokeWidth = 6,
  className,
}: {
  strokeColor?: string
  strokeWidth?: number
  className?: string
}) {
  return (
    <svg
      className={cn(styles.spinner, "w-full h-full rounded-full", className)}
      viewBox="0 0 50 50"
    >
      <circle
        className={cn(styles.path, "stroke-primary", strokeColor)}
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke-width={strokeWidth}
      ></circle>
    </svg>
  )
}
