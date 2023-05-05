import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  userId: string;
}

export async function GET(req: Request, { params }: { params: IParams }) {
  try {
    const { userId } = params;

    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid ID");
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId as string,
      },
    });

    const followersCount = await prisma.user.count({
      where: {
        followingIds: {
          has: userId as string,
        },
      },
    });

    return NextResponse.json({ ...existingUser, followersCount });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
