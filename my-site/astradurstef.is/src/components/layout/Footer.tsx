"use client"
import React from "react"
import Link from "next/link"
import { SpotifyCard } from "./SpotifyCard"
import { usePathname } from "next/navigation"

export function Footer() {
  const pathname = usePathname()

  const hideHeaderAndFooter =
    pathname === "/studio" ||
    pathname.includes("/projects/games/gudruns-xmas-wordle")
  if (hideHeaderAndFooter) {
    return null
  }
  return (
    <div className="flex items-end justify-between w-full px-1">
      <div className="flex flex-col p-5">
        <p className="text-md">Ástráður Stefánsson</p>
        <Link href="https://twitter.com/stradistef">@stradistef</Link>
      </div>
      <SpotifyCard />
    </div>
  )
}
