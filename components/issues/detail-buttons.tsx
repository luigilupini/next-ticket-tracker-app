"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { type Issues } from "@prisma/client"
import { PenSquare, Trash } from "lucide-react"

import { deleteIssue } from "@/lib/action/issues"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import Spinner from "@/components/spinner"

export default function IssueButtons({ issue }: { issue: Issues }) {
  const { toast } = useToast()
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      // throw new Error("Error is being simulated.") // 👈🏻 Here we simulate an error
      await deleteIssue(issue.id)
      router.replace("/issues")
      router.refresh()
    } catch (err) {
      setIsDeleting(false)
      console.log(err)
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
      })
    }
  }
  return (
    <div className="flex items-center gap-1">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="text-[13px]"
            variant="outline"
            size="sm"
            disabled={isDeleting}
          >
            {isDeleting ? (
              <Spinner className="h-4 w-4" />
            ) : (
              <Trash className="h-4 w-4" />
            )}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this issue? This action cannot be
              undone and the issue will be removed.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary" size="sm">
                Close
              </Button>
            </DialogClose>
            <Button
              type="submit"
              variant="destructive"
              size="sm"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              Delete Issue
              {isDeleting && (
                <Spinner
                  className="ml-2 h-4 w-4"
                  strokeColor="stroke-secondary"
                />
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Link href={`/issues/${issue.id}/edit`}>
        <Button className="text-[13px]" variant="outline" size="sm">
          <PenSquare className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  )
}
