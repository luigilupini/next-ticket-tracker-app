"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { FaBug } from "react-icons/fa"
import Skeleton from "react-loading-skeleton"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ModeToggle } from "@/components/mode-toggle"

export default function Navbar() {
  return (
    <nav className="mb-5 border-b px-5 py-3">
      <section className="flex items-center justify-between">
        <div className="flex items-center justify-center gap-6">
          <Link href="/">
            <FaBug />
          </Link>
          <NavLinks />
        </div>
        <div className="flex items-center justify-center gap-6">
          <AuthStatus />
          <ModeToggle />
        </div>
      </section>
    </nav>
  )
}

function NavLinks({ classnames }: { classnames?: string }) {
  const currentPath = usePathname()

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ]

  return (
    <ul className="flex space-x-6">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            className={cn("link text-sm", classnames, {
              "text-muted-foreground": link.href !== currentPath,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

function AuthStatus() {
  const { status, data: session } = useSession()
  if (status === "loading") return <Skeleton width="3rem" />
  if (status === "unauthenticated")
    return (
      <Link className="link text-sm" href="/api/auth/signin">
        Login
      </Link>
    )
  return (
    <DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="h-8 w-8">
            <AvatarImage src={session!.user!.image!} alt="@user" />
            <AvatarFallback>
              {session!.user!.name![0].toUpperCase() +
                session!.user!.name![1].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{session!.user?.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="text-sm font-normal">
            {session!.user?.email}
          </DropdownMenuLabel>
          <Button
            variant="ghost"
            onClick={() => signOut()}
            size="sm"
            className="text-sm font-normal"
          >
            Sign Out
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>
    </DropdownMenu>
  )
}
