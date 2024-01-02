"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FaBug } from "react-icons/fa"

import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"

export default function Navbar() {
  return (
    <nav className="mb-5 bg-muted px-5 py-3 shadow">
      <section className="flex items-center justify-between">
        <div className="flex items-center justify-center gap-6">
          <Link href="/">
            <FaBug />
          </Link>
          <NavLinks />
        </div>
        <div className="flex items-center justify-center gap-6">
          <ModeToggle />
          <AuthStatus />
        </div>
      </section>
    </nav>
  )
}

const NavLinks = ({ classnames }: { classnames?: string }) => {
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

const AuthStatus = () => {
  // const { status, data: session } = useSession();
  // if (status === "loading") return <Skeleton width="3rem" />;
  // if (status === "unauthenticated")
  //   return (
  //     <Link className="nav-link" href="/api/auth/signin">
  //       Login
  //     </Link>
  //   );
  return (
    <div>Account</div>
    //   <Box>
    //     <DropdownMenu.Root>
    //       <DropdownMenu.Trigger>
    //         <Avatar
    //           // src={session!.user!.image!}
    //           fallback="?"
    //           size="2"
    //           radius="full"
    //           className="cursor-pointer"
    //           referrerPolicy="no-referrer"
    //         />
    //       </DropdownMenu.Trigger>
    //       <DropdownMenu.Content>
    //         <DropdownMenu.Label>
    //           {/* <Text size="2">{session!.user!.email}</Text> */}
    //         </DropdownMenu.Label>
    //         <DropdownMenu.Item>
    //           <Link href="/api/auth/signout">Log out</Link>
    //         </DropdownMenu.Item>
    //       </DropdownMenu.Content>
    //     </DropdownMenu.Root>
    //   </Box>
  )
}
