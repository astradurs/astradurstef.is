import { PortableText, PortableTextComponents } from "@portabletext/react"
import { Box, Grid, Heading, Link, Text } from "@radix-ui/themes"
import imageUrlBuilder from "@sanity/image-url"
import { SanityDocument } from "next-sanity"
import Image from "next/image"
import { client } from "../lib/sanity/lib/client"
import { sanityFetch } from "../lib/sanity/lib/fetch"
import { postsByCategoryQuery, postsQuery } from "../lib/sanity/lib/queries"
import HomePostBodyImage from "./components/HomePostBodyImage"

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
        <Link weight="bold" href={value.href} rel={rel}>
          {children}
        </Link>
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
        <Box py="2">
          <HomePostBodyImage
            src={src}
            alt={alt}
            width={width}
            height={height}
          />
        </Box>
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
    <Grid>
      <Box py="2">
        <Heading>Ástráður Stefánsson</Heading>

        <Text>
          Hi there! 👋 My name is Ástráður Stefánsson and I am a developer from
          Iceland. I graduated from the University of Iceland with a BSc in
          Computer Sciences and I am currently working at{" "}
          <Link weight="bold" href="https://www.maul.is/">
            Maul
          </Link>{" "}
          as a developer.
        </Text>
      </Box>
      {posts.map((post) => (
        <Box py="2" key={post._id}>
          {post?.mainImage ? (
            <Box py="9">
              <Image
                className="float-left m-0 w-1/3 mr-4 rounded-lg"
                src={builder.image(post.mainImage).width(300).height(300).url()}
                width={300}
                height={300}
                alt={post?.mainImage?.alt}
              />
            </Box>
          ) : null}
          {post?.body ? (
            <Box mb="2">
              <PortableText value={post?.body} components={components} />
            </Box>
          ) : null}
        </Box>
      ))}
    </Grid>
  )
}
