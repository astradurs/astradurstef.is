import { NextRequest, NextResponse } from "next/server"
async function addCount(id: string) {
    return await prisma.counters.update({
        where: { id },
        data: {
            count: {
                increment: 1
            }
        }
    })
}

async function removeCount(id: string) {
    return await prisma.counters.update({
        where: { id },
        data: {
            count: {
                decrement: 1
            }
        }})}

export async function POST(request: NextRequest, {
    params,
  }: {
    params: { id: string }
  }): Promise<NextResponse> {
        console.log(params.id)
        await addCount(params.id)
    
        const response = NextResponse.json({ message: "Count incremented" }, { status: 200 })
        return response
}

export async function DELETE(request: NextRequest, {
    params,
  }: {
    params: { id: string }
  }): Promise<NextResponse> {
        
        await removeCount(params.id)
    
        const response = NextResponse.json({ message: "Count decremented" }, { status: 200 })
        return response
}

