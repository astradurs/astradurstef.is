// ./nextjs-app/app/_components/Post.tsx

"use client"

import Image from "next/image"
import imageUrlBuilder from "@sanity/image-url"
import { SanityDocument } from "@sanity/client"
import { PortableText, PortableTextComponents } from "@portabletext/react"
import { client } from "../../../../../../sanity/lib/client"
import InlineLink from "../../../components/InlineLink"
import HomePostBodyImage from "../../../components/HomePostBodyImage"

const builder = imageUrlBuilder(client)

const components: PortableTextComponents = {
  block: ({ children }) => {
    return <p>{children}</p>
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined

      return (
        <InlineLink className="text-lg font-bold" href={value.href} rel={rel}>
          {children}
        </InlineLink>
      )
    },
  },
  types: {
    image: ({ value }) => {
      const src = builder.image(value.asset).url()
      const alt = value.alt
      const width = 500
      const height = 500

      return (
        <HomePostBodyImage src={src} alt={alt} width={width} height={height} />
      )
    },
  },
}

export default function Post({ post }: { post: SanityDocument }) {
  return (
    <div className="prose prose-lg">
      {post?.title ? <h1>{post.title}</h1> : null}
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
    </div>
  )
}
