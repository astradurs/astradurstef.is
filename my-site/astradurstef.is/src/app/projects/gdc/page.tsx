import { redirect } from "next/navigation"
import { getAuthorizationUrl, getUser } from "@/app/auth"
import _ from "lodash"
import { eventsQuery } from "@/lib/sanity/lib/queries"
import { SanityDocument } from "sanity"
import { sanityFetch } from "@/lib/sanity/lib/fetch"
import Link from "next/link"

interface Event extends SanityDocument {
  title: string
  date: string
  limit: number
  slug: {
    current: string
  }
}

export default async function GDC() {
  const { isAuthenticated: userAuthenticated, user: authUser } = await getUser()

  if (!userAuthenticated || !authUser) {
    const authKitUrl = getAuthorizationUrl("projects/gdc")

    return redirect(authKitUrl)
  }

  const events = await sanityFetch<Event[]>({ query: eventsQuery })

  return (
    <div>
      <h1 className="text-xl font-bold">Hæ {authUser.firstName || null}</h1>
      <p>Hér eru næstu GDC viðburðir</p>
      <div className="h-4" />
      <div className="grid">
        {events.map((event) => (
          <Link
            key={event._id}
            href={`gdc/${event.slug.current}`}
            className="grid group"
          >
            <span className="font-semibold group-hover:text-primary/70">
              {event.title}
            </span>
            <span className="text-primary/70 group-hover:text-primary/40">
              Hvenær: {event.date.split("T")[0]}
            </span>
            <span className="text-primary/70 group-hover:text-primary/40">
              Max pax: {event.limit}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
