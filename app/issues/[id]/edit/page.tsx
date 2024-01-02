import dynamic from "next/dynamic"
import { notFound } from "next/navigation"
import prisma from "@/prisma/client"

import FormSkeleton from "@/components/issues/form-skeleton"

const IssueForm = dynamic(() => import("@/components/issues/form"), {
  ssr: false,
  loading: () => <FormSkeleton />,
})

type Props = {
  params: { id: string }
}

export default async function EditIssuePage({ params }: Props) {
  const issue = await prisma.issues.findUnique({
    where: {
      id: parseInt(params.id),
    },
  })
  if (!issue) notFound()
  return (
    <main className="mx-auto">
      <IssueForm issue={issue} />
    </main>
  )
}
