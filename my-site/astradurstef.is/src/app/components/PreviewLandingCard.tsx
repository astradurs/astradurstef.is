"use client"

import type { SanityDocument } from "@sanity/client"
import { useLiveQuery } from "@sanity/preview-kit"
import { authorsQuery } from "../../../sanity/lib/queries"
import LandingCard from "./LandingCard"

export default function PreviewLandingCard({
  author,
}: {
  author: SanityDocument
}) {
  const [data] = useLiveQuery(author, authorsQuery)

  return <LandingCard author={data} />
}
