import { SanityDocument } from "next-sanity"
import Posts from "@/app/app/posts/components/Posts"
import { postsQuery } from "../../../../sanity/lib/queries"
import { sanityFetch, token } from "../../../../sanity/lib/fetch"
import { draftMode } from "next/headers"
import PreviewProvider from "../components/PreviewProvider"
import PreviewPosts from "./components/PreviewPosts"

export default async function AppPage() {
  const posts = await sanityFetch<SanityDocument[]>({ query: postsQuery })
  const isDraftMode = draftMode().isEnabled

  if (isDraftMode && token) {
    return (
      <PreviewProvider token={token}>
        <PreviewPosts posts={posts} />
      </PreviewProvider>
    )
  }

  return <Posts posts={posts} />
}
