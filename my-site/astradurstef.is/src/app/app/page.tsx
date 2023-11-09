import { SanityDocument } from "next-sanity"
import imageUrlBuilder from "@sanity/image-url"
import { client } from "../../../sanity/lib/client"
import { sanityFetch } from "../../../sanity/lib/fetch"
import { postsByCategoryQuery, postsQuery } from "../../../sanity/lib/queries"
import InlineLink from "./components/InlineLink"
import Profile from "./components/Profile"
import Image from "next/image"
import { PortableText, PortableTextComponents } from "@portabletext/react"
import HomePostBodyImage from "./components/HomePostBodyImage"
import { Divider } from "@nextui-org/divider"

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

export default async function AppPage() {
  const posts = await sanityFetch<SanityDocument[]>({
    query: postsByCategoryQuery,
    params: { category: "home" },
  })

  const recentPosts = await sanityFetch<SanityDocument[]>({
    query: postsQuery,
    params: { category: "recent" },
  })

  console.log("posts", recentPosts)

  return (
    <div className="w-full">
      <section className="body-font py-2">
        <article className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Ástráður Stefánsson</h1>
          <p className="text-lg">
            Hi there! 👋 My name is Ástráður Stefánsson and I am a developer
            from Iceland. I graduated from the University of Iceland with a BSc
            in Computer Sciences and I am currently working at{" "}
            <InlineLink
              className="text-lg font-bold"
              href="https://www.maul.is/"
            >
              Maul
            </InlineLink>{" "}
            as a developer.
          </p>
        </article>
      </section>
      <Divider />
      <section className="flex flex-col gap-2 body-font py-2">
        <div className="flex flex-col gap-2">
          {posts.map((post) => (
            <article key={post._id} className="flex flex-col gap-2">
              <h3 className="text-2xl font-bold">{post.title}</h3>
              {post?.mainImage ? (
                <Image
                  className="float-left m-0 w-1/3 mr-4 rounded-lg"
                  src={builder
                    .image(post.mainImage)
                    .width(300)
                    .height(300)
                    .url()}
                  width={300}
                  height={300}
                  alt={post?.mainImage?.alt}
                />
              ) : null}
              {post?.body ? (
                <PortableText value={post?.body} components={components} />
              ) : null}
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
