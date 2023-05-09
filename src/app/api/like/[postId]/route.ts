import prisma from "@/libs/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";

interface IParams {
  postId?: string;
}

export async function POST(req: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  try {
    const { postId } = params;

    if (!postId || typeof postId !== "string" || !currentUser) {
      throw new NextResponse("Invalid ID", { status: 400 });
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new NextResponse("Invalid ID", { status: 400 });
    }

    let updatedLikedIds = [...(post.likedIds || [])];

    updatedLikedIds.push(currentUser.id);

    // NOTIFICATION PART START
    try {
      if (post.userId) {
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
        await prisma.post.update({
          where: {
            id: postId,
          },
          data: {
            likedIds: updatedLikedIds,
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

export async function DELETE(req: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  try {
    const { postId } = params;

    if (!postId || typeof postId !== "string") {
      throw new NextResponse("Invalid ID", { status: 400 });
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new NextResponse("Invalid ID", { status: 400 });
    }
    let updatedLikedIds = [...(post.likedIds || [])];

    updatedLikedIds = updatedLikedIds.filter(
      (likedId) => likedId !== currentUser?.id
    );
    let updatedPost = await prisma.post.update({
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
