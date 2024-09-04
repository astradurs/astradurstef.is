import { PreviewProvider } from "@/app/providers"
import Posts from "@/components/posts/Posts"
import PreviewPosts from "@/components/posts/PreviewPosts"
import { sanityFetch, token } from "@/lib/sanity/lib/fetch"
import { postsCategoriesQuery, postsQuery } from "@/lib/sanity/lib/queries"
import { SanityDocument } from "next-sanity"
import { draftMode } from "next/headers"

export default async function PostsPage() {
  const posts = await sanityFetch<SanityDocument[]>({ query: postsQuery })
  const postCategories = await sanityFetch<SanityDocument[]>({
    query: postsCategoriesQuery,
  })
  const isDraftMode = draftMode().isEnabled

  const postsByCategory = postCategories.map((category) => {
    return {
      ...category,
      title: category.title,
      slug: category.slug.current,
      posts: posts.filter((post) => {
        return post.categories?.some((postCategory: any) => {
          return postCategory._ref === category._id
        })
      }),
    }
  })

  let categoriesRedirect = "posts/categories"

  if (isDraftMode && token) {
    return (
      <PreviewProvider token={token}>
        {postsByCategory.map((category) => {
          return (
            <PreviewPosts
              key={category._id}
              posts={category.posts}
              title={category.title}
              slug={category.slug}
              pathname={categoriesRedirect}
            />
          )
        })}
      </PreviewProvider>
    )
  }

  return (
    <>
      {postsByCategory.map((category) => {
        return (
          <Posts
            key={category._id}
            posts={category.posts}
            title={category.title}
            slug={category.slug}
            pathname={categoriesRedirect}
          />
        )
      })}
    </>
  )
}
