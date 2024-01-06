"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"

export default function ErrorBanner({ message }: { message: string }) {
  const [isLoading, setIsLoading] = useState(false)

  const { toast } = useToast()

  useEffect(() => {
    setIsLoading(true)
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: "There was a problem with your request.",
      action: <ToastAction altText="Schedule to undo">Close</ToastAction>,
    })
    return () => {
      setIsLoading(false)
    }
  }, [toast])

  return (
    <Card className="w-1/2 bg-destructive text-destructive-foreground shadow-sm">
      <CardHeader className="relative">
        Oops!
        <CardTitle className="mt-1">Unsupported search param entry </CardTitle>
      </CardHeader>
      <CardContent className="font-mono text-xs">
        <Badge className="bg-destructive-foreground p-1 px-2 text-destructive">
          {message}
        </Badge>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="border" size="sm">
          <Link href="/issues">return to previous page</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
