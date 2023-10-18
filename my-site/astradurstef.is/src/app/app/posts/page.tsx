import { SanityDocument } from "next-sanity"
import Posts from "../components/Posts"
import {
  postsQuery,
  postsCategoriesQuery,
} from "../../../../sanity/lib/queries"
import { sanityFetch, token } from "../../../../sanity/lib/fetch"
import { draftMode } from "next/headers"
import PreviewProvider from "../../components/PreviewProvider"
import PreviewPosts from "./components/PreviewPosts"

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
