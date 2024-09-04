"use client"
import { Grid } from "@radix-ui/themes"
import { usePathname } from "next/navigation"
import { Navbar } from "./Navbar"

export function Header({
  userAuthenticated,
  authKitUrl,
}: {
  userAuthenticated: boolean
  authKitUrl: string
}) {
  const pathname = usePathname()
  const hideHeaderAndFooter =
    pathname.startsWith("/studio") ||
    pathname.includes("/projects/games/gudruns-xmas-wordle")

  if (hideHeaderAndFooter) {
    return null
  }

  return (
    <Grid>
      <Navbar userAuthenticated={userAuthenticated} authKitUrl={authKitUrl} />
    </Grid>
  )
}
