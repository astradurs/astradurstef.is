import { prisma } from "@/db"
import { NextRequest, NextResponse } from "next/server"

export async function POST(
  request: NextRequest,
  {
    params,
  }: {
    params: {
      restaurantId: string
    }
  }
) {
  try {
    const { email, vote } = await request.json()

    if (!email || vote === undefined) {
      throw new Error("Missing required fields")
    }

    if (vote === null) {
      await prisma.votes.delete({
        where: {
          email_restaurantid: {
            email,
            restaurantid: params.restaurantId,
          },
        },
      })

      return NextResponse.json(null, { status: 200 })
    }

    await prisma.votes.upsert({
      where: {
        email_restaurantid: {
          email,
          restaurantid: params.restaurantId,
        },
      },
      update: {
        vote,
      },
      create: {
        email,
        restaurantid: params.restaurantId,
        vote,
      },
    })

    return NextResponse.json(null, { status: 200 })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}
