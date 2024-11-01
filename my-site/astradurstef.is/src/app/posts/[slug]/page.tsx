// ./nextjs-app/app/[slug]/page.tsx

import { SanityDocument } from "@sanity/client"
import { draftMode } from "next/headers"
import { client } from "../../../lib/sanity/lib/client"
import { sanityFetch, token } from "../../../lib/sanity/lib/fetch"
import { postPathsQuery, postQuery } from "../../../lib/sanity/lib/queries"
import Post from "./components/Post"

import { PreviewProvider } from "@/app/providers"
import PreviewPost from "./components/PreviewPost"

// Prepare Next.js to know which routes already exist
export async function generateStaticParams() {
  // Important, use the plain Sanity Client here
  const posts = await client.fetch(postPathsQuery)

  return posts
}

export default async function PostPage({ params }: { params: any }) {
  const post = await sanityFetch<SanityDocument>({ query: postQuery, params })
  const isDraftMode = draftMode().isEnabled

  if (isDraftMode && token) {
    return (
      <PreviewProvider token={token}>
        <PreviewPost post={post} />
      </PreviewProvider>
    )
  }

  return <Post post={post} />
}
