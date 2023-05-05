import prisma from "@/libs/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();

  try {
    const body = await req.json();

    const { postId } = body;

    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid ID");
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new Error("Invalid ID");
    }

    let updatedLikedIds = [...(post.likedIds || [])];

    updatedLikedIds.push(currentUser?.id as string);

    // NOTIFICATION PART START
    try {
      if (post?.userId) {
        await prisma.notification.create({
          data: {
            body: "Someone liked your tweet!",
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

    return NextResponse.json("Liked");
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}

export async function DELETE(req: Request) {
  const currentUser = await getCurrentUser();
  try {
    const body = await req.json();

    const { postId } = body;

    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid ID");
    }

    const user = await prisma.user.findUnique({
      where: {
        id: postId,
      },
    });

    if (!user) {
      throw new Error("Invalid ID");
    }

    let updatedLikedIds = [...(user.followingIds || [])];

    updatedLikedIds = updatedLikedIds.filter(
      (likedId) => likedId !== currentUser?.id
    );

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likedIds: updatedLikedIds,
      },
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });

  }
}
