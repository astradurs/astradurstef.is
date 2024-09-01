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
    pathname.startsWith("/studio") ||
    pathname.includes("/projects/games/gudruns-xmas-wordle")

  if (hideHeaderAndFooter) {
    return null
  }
  return (
    <div className="grid px-6 self-center w-full max-w-5xl">
      <Navbar userAuthenticated={userAuthenticated} authKitUrl={authKitUrl} />
    </div>
  )
}
