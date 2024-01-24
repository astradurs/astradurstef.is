import { sql } from "@vercel/postgres"
import { revalidatePath } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

export async function DELETE(
  request: NextRequest,
  {
    params,
  }: {
    params: { isoDate: string; email: string }
  }
): Promise<NextResponse> {
  try {
    const url = request.url
    const { isoDate, email } = params

    if (!isoDate || !email) {
      throw new Error("Missing required fields")
    }
    await sql`DELETE FROM GDCWaitlist WHERE isodate = ${isoDate} AND Email = ${email}`
    const result = {
      message: "Entry deleted",
    }
    const response = NextResponse.json({ result }, { status: 200 })
    revalidatePath(url, "page")
    return response
  } catch (error) {
    const response = NextResponse.json({ error }, { status: 500 })
    return response
  }
}
