import Link from "next/link"
import type { SanityDocument } from "@sanity/client"

export default function Posts({
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
  const postsCount = posts.length === 1 ? `1 Post` : `${posts.length} Posts`
  const postLinkPrefix =
    pathname === "/app/posts/categories" ? "/app/posts" : "posts"

  return (
    <div className="grid grid-cols-1 divide-y">
      <Link
        href={`${pathname}/${slug}`}
        className="flex p-4 items-end gap-4 hover:bg-secondary"
      >
        <h1 className="text-2xl font-bold">{title}</h1>
        <p>{postsCount}</p>
      </Link>

      {posts.map((post) => (
        <Link
          key={post._id}
          href={`${postLinkPrefix}/${post.slug.current}`}
          className="p-4 hover:bg-secondary"
        >
          <h2>{post.title}</h2>
        </Link>
      ))}
    </div>
  )
}
