"use client"
import React from "react"
import { User, Link } from "@nextui-org/react"
import { SpotifyCard } from "./SpotifyCard"

export function Footer() {
  return (
    <div className="flex items-end justify-between w-full">
      <User
        name="Ástráður Stefánsson"
        description={
          <Link href="https://twitter.com/stradistef" size="sm" isExternal>
            @stradistef
          </Link>
        }
        avatarProps={{
          src: "https://avatars.githubusercontent.com/u/50924263?v=4",
        }}
      />
      <SpotifyCard />
    </div>
  )
}
