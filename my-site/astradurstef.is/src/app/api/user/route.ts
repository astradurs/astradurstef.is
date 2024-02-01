// create a new gdcwaitlist table
import { prisma } from "@/db"
import { NextRequest, NextResponse } from "next/server"

type RequestEventType = {
  id: string
  data: {
    id: string
    email: string
    object: string
    last_name: string | null
    created_at: string
    first_name: string | null
    updated_at: string
    email_verified: boolean
  }
  event: "user.created" | "user.updated"
  created_at: string
}

async function updateUser({
  email,
  firstname,
  lastname,
}: {
  email: string
  firstname: string | null
  lastname: string | null
}) {
  await prisma.user.update({
    where: { email },
    data: {
      firstname,
      lastname,
    },
  })
}

async function createUser({
  email,
  firstname,
  lastname,
}: {
  email: string
  firstname: string | null
  lastname: string | null
}) {
  await prisma.user.create({
    data: {
      email,
      firstname,
      lastname,
    },
  })
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    console.log("request", request)
    const event: RequestEventType = await request.json().then((data) => {
      console.log("data", data)
      return data
    })

    const { data, event: eventType } = event

    const { email, first_name, last_name } = data

    if (eventType === "user.created") {
      await createUser({
        email,
        firstname: first_name,
        lastname: last_name,
      })
    } else if (eventType === "user.updated") {
      await updateUser({
        email,
        firstname: first_name,
        lastname: last_name,
      })
    }

    const response = NextResponse.json(event, { status: 200 })
    return response
  } catch (error) {
    const response = NextResponse.json(error, { status: 500 })
    return response
  }
}
