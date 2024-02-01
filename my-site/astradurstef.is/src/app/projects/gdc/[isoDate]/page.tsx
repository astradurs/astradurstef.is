import { getAuthorizationUrl, getUser } from "@/app/auth"
import { redirect } from "next/navigation"
import _ from "lodash"
import { eventQuery } from "@/lib/sanity/lib/queries"
import { sanityFetch } from "@/lib/sanity/lib/fetch"
import { PortableText, PortableTextComponents } from "@portabletext/react"
import GDCWaitlist from "./components/gdc-waitlist"
import EventDescription from "./components/event-description"

export default async function GDCEvent({
  params,
}: {
  params: { isoDate: string }
}) {
  const { isAuthenticated: userAuthenticated, user: authUser } = await getUser()

  if (!userAuthenticated || !authUser) {
    const authKitUrl = getAuthorizationUrl("projects/gdc")

    return redirect(authKitUrl)
  }

  const event: {
    title: string
    body: any
    date: string
    location: {
      title: string
      address: string
    }
    limit: number
  } = await sanityFetch({
    query: eventQuery,
    params: { slug: params.isoDate },
  })

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <div>
        <EventDescription event={event} />
      </div>
      <div className="grid content-start">
        <GDCWaitlist
          email={authUser.email}
          limit={event.limit}
          isoDate={params.isoDate}
          name={authUser.firstName || "no name ?!"}
        />
      </div>
    </div>
  )
}
