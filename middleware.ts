import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { auth } from "@/auth"

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  let session = await auth()
  if (!session) {
    return NextResponse.redirect(new URL("/api/auth/signin", request.url))
  }
}

// "Matching Paths"
export const config = {
  matcher: [
    "/issues/new",
    // Below we match on our dynamic route "/issues/[id]/edit" and pass in the
    // asterisk parameter (*) so that anything after our `:id` param, we ensure
    // to redirect them to our Auth.js auth api handler.
    "/issues/:id*/edit",
  ],
}
