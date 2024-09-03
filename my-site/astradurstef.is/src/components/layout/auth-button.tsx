"use client"

import { Button, Link } from "@radix-ui/themes"
import { usePathname } from "next/navigation"

export function AuthButton({
  userAuthenticated,
  authKitUrl,
}: {
  userAuthenticated: boolean
  authKitUrl: string
}) {
  const pathname = usePathname()

  if (pathname.includes("/projects")) {
    return (
      <Button asChild size="3">
        <Link href={userAuthenticated ? "/projects/gdc/profile" : authKitUrl}>
          {userAuthenticated ? "My profile" : "Sign in"}
        </Link>
      </Button>
    )
  }
  return null
}
