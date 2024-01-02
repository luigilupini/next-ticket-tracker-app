import { Box, Card, Flex } from "@radix-ui/themes"

import Skeleton from "@/components/skeleton"

export default function Loading() {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Flex className="space-x-3" my="2">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Card
        className="prose mt-4 rounded-lg border bg-muted/50 p-6 shadow"
        mt="4"
      >
        <Skeleton count={3} />
      </Card>
    </Box>
  )
}
