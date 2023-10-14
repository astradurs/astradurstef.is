// ./nextjs-app/app/[slug]/page.tsx

import { SanityDocument } from "@sanity/client"
import { draftMode } from "next/headers"
import Posts from "../../components/Posts"
import {
  postPathsQuery,
  postsByCategoryQuery,
  postCategoryQuery,
} from "../../../../../../sanity/lib/queries"
import { sanityFetch, token } from "../../../../../../sanity/lib/fetch"
import { client } from "../../../../../../sanity/lib/client"

import PreviewProvider from "../../../../components/PreviewProvider"
import PreviewPosts from "../../components/PreviewPosts"

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

  const categoriesRedirect = "/app/posts/categories"

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
