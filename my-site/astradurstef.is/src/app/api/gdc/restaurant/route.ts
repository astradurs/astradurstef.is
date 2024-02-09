import { prisma } from "@/db"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const restaurants = await prisma.restaurants.findMany({
      include: {
        votes: true,
      },
    })

    console.log("RESTAURANTS", restaurants)

    const waitlistsByRestaurantIsoDate = await prisma.gdcwaitlist.groupBy({
      by: ["restaurantid", "isodate"],
    })

    console.log("WAITLISTS", waitlistsByRestaurantIsoDate)

    const restaurantsWithWaitlists = restaurants.map((restaurant) => {
      const waitlists = waitlistsByRestaurantIsoDate.filter(
        (waitlist) => waitlist.restaurantid === restaurant.id
      )
      return {
        ...restaurant,
        waitlists,
      }
    })

    if (!restaurants) {
      return NextResponse.json(
        { error: "No restaurants found" },
        { status: 404 }
      )
    }

    return NextResponse.json(restaurantsWithWaitlists, { status: 200 })
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
    const { id, name, address, city, zip, websiteurl, googlemapsurl } =
      await request.json()

    await prisma.restaurants.create({
      data: {
        id,
        name: name.toString(),
        address,
        city,
        zip: zip.toString(),
        websiteurl,
        googlemapsurl,
      },
    })

    return NextResponse.json(null, { status: 200 })
  } catch (error) {
    console.log("ERROR", error)
    return NextResponse.json(error, { status: 500 })
  }
}
