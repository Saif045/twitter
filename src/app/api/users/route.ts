import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });

  }
}
