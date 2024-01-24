import { sql } from "@vercel/postgres"
import { NextRequest, NextResponse } from "next/server"
import _ from "lodash"
import { revalidatePath } from "next/cache"

export async function POST(
  request: NextRequest,
  {
    params,
  }: {
    params: { isoDate: string }
  }
): Promise<NextResponse> {
  try {
    const url = request.url
    const { isoDate } = params
    const { name, email } = await request.json()
    if (!isoDate || !name || !email) {
      throw new Error("Missing required fields")
    }
    const tableEntry = await sql`SELECT * FROM GDCWaitlist 
        WHERE email = ${email} AND isodate = ${isoDate}`
    const hasEntry = tableEntry.rowCount > 0
    if (hasEntry) {
      const result = {
        message: "Entry already exists",
      }
      const response = NextResponse.json({ result }, { status: 200 })
      return response
    }

    await sql`INSERT INTO GDCWaitlist (
      isodate,
      name,
      email
    ) 
    VALUES (
      ${isoDate},
      ${name},
      ${email}
    )`

    const result = {
      message: "Entry created",
    }
    const response = NextResponse.json({ result }, { status: 200 })
    revalidatePath(url, "page")
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
    if (!isoDate) {
      throw new Error("Missing required fields")
    }
    const entries =
      await sql`SELECT * FROM GDCWaitlist WHERE isodate = ${isoDate}`
    const result = entries.rows
    const response = NextResponse.json(result, { status: 200 })
    return response
  } catch (error) {
    const response = NextResponse.json({ error }, { status: 500 })
    return response
  }
}
