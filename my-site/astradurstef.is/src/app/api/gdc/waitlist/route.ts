// create a new gdcwaitlist table
import { NextRequest, NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    await sql`DROP TABLE IF EXISTS GDCWaitlist`
    await sql`CREATE TABLE GDCWaitlist ( 
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100),
      isodate DATE,
      createtime TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`
    const result = {
      message: "Table created",
    }
    const response = NextResponse.json({ result }, { status: 200 })
    return response
  } catch (error) {
    const response = NextResponse.json({ error }, { status: 500 })
    return response
  }
}
