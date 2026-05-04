import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const programs = await prisma.program.findMany({
      orderBy: { harga: "asc" },
    });
    return NextResponse.json({ programs });
  } catch {
    return NextResponse.json({ programs: [] }, { status: 500 });
  }
}
