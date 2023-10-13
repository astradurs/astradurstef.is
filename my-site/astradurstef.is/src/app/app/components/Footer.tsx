"use client"
import React from "react"
import { User, Link } from "@nextui-org/react"

export function Footer() {
  return (
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
  )
}
