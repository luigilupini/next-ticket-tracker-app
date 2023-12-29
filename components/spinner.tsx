import { cn } from "@/lib/utils"

import styles from "./spinner.module.css"

export default function Spinner({
  stroke,
  className,
}: {
  stroke?: string
  className?: string
}) {
  return (
    <svg
      className={cn(styles.spinner, "w-full h-full", className)}
      viewBox="0 0 50 50"
    >
      <circle
        className={cn(styles.path, "stroke-primary", stroke)}
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke-width="6"
      ></circle>
    </svg>
  )
}
