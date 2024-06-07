import { prisma } from "@/db"
import { NextRequest, NextResponse } from "next/server"

async function createBingoCard({
  email,
  eventSlug,
}: {
  email: string
  eventSlug: string
}) {
  const bingoevent = await prisma.bingoevent.findUnique({
    where: { eventslug: eventSlug },
    include: {
      fields: true,
    },
  })

  if (!bingoevent) {
    throw new Error("Event not found")
  }

  const fields = bingoevent.fields
  const numberOfFields = 4 * 4
  if (fields.length < numberOfFields) {
    throw new Error("Not enough fields")
  }

  const randomizedFields = fields
    .sort(() => Math.random() - 0.5)
    .slice(0, numberOfFields)

  const fieldValues = randomizedFields.map((field) => field.fieldvalue)

  return await prisma.bingocard.create({
    data: {
      email,
      eventslug: eventSlug,
      solved: false,
      fields: fieldValues,
      solves: [],
    },
  })
}

async function deleteBingoCard({
  email,
  eventSlug,
}: {
  email: string
  eventSlug: string
}) {
  return await prisma.bingocard.delete({
    where: {
      email_eventslug: {
        email,
        eventslug: eventSlug,
      },
    },
  })
}

async function newBingoCard({
  email,
  eventSlug,
}: {
  email: string
  eventSlug: string
}) {
  await deleteBingoCard({ email, eventSlug })
  return await createBingoCard({ email, eventSlug })
}

export async function DELETE(
  request: NextRequest,
  {
    params,
  }: {
    params: { email: string; eventSlug: string }
  }
) {
  const { email, eventSlug } = params
  await deleteBingoCard({ email, eventSlug })

  const response = NextResponse.json(
    { message: "Bingo card deleted" },
    { status: 200 }
  )
  return response
}

export async function UPDATE(
  request: NextRequest,
  {
    params,
  }: {
    params: { email: string; eventSlug: string }
  }
) {
  const { email, eventSlug } = params

  await newBingoCard({ email, eventSlug })

  const response = NextResponse.json(
    { message: "Bingo card updated" },
    { status: 200 }
  )
  return response
}

export async function POST(
  request: NextRequest,
  {
    params,
  }: {
    params: { email: string; eventSlug: string }
  }
) {
  const { email, eventSlug } = params
  const bingocard = await createBingoCard({ email, eventSlug })

  const response = NextResponse.json(bingocard, { status: 200 })
  return response
}
