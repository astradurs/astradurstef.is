"use client"
import React from "react"
import { User, Link } from "@nextui-org/react"
import { SpotifyCard } from "./SpotifyCard"

export function Footer() {
  return (
    <div className="flex items-end justify-between w-full px-1">
      <div className="flex flex-col p-5">
        <p className="text-md">Ástráður Stefánsson</p>
        <Link href="https://twitter.com/stradistef" size="sm" isExternal>
          @stradistef
        </Link>
      </div>

      <SpotifyCard />
    </div>
  )
}
