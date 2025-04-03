import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { courseName, description } = await req.json();

  // TODO: Save course data to database (MongoDB, PostgreSQL, etc.)
  
  return NextResponse.json({ message: "Course created successfully" }, { status: 201 });
}
