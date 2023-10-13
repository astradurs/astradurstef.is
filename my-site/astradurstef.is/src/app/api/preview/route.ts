// ./nextjs-app/app/api/preview/route.ts

import { draftMode } from "next/headers"
import { redirect } from "next/navigation"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug")

  draftMode().enable()
  redirect(`/app/posts${slug ? `/${slug}` : ""}`)
}
