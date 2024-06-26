import { prisma } from "@/db"
import { sanityFetch } from "@/lib/sanity/lib/fetch"
import { eventsByIsoDateQuery, eventsQuery } from "@/lib/sanity/lib/queries"
import { NextRequest, NextResponse } from "next/server"
import { SanityDocument } from "next-sanity"
import { DateTime } from "luxon"

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
    params: { email: string }
  }
): Promise<NextResponse> {
  try {
    const { email } = params

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      const response = NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
      return response
    }

    const waitlists = await prisma.gdcwaitlist.findMany({
      where: {
        email,
      },
    })

    const isoDates = waitlists.map((waitlist) => waitlist.isodate)
    if (isoDates.length === 0) {
      const response = NextResponse.json(
        { futureEvents: [], pastEvents: [] },
        { status: 200 }
      )
      return response
    }
    let lowestDate: string = ""
    let highestDate: string = ""
    isoDates.forEach((isoDate) => {
      if (lowestDate === "") {
        lowestDate = isoDate
      }
      if (highestDate === "") {
        highestDate = isoDate
      }
      if (isoDate < lowestDate) {
        lowestDate = isoDate
      }
      if (isoDate > highestDate) {
        highestDate = isoDate
      }
    })

    let ldt = new Date(`${lowestDate}T00:00:00Z`)
    let hdt = new Date(`${highestDate}T23:59:59Z`)

    const events = await sanityFetch<GDCEvent[]>({
      query: eventsByIsoDateQuery,
      params: {
        lowestDate: ldt.toISOString(),
        highestDate: hdt.toISOString(),
      },
    })

    const now = new Date().toISOString().slice(0, 10)
    const futureEvents = events.filter((event) => {
      return event.date >= now
    })

    const pastEvents = events.filter((event) => {
      return event.date < now
    })

    const response = NextResponse.json(
      { ...user, events: { futureEvents, pastEvents } },
      { status: 200 }
    )
    return response
  } catch (error) {
    console.log("error", error)
    const response = NextResponse.json({ error }, { status: 500 })
    return response
  }
}

export async function POST(
  request: NextRequest,
  {
    params,
  }: {
    params: { email: string }
  }
) {
  try {
    const { email } = params
    const { firstname, lastname } = await request.json()
    const serverDt = DateTime.utc().toISO()

    if (!email || !firstname) {
      throw new Error("Missing required fields")
    }

    await prisma.user.update({
      where: {
        email,
      },
      data: {
        firstname,
        lastname,
        updatetime: serverDt,
      },
    })

    const response = NextResponse.json(
      { message: "User updated" },
      { status: 200 }
    )

    return response
  } catch (error) {
    const response = NextResponse.json({ error }, { status: 500 })
    return response
  }
}
