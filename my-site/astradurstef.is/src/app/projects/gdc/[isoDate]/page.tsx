import { getAuthorizationUrl, getUser } from "@/app/auth"
import { redirect } from "next/navigation"
import _ from "lodash"
import { eventQuery } from "@/lib/sanity/lib/queries"
import { sanityFetch } from "@/lib/sanity/lib/fetch"
import { PortableText, PortableTextComponents } from "@portabletext/react"
import GDCWaitlist from "./components/gdc-waitlist"

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

const components: PortableTextComponents = {
  block: ({ children }) => {
    return <p>{children}</p>
  },
  marks: {
    b: ({ children }) => <span className="font-semibold">{children}</span>,
  },
}

async function EventDescription({
  event,
}: {
  event: {
    title: string
    body: any
    date: string
    location: {
      title: string
      address: string
    }
    limit: number
  }
}) {
  const eventDate = new Date(event.date)
  const eventDateFormatted = eventDate.toLocaleDateString("is-IS", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const locationQuery =
    event.location.title.split(" ").join("+") +
    "+" +
    event.location.address.split(" ").join("+")
  return (
    <div className="grid gap-4 sm:px-4">
      <h1 className="font-bold text-xl">{event.title}</h1>
      <div className="grid gap-2">
        <PortableText value={event.body} components={components} />
      </div>
      <div className="grid">
        <span className="font-bold text-xl">HVAR?!</span>
        <a
          href={`https://maps.google.com/?q=${locationQuery}`}
          className="grid group"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="font-semibold group-hover:text-primary/70">
            {event.location.title}
          </span>
          <span className="text-sm text-primary/70 group-hover:text-primary/40">
            {event.location.address}
          </span>
        </a>
      </div>
      <div className="grid">
        <span className="font-bold">HVENÆR?!</span>
        <div className="flex gap-1">
          <span>{eventDateFormatted}</span>
        </div>
      </div>
    </div>
  )
}
