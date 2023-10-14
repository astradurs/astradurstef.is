import LandingCard from "./components/LandingCard"
import { SanityDocument } from "next-sanity"
import { sanityFetch, token } from "../../sanity/lib/fetch"
import { draftMode } from "next/headers"
import PreviewProvider from "./components/PreviewProvider"
import PreviewLandingCard from "./components/PreviewLandingCard"
import { authorsQuery } from "../../sanity/lib/queries"

export default async function Home() {
  const author = await sanityFetch<SanityDocument>({ query: authorsQuery })
  const isDraftMode = draftMode().isEnabled

  if (isDraftMode && token) {
    return (
      <PreviewProvider token={token}>
        <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-background">
          <PreviewLandingCard author={author} />
        </main>
      </PreviewProvider>
    )
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-background">
      <LandingCard author={author} />
    </main>
  )
}
