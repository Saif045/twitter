import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  postId: string;
}

export async function GET(req: Request, { params }: { params: IParams }) {
  try {
    const { postId } = params;

    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid ID");
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId ,
      },
      include: {
        user: true,
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

 
    return NextResponse.json({ post }, { status: 200 })
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
