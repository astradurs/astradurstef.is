// ./nextjs-app/app/_components/Post.tsx

"use client"

import Image from "next/image"
import imageUrlBuilder from "@sanity/image-url"
import { SanityDocument } from "@sanity/client"
import { PortableText, PortableTextComponents } from "@portabletext/react"
import { client } from "../../../../sanity/lib/client"

const builder = imageUrlBuilder(client)

const components: PortableTextComponents = {
  block: ({ children }) => {
    return <p className="text-foreground">{children}</p>
  },
}

export default function Post({ post }: { post: SanityDocument }) {
  return (
    <div className="mx-auto prose prose-lg">
      {post?.title ? <h1 className="text-foreground">{post.title}</h1> : null}
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
