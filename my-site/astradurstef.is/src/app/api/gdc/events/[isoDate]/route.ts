import { sanityFetch } from "@/lib/sanity/lib/fetch"
import { eventQuery, eventsQuery } from "@/lib/sanity/lib/queries"
import { NextRequest, NextResponse } from "next/server"
import { SanityDocument } from "next-sanity"

interface GDCEvent extends SanityDocument {
  title: string
  date: string
  limit: number
  slug: {
    current: string
  }
  registration_start: string
  registration_end: string
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
    const registrationStart = new Date(event.registration_start).toISOString()
    const registrationEnd = new Date(event.registration_end).toISOString()
    if (eventDate < now || registrationStart > now || registrationEnd < now) {
      event.registrationStatus = "CLOSED"
    }

    if (eventDate > now && registrationStart < now && registrationEnd > now) {
      event.registrationStatus = "OPEN"
    }

    const response = NextResponse.json(event, { status: 200 })
    return response
  } catch (error) {
    const response = NextResponse.json({ error }, { status: 500 })
    return response
  }
}
