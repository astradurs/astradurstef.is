"use client"
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
    pathname === "/studio" ||
    pathname.includes("/projects/games/gudruns-xmas-wordle")

  if (hideHeaderAndFooter) {
    return null
  }
  return (
    <Navbar userAuthenticated={userAuthenticated} authKitUrl={authKitUrl} />
  )
}
