// create a new gdcwaitlist table
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    console.log("request", request)
    const event = await request.json().then((data) => {
      console.log("data", data)
      return data
    })
    const response = NextResponse.json(event, { status: 200 })
    return response
  } catch (error) {
    const response = NextResponse.json(error, { status: 500 })
    return response
  }
}
