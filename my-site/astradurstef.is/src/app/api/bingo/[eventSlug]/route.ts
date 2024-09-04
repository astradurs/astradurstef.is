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
  email,
}: {
  eventSlug: string
  fieldvalue: string
  email: string
}) {
  console.log(eventSlug, fieldvalue, email)
  return await prisma.bingocardfield.create({
    data: {
      eventslug: eventSlug,
      fieldvalue,
      email,
    },
  })
}

async function removeBingoCardField({
  eventSlug,
  fieldValue,
  email,
}: {
  eventSlug: string
  fieldValue: string
  email: string
}) {
  const field = await prisma.bingocardfield.findFirst({
    where: {
      eventslug: eventSlug,
      fieldvalue: fieldValue,
      email,
    },
  })

  if (!field) {
    throw new Error("Field not found")
  }

  return await prisma.bingocardfield.delete({
    where: {
      id: field.id,
    },
  })
}

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: { eventSlug: string }
  },
): Promise<NextResponse> {
  const { eventSlug } = params
  const event = await getBingoEvent(eventSlug)

  if (!event) {
    const response = NextResponse.json(
      { error: "Event not found" },
      { status: 404 },
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
  },
): Promise<NextResponse> {
  const data = await request.json().then((data) => {
    return data
  })

  const { eventSlug } = params
  const { fieldvalue, email } = data
  const field = await createBingoCardField({ eventSlug, fieldvalue, email })

  const response = NextResponse.json(field, { status: 201 })
  return response
}

export async function DELETE(
  request: NextRequest,
  {
    params,
  }: {
    params: { eventSlug: string }
  },
): Promise<NextResponse> {
  const data = await request.json().then((data) => {
    return data
  })

  const { eventSlug } = params
  const { fieldValue, email } = data
  await removeBingoCardField({ eventSlug, fieldValue, email })

  const response = NextResponse.json({ success: true }, { status: 200 })
  return response
}
