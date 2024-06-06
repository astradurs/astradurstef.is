import { prisma } from "@/db"
import { NextRequest, NextResponse } from "next/server"

async function getBingoEvent(eventSlug: string) {
  return await prisma.bingoevent.findUnique({
    where: { eventslug: eventSlug },
    include: {
      bingocards: true,
      fields: true,
    },
  })
}

async function createBingoCardField({
  eventSlug,
  fieldvalue,
}: {
  eventSlug: string
  fieldvalue: string
}) {
  return await prisma.bingocardfield.create({
    data: {
      eventslug: eventSlug,
      fieldvalue,
    },
  })
}

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: { eventSlug: string }
  }
): Promise<NextResponse> {
  const { eventSlug } = params
  const event = await getBingoEvent(eventSlug)

  if (!event) {
    const response = NextResponse.json(
      { error: "Event not found" },
      { status: 404 }
    )
    return response
  }

  const response = NextResponse.json(event, { status: 200 })
  return response
}

export async function POST(
  request: NextRequest,
  {
    params,
  }: {
    params: { eventSlug: string }
  }
): Promise<NextResponse> {
  const data = await request.json().then((data) => {
    return data
  })

  const { eventSlug } = params
  const { fieldvalue } = data
  const field = await createBingoCardField({ eventSlug, fieldvalue })

  const response = NextResponse.json(field, { status: 201 })
  return response
}
