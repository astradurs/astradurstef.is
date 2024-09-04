// ./nextjs-app/app/[slug]/page.tsx

import { PreviewProvider } from "@/app/providers"
import Posts from "@/components/posts/Posts"
import PreviewPosts from "@/components/posts/PreviewPosts"
import { client } from "@/lib/sanity/lib/client"
import { sanityFetch, token } from "@/lib/sanity/lib/fetch"
import {
  postCategoryQuery,
  postPathsQuery,
  postsByCategoryQuery,
} from "@/lib/sanity/lib/queries"
import { SanityDocument } from "@sanity/client"
import { draftMode } from "next/headers"

// Prepare Next.js to know which routes already exist
export async function generateStaticParams() {
  // Important, use the plain Sanity Client here
  const posts = await client.fetch(postPathsQuery)

  return posts
}

export default async function CategoryPage({ params }: { params: any }) {
  const posts = await sanityFetch<SanityDocument[]>({
    query: postsByCategoryQuery,
    params,
  })

  const category = await sanityFetch<SanityDocument>({
    query: postCategoryQuery,
    params: {
      slug: params?.category,
    },
  })

  const title = category?.title

  const isDraftMode = draftMode().isEnabled

  const categoriesRedirect = "/posts/categories"

  if (isDraftMode && token) {
    return (
      <PreviewProvider token={token}>
        <PreviewPosts
          posts={posts}
          title={title}
          slug={params?.category}
          pathname={categoriesRedirect}
        />
      </PreviewProvider>
    )
  }

  return (
    <Posts
      posts={posts}
      title={title}
      slug={params?.category}
      pathname={categoriesRedirect}
    />
  )
}
