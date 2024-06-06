import { prisma } from "@/db"
import { NextRequest, NextResponse } from "next/server"

async function solveField({
  email,
  eventSlug,
  field,
}: {
  email: string
  eventSlug: string
  field: string
}) {
  const bingocard = await prisma.bingocard.findFirst({
    where: { email, eventslug: eventSlug },
  })

  if (!bingocard) {
    throw new Error("Bingo card not found")
  }

  const bingocardFields = bingocard.fields
  const bingocardSolves = bingocard.solves

  const hasField = bingocardFields.some((f) => {
    return f === field
  })
  const hasSolved = bingocardSolves.some((f) => {
    return f === field
  })

  if (!hasField) {
    throw new Error("Field not found")
  }

  if (hasSolved) {
    throw new Error("Field already solved")
  }

  await prisma.bingocard.update({
    where: { email_eventslug: { email, eventslug: eventSlug } },
    data: {
      solves: {
        push: field,
      },
    },
  })

  return field
}

async function unsolveField({
  email,
  eventSlug,
  field,
}: {
  email: string
  eventSlug: string
  field: string
}) {
  const bingocard = await prisma.bingocard.findFirst({
    where: { email, eventslug: eventSlug },
  })

  if (!bingocard) {
    throw new Error("Bingo card not found")
  }

  const bingocardFields = bingocard.fields
  const bingocardSolves = bingocard.solves

  const hasField = bingocardFields.some((f) => {
    return f === field
  })

  if (!hasField) {
    throw new Error("Field not found")
  }

  const hasSolved = bingocardSolves.some((f) => {
    return f === field
  })

  if (!hasSolved) {
    throw new Error("Field not solved")
  }

  await prisma.bingocard.update({
    where: { email_eventslug: { email, eventslug: eventSlug } },
    data: {
      solves: {
        set: bingocardSolves.filter((f) => f !== field),
      },
    },
  })

  return field
}

export async function POST(
  request: NextRequest,
  {
    params,
  }: {
    params: { email: string; eventSlug: string }
  }
): Promise<NextResponse> {
  const data = await request.json().then((data) => {
    return data
  })

  const { email, eventSlug } = params
  const { field, action } = data

  if (action === "solve") {
    const solvedField = await solveField({ email, eventSlug, field })
    return NextResponse.json(solvedField, { status: 200 })
  }

  if (action === "unsolve") {
    const unsolvedField = await unsolveField({ email, eventSlug, field })
    return NextResponse.json(unsolvedField, { status: 200 })
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 })
}
