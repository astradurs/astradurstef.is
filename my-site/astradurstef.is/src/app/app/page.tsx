import { SanityDocument } from "next-sanity"
import { sanityFetch } from "../../../sanity/lib/fetch"
import { postsByCategoryQuery } from "../../../sanity/lib/queries"

export default async function AppPage() {
  const posts = await sanityFetch<SanityDocument[]>({
    query: postsByCategoryQuery,
    params: { category: "home" },
  })

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post, index) => (
          <div key={index}>HELLO</div>
        ))}
      </ul>
    </div>
  )
}
