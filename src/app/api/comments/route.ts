import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }
  try {
    const bodyy = await req.json();
    const { body } = bodyy;

    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("postId");


    if (!postId || typeof postId !== "string" || !currentUser) {
      throw new Error("Invalid ID");
    }

    const comment = await prisma.comment.create({
      data: {
        body,
        userId: currentUser.id as string,
        postId,
      },
    });

    // NOTIFICATION PART START
    try {
      const post = await prisma.post.findUnique({
        where: {
          id: postId,
        },
      });

      if (post?.userId) {
        await prisma.notification.create({
          data: {
            body: "Someone replied on your tweet!",
            userId: post.userId,
          },
        });

        await prisma.user.update({
          where: {
            id: post.userId,
          },
          data: {
            hasNotification: true,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
    // NOTIFICATION PART END

    return NextResponse.json(comment);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
