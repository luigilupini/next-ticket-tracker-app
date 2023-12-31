"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { AlertCircle } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

import { createIssue, updateIssue } from "@/lib/action/issues"
import { CreateIssueSchema } from "@/lib/schema/issues"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ErrorMessage from "@/components/error-message"
import Spinner from "@/components/spinner"

import "easymde/dist/easymde.min.css"

import { type Issues } from "@prisma/client"
import SimpleMDE from "react-simplemde-editor"

type IssueFormType = z.infer<typeof CreateIssueSchema>

export default function IssueForm({ issue }: { issue?: Issues }) {
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormType>({
    resolver: zodResolver(CreateIssueSchema),
  })

  const onSubmit = async (data: IssueFormType) => {
    try {
      setIsSubmitting(true)
      if (issue) await updateIssue({ id: issue.id, ...data })
      else await createIssue(data)
    } catch (err) {
      console.log(err)
      setIsSubmitting(false)
      setError("An expected error occurred in creating your issue!")
    }
  }

  return (
    <div className="flex max-w-xl flex-col gap-4">
      {error && (
        <Alert className="bg-red-600">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="text-sm font-bold">Oops!</AlertTitle>
          <AlertDescription className="text-xs">{error}</AlertDescription>
        </Alert>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <section className="relative">
          <Input
            defaultValue={issue?.title}
            placeholder="Title"
            autoFocus={false}
            {...register("title")}
          />
          {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
        </section>

        <section className="relative">
          <Controller
            defaultValue={issue?.description}
            name="description"
            control={control}
            render={({ field }) => (
              <SimpleMDE
                placeholder="Description"
                className="text-sm"
                {...field}
              />
            )}
          />
          {errors.description && (
            <ErrorMessage>{errors.description.message}</ErrorMessage>
          )}
        </section>
        <Button disabled={isSubmitting} className="relative w-44" size="sm">
          {issue ? "Update Issue" : "Create Issue"}
          {isSubmitting && (
            <Spinner
              className="absolute right-4 h-5 w-5"
              strokeColor="stroke-secondary/80"
              strokeWidth={8}
            />
          )}
        </Button>
      </form>
    </div>
  )
}
