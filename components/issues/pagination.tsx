"use client"

import { useRouter, useSearchParams } from "next/navigation"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

type Props = {
  amount: number
  size: number
  current: number
}

export function NewPagination({ amount, size, current }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const pageCount = Math.ceil(amount / size)
  if (pageCount <= 1) return null

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", page.toString())
    router.push("?" + params.toString())
  }

  const getPageRange = () => {
    const maxPagesToShow = 2 // Maximum number of page links to display at a time
    // Calculate the ideal start and end page numbers
    let start = Math.max(current - 1, 1)
    let end = Math.min(start + maxPagesToShow - 1, pageCount)
    // Adjust start and end to handle cases where current is at the beginning or end
    if (current === 1) {
      end = Math.min(maxPagesToShow, pageCount)
    } else if (current === pageCount) {
      start = Math.max(pageCount - maxPagesToShow + 1, 1)
    }
    // Create an array of page numbers to display
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }

  const pagesToShow = getPageRange()

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className="cursor-pointer"
            size="sm"
            onClick={() => {
              if (current === 1) return
              changePage(current - 1)
            }}
          />
        </PaginationItem>

        {pagesToShow.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              onClick={() => changePage(page)}
              isActive={page === current}
              className="cursor-pointer tabular-nums"
              size="sm"
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            className="cursor-pointer"
            size="sm"
            onClick={() => {
              if (current === pageCount) return
              changePage(current + 1)
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export function BasicPagination({ amount, size, current }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const pageCount = Math.ceil(amount / size)
  if (pageCount <= 1) return null

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", page.toString())
    const url = `/issues?${params.toString()}`
    router.push(url)
  }

  return (
    <section className="flex items-center justify-end gap-1">
      <p className="flex w-32 place-content-center rounded">
        <span className="text-sm tabular-nums">
          Page {current} of {pageCount}
        </span>
      </p>

      <div className="flex items-center justify-center gap-2">
        <Button
          size="sm"
          variant="secondary"
          disabled={current === 1}
          onClick={() => changePage(1)}
        >
          <ChevronsLeft size={18} />
        </Button>
        <Button
          size="sm"
          variant="secondary"
          disabled={current === 1}
          onClick={() => changePage(current - 1)}
        >
          <ChevronLeft size={18} />
        </Button>
        <Button
          size="sm"
          variant="secondary"
          disabled={current === pageCount}
          onClick={() => changePage(current + 1)}
        >
          <ChevronRight size={18} />
        </Button>
        <Button
          size="sm"
          variant="secondary"
          disabled={current === pageCount}
          onClick={() => changePage(pageCount)}
        >
          <ChevronsRight size={18} />
        </Button>
      </div>
    </section>
  )
}
