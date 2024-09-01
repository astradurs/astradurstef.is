"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { SpotifyCard } from "./SpotifyCard"

export function Footer() {
  const pathname = usePathname()

  const hideHeaderAndFooter =
    pathname.startsWith("/studio") ||
    pathname.includes("/projects/games/gudruns-xmas-wordle")

  if (hideHeaderAndFooter) {
    return null
  }

  return (
    <div className="grid mt-auto px-6 self-center w-full max-w-5xl">
      <div className="flex items-end justify-between w-full px-1">
        <div className="flex flex-col p-5">
          <p className="text-md">Ástráður Stefánsson</p>
          <Link href="https://twitter.com/stradistef">@stradistef</Link>
        </div>
        <SpotifyCard />
      </div>
    </div>
  )
}
