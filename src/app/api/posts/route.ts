import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await req.json();
    if (currentUser) {
      const post = await prisma.post.create({
        data: {
          body,
          userId: currentUser.id as string,
        },
      });

      return NextResponse.json(post);
    }
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("userId");

    console.log("userId", postId);
    console.log("searchParams", searchParams);

    let posts;

    if (postId && typeof postId === "string") {
      posts = await prisma.post.findMany({
        where: {
          userId: postId.toString(),
        },
        include: {
          user: true,
          comments: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } else {
      posts = await prisma.post.findMany({
        include: {
          user: true,
          comments: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }
    return NextResponse.json(posts);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
