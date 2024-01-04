"use client"

import { Issues, User } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"

import { patchIssue } from "@/lib/action/issues"
import { readUsers } from "@/lib/action/users"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import Skeleton from "@/components/skeleton"

export default function AssigneeSelect({ issue }: { issue: Issues }) {
  const { toast } = useToast()

  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => readUsers(),
    staleTime: 1000 * 60, // 1 minute of cache (client-side)
    retry: 3,
  })

  if (isLoading) return <Skeleton />
  if (error) return <div>Error!</div>

  const handleChange = async (userId: string) => {
    try {
      await patchIssue({
        id: issue.id,
        assignedToUserId: userId || "unassigned",
      })
      toast({
        variant: "default",
        title: "Success!",
        description: "Issue assigned to user.",
      })
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Schedule to undo">Close</ToastAction>,
      })
    }
  }

  return (
    <Select
      defaultValue={issue.assignedToUserId || "unassigned"}
      onValueChange={(userId) => handleChange(userId)}
    >
      <SelectTrigger className="h-8 w-[180px] cursor-pointer shadow-none">
        <SelectValue placeholder="Assign User" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Users</SelectLabel>
          <SelectItem value="unassigned">Unassigned</SelectItem>
          {users?.map(({ id, name }) => (
            <SelectItem key={id} className="cursor-pointer" value={id}>
              {name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
