import { sanityFetch } from "@/lib/sanity/lib/fetch"
import { eventQuery, eventsQuery } from "@/lib/sanity/lib/queries"
import { NextRequest, NextResponse } from "next/server"
import { SanityDocument } from "sanity"

interface GDCEvent extends SanityDocument {
  title: string
  date: string
  limit: number
  slug: {
    current: string
  }
}

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: { isoDate: string }
  }
): Promise<NextResponse> {
  try {
    const { isoDate } = params
    const event: GDCEvent = await sanityFetch({
      query: eventQuery,
      params: { slug: isoDate },
    })
    const now = new Date().toISOString()

    const eventDate = new Date(event.date).toISOString()
    if (eventDate < now) {
      event.registrationStatus = "CLOSED"
    }

    if (eventDate > now) {
      event.registrationStatus = "OPEN"
    }

    const response = NextResponse.json(event, { status: 200 })
    return response
  } catch (error) {
    const response = NextResponse.json({ error }, { status: 500 })
    return response
  }
}
