import { sql } from "@vercel/postgres"
import { NextRequest, NextResponse } from "next/server"
import _ from "lodash"
import { prisma } from "@/db"

export async function POST(
  request: NextRequest,
  {
    params,
  }: {
    params: { isoDate: string }
  }
): Promise<NextResponse> {
  try {
    const { isoDate } = params
    const { name, email } = await request.json()
    if (!isoDate || !name || !email) {
      throw new Error("Missing required fields")
    }

    await prisma.gdcwaitlist.create({
      data: {
        isodate: isoDate,
        name: name,
        email: email,
      },
    })

    const result = {
      message: "Entry created",
    }
    const response = NextResponse.json({ result }, { status: 200 })
    return response
  } catch (error) {
    const response = NextResponse.json({ error }, { status: 500 })
    return response
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
    console.log(isoDate)
    if (!isoDate) {
      throw new Error("Missing required fields")
    }

    const entries = await prisma.gdcwaitlist.findMany({
      where: {
        isodate: isoDate,
      },
    })

    const response = NextResponse.json(entries, { status: 200 })
    return response
  } catch (error) {
    const response = NextResponse.json({ error }, { status: 500 })
    return response
  }
}