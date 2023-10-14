import { SanityDocument } from "next-sanity"
import { sanityFetch } from "../../../sanity/lib/fetch"
import { postsByCategoryQuery } from "../../../sanity/lib/queries"
import InlineLink from "./components/InlineLink"
import Profile from "./components/Profile"

export default async function AppPage() {
  const posts = await sanityFetch<SanityDocument[]>({
    query: postsByCategoryQuery,
    params: { category: "home" },
  })

  return (
    <div className="w-full">
      <section className="flex flex-col gap-2 text-gray-600 body-font py-2">
        <h1 className="text-2xl font-bold">Ástráður Stefánsson</h1>
        <p className="text-lg">
          Hi there! 👋 My name is Ástráður Stefánsson and I am a developer from
          Iceland. I graduated from the University of Iceland with a BSc in
          Computer Sciences and I am currently working at{" "}
          <InlineLink
            className="text-lg font-bold"
            isExternal
            href="https://www.maul.is/"
          >
            Maul
          </InlineLink>{" "}
          as a developer.
        </p>
      </section>
      <section>
        <Profile />
      </section>
      <ul>
        {posts.map((post, index) => (
          <div key={index}>HELLO</div>
        ))}
      </ul>
    </div>
  )
}
