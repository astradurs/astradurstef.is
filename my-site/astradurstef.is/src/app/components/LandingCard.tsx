"use client"

import React from "react"
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
  Link,
} from "@nextui-org/react"
import { ThemeSwitcher } from "./ThemeSwitcher"
import { client } from "../../../sanity/lib/client"
import imageUrlBuilder from "@sanity/image-url"

const builder = imageUrlBuilder(client)

export default function LandingCard() {
  return (
    <Card className="py-4 max-w-md flex flex-col gap-2">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <Image
          alt={"A picture of me, Ástráður Stefánsson"}
          className="object-cover rounded-xl"
          src="https://avatars.githubusercontent.com/u/50924263?v=4"
          width={500}
          height={500}
        />
      </CardHeader>

      <CardBody className="overflow-visible py-2">
        Hi, my name is Ástráður Stefánsson. I am a developer for work and DnD
        fanatic for play.
      </CardBody>

      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          <Button as={Link} href="/app" color="primary" variant="solid">
            Enter my site
          </Button>

          <Button as={Link} href="/studio" color="secondary" variant="ghost">
            Enter the studio
          </Button>
        </div>
        <ThemeSwitcher />
      </CardFooter>
    </Card>
  )
}
