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
import { client } from "../../../sanity/lib/client"
import imageUrlBuilder from "@sanity/image-url"
import { SanityDocument } from "next-sanity"
import { PortableText } from "@portabletext/react"

const builder = imageUrlBuilder(client)

export default function LandingCard({ author }: { author: SanityDocument }) {
  const authorImageSrc = builder.image(author?.image).url()
  return (
    <Card className="py-4 max-w-md flex flex-col gap-2 bg-foreground text-background">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <Image
          alt={author?.image?.alt}
          className="object-cover rounded-xl"
          src={authorImageSrc}
          width={500}
          height={500}
        />
      </CardHeader>
      <Divider />
      <CardBody className="overflow-visible py-2">
        {author?.bio ? <PortableText value={author?.bio} /> : null}
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
