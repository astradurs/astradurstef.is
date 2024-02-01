import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/db"

export async function DELETE(
  request: NextRequest,
  {
    params,
  }: {
    params: { isoDate: string; email: string }
  }
): Promise<NextResponse> {
  try {
    const { isoDate, email } = params

    if (!isoDate || !email) {
      throw new Error("Missing required fields")
    }

    await prisma.gdcwaitlist.delete({
      where: {
        isodate_email: {
          isodate: isoDate,
          email: email,
        },
      },
    })

    const result = {
      message: "Entry deleted",
    }
    const response = NextResponse.json({ result }, { status: 200 })
    return response
  } catch (error) {
    const response = NextResponse.json({ error }, { status: 500 })
    return response
  }
}
