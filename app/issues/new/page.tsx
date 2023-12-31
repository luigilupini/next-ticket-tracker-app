import dynamic from "next/dynamic"

import IssueFormSkeleton from "@/app/issues/issue-form-skeleton"

const IssueForm = dynamic(() => import("@/app/issues/issue-form"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
})

export default function NewIssuePage() {
  return (
    <main className="mx-auto">
      <IssueForm />
    </main>
  )
}
