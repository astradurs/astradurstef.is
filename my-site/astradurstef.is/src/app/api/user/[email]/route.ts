import { prisma } from "@/db"
import { NextRequest, NextResponse } from "next/server"

async function getUser({ email }: { email: string }) {
  return await prisma.user.findUnique({
    where: { email },
    include: {
      bingocards: true,
    },
  })
}

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: { email: string }
  }
): Promise<NextResponse> {
  const { email } = params
  const user = await getUser({ email })

  if (!user) {
    const response = NextResponse.json(
      { error: "User not found" },
      { status: 404 }
    )
    return response
  }

  const response = NextResponse.json(user, { status: 200 })
  return response
}
