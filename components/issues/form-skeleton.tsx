import { Box } from "@radix-ui/themes"

import Skeleton from "@/components/skeleton"

export default function FormSkeleton() {
  return (
    <Box className="mt-1 flex max-w-xl flex-col gap-2">
      <Skeleton height="2rem" />
      <Skeleton height="2rem" width="11rem" />
      <Skeleton height="24rem" />
      <Skeleton height="2rem" width="11rem" className="mt-8" />
    </Box>
  )
}
