"use client"

import type { SanityDocument } from "@sanity/client"
import { useLiveQuery } from "@sanity/preview-kit"
import Posts from "./Posts"
import { postsQuery } from "../../lib/sanity/lib/queries"

export default function PreviewPosts({
  posts = [],
  title = "Posts",
  slug = "posts",
  pathname = "",
}: {
  posts: SanityDocument[]
  title: string
  slug: string
  pathname: string
}) {
  const [data] = useLiveQuery(posts, postsQuery)

  return <Posts posts={data} title={title} slug={slug} pathname={pathname} />
}
