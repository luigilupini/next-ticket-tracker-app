import dynamic from "next/dynamic"

import FormSkeleton from "@/components/issues/form-skeleton"

const IssueForm = dynamic(() => import("@/components/issues/form"), {
  ssr: false,
  loading: () => <FormSkeleton />,
})

export default function NewIssuePage() {
  return (
    <main className="mx-auto">
      <IssueForm />
    </main>
  )
}
