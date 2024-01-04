"use client"

import { PropsWithChildren } from "react"
import QueryProvider from "@/context/query"
import { ThemeProvider } from "@/context/theme"
import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"

import { Toaster } from "@/components/ui/toaster"

type Props = PropsWithChildren<{
  session: Session | null
}>

const ProviderTree = ({ children, session }: Props) => {
  return (
    <QueryProvider>
      <SessionProvider session={session}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </SessionProvider>
    </QueryProvider>
  )
}

export default ProviderTree
