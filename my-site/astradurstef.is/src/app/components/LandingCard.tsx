"use client"

import React from "react"
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
  Divider,
  Link,
} from "@nextui-org/react"
import { ThemeSwitcher } from "./ThemeSwitcher"

export default function LandingCard() {
  return (
    <Card className="py-4 max-w-md flex flex-col gap-2 bg-foreground text-background">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <Image
          alt="Picture of the author"
          className="object-cover rounded-xl"
          src="https://avatars.githubusercontent.com/u/50924263?v=4"
        />
      </CardHeader>
      <Divider />
      <CardBody className="overflow-visible py-2">
        <h1>Welcome to my site</h1>
        <p>
          My name is Ástráður Stefánsson and I am a software developer from
          Iceland
        </p>
      </CardBody>
      <Divider />
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
