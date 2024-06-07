import { prisma } from "@/db"
import { NextRequest, NextResponse } from "next/server"

async function listCounters() {
    return await prisma.counters.findMany()
}

export async function GET(request: NextRequest): Promise<NextResponse> {
    const counters = await listCounters()

    if (!counters) {
        const response = NextResponse.json({ error: "No counters found" }, { status: 404 })
        return response
    }
    const response = NextResponse.json(counters, { status: 200 })
    return response
}
