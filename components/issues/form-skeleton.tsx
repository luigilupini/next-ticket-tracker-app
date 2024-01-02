import { Box } from "@radix-ui/themes"

import Skeleton from "@/components/skeleton"

export default function FormSkeleton() {
  return (
    <Box className="max-w-xl">
      <Skeleton height="2rem" />
      <Skeleton height="20rem" />
    </Box>
  )
}
