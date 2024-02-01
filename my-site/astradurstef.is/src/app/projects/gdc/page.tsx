import { redirect } from "next/navigation"
import { getAuthorizationUrl, getUser } from "@/app/auth"
import _ from "lodash"
import { eventsQuery } from "@/lib/sanity/lib/queries"
import { SanityDocument } from "sanity"
import { sanityFetch } from "@/lib/sanity/lib/fetch"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import EventsGrid from "./components/events-grid"

export default async function GDC() {
  const { isAuthenticated: userAuthenticated, user: authUser } = await getUser()

  if (!userAuthenticated || !authUser) {
    const authKitUrl = getAuthorizationUrl("projects/gdc")

    return redirect(authKitUrl)
  }

  const { futureEvents, pastEvents } = await fetch(
    `${process.env.HOST}/api/gdc/events`,
    {
      method: "GET",
      cache: "no-store",
    }
  ).then((res) => res.json())

  return (
    <div>
      <h1 className="text-xl font-bold">Hæ {authUser.firstName || null}</h1>
      <p>Hér eru næstu GDC viðburðir</p>
      <div className="h-4" />
      <EventsGrid events={futureEvents} />
      <div className="h-4" />
      <p>Hér eru liðnir GDC viðburðir</p>
      <div className="h-4" />
      <EventsGrid events={pastEvents} />
    </div>
  )
}
