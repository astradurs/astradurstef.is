import { sanityFetch } from "@/lib/sanity/lib/fetch"
import { eventsQuery } from "@/lib/sanity/lib/queries"
import { NextRequest, NextResponse } from "next/server"
import { SanityDocument } from "next-sanity"

interface GDCEvent extends SanityDocument {
  title: string
  date: string
  limit: number
  slug: {
    current: string
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const events = await sanityFetch<GDCEvent[]>({ query: eventsQuery })
    const now = new Date().toISOString()
    const futureEvents = events
      .filter((event) => {
        return event.date >= now
      })
      .map((event) => {
        return { ...event, registrationStatus: "OPEN" }
      })

    const pastEvents = events
      .filter((event) => {
        return event.date < now
      })
      .map((event) => {
        return { ...event, registrationStatus: "CLOSED" }
      })

    const response = NextResponse.json(
      { futureEvents, pastEvents },
      { status: 200 }
    )
    return response
  } catch (error) {
    const response = NextResponse.json({ error }, { status: 500 })
    return response
  }
}
