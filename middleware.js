import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isProtectedRoute = createRouteMatcher(
    ['/dashboard(.*)','/create-course']
)

const hasClerkKey = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || process.env.CLERK_PUBLISHABLE_KEY)

let _middleware
if (hasClerkKey) {
  _middleware = clerkMiddleware((auth, req) => {
    if (isProtectedRoute(req)) auth().protect()
  })
} else {
  // If no Clerk publishable key is provided (e.g. local dev without env vars),
  // expose a noop middleware so the app doesn't crash with a missing-key error.
  _middleware = function noopMiddleware(req) {
    return NextResponse.next()
  }
}

export default _middleware
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}