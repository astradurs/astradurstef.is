"use client"

import { PortableText, PortableTextComponents } from "@portabletext/react"
import { Box, Heading, Text } from "@radix-ui/themes"
import { SanityDocument } from "@sanity/client"
import imageUrlBuilder from "@sanity/image-url"
import Image from "next/image"
import { client } from "../../lib/sanity/lib/client"

const builder = imageUrlBuilder(client)

const components: PortableTextComponents = {
  block: ({ children }) => {
    return <Text>{children}</Text>
  },
}

export default function Post({ post }: { post: SanityDocument }) {
  return (
    <Box>
      {post?.title ? <Heading>{post.title}</Heading> : null}
      {post?.mainImage ? (
        <Image
          className="float-left m-0 w-1/3 mr-4 rounded-lg"
          src={builder.image(post.mainImage).width(300).height(300).url()}
          width={300}
          height={300}
          alt={post?.mainImage?.alt}
        />
      ) : null}
      {post?.body ? (
        <PortableText value={post?.body} components={components} />
      ) : null}
    </Box>
  )
}
