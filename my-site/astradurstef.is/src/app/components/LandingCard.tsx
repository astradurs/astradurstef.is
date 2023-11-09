"use client"

import React from "react"
import { ThemeSwitcher } from "./ThemeSwitcher"
import { client } from "../../../sanity/lib/client"
import imageUrlBuilder from "@sanity/image-url"
import { Button } from "@/components/ui/button"
import NextLink from "next/link"

const builder = imageUrlBuilder(client)

export default function LandingCard() {
  return (
    <div className="py-0 sm:py-4 max-w-md my-auto sm:m-0 flex flex-col gap-2">
      <img
        alt={"A picture of me, Ástráður Stefánsson"}
        className="object-cover rounded-xl"
        src="https://avatars.githubusercontent.com/u/50924263?v=4"
        width={500}
        height={500}
      />

      <div className="overflow-visible py-2">
        Hi, my name is Ástráður Stefánsson. I am a developer for work and DnD
        fanatic for play.
      </div>

      <div className="flex justify-between">
        <div className="flex gap-2 justify-between w-full sm:w-fit">
          <Button color="primary" variant="default" asChild>
            <NextLink href="/app">Enter my site</NextLink>
          </Button>

          <Button color="secondary" variant="ghost" asChild>
            <NextLink href="/studio">Enter the studio</NextLink>
          </Button>
        </div>
        <div className="hidden sm:flex">
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  )
}
