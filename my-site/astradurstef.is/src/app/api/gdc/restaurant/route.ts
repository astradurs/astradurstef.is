import { prisma } from "@/db"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const restaurants = await prisma.restaurants.findMany({
      include: {
        votes: true,
      },
    })

    if (!restaurants) {
      return NextResponse.json(
        { error: "No restaurants found" },
        { status: 404 }
      )
    }

    return NextResponse.json(restaurants, { status: 200 })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}

function createIdFromName(name: string) {
  const uniqueIcelandicCharacters = {
    á: "a",
    é: "e",
    í: "i",
    ó: "o",
    ú: "u",
    ý: "y",
    þ: "th",
    æ: "ae",
    ö: "o",
  }

  let effectiveName = name
  for (const [key, value] of Object.entries(uniqueIcelandicCharacters)) {
    effectiveName = effectiveName.replaceAll(new RegExp(key, "g"), value)
  }

  return effectiveName.replace(/ /g, "-").toLowerCase()
}

export async function POST(request: NextRequest) {
  try {
    const { name, address, city, zip } = await request.json()

    if (!name || !location) {
      throw new Error("Missing required fields")
    }
    const id = createIdFromName(name.toString())
    await prisma.restaurants.create({
      data: {
        id,
        name: name.toString(),
        address,
        city,
        zip: zip.toString(),
      },
    })

    return NextResponse.json(null, { status: 200 })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}