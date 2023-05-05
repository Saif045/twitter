import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  userId: string;
}
export  async function GET(
  req: Request,
  { params }: { params: IParams }
) {
  try {
    const { userId } = params

    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid ID");
    }

    const notifications = await prisma.notification.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hasNotification: false,
      },
    });

    return NextResponse.json(notifications);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });

  }
}
