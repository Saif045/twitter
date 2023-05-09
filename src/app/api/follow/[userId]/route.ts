import prisma from "@/libs/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";

interface IParams {
  userId?: string;
}

export async function POST(req: Request, { params }: { params: IParams }) {
  try {
    const { userId } = params;
    const currentUser = await getCurrentUser();

    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid ID");
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error("Invalid ID");
    }

    let updatedFollowingIds = [...(user.followingIds || [])];

    updatedFollowingIds.push(userId);

    // NOTIFICATION PART START
    try {
      await prisma.notification.create({
        data: {
          body: "Someone followed you!",
          userId,
        },
      });

      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          hasNotification: true,
        },
      });

      await prisma.user.update({
        where: {
          id: currentUser?.id,
        },
        data: {
          followingIds: updatedFollowingIds,
        },
      });
    } catch (error) {
      console.log(error);
    }

    return NextResponse.json("Followed");
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();
    const { userId } = params;

    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid ID");
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error("Invalid ID");
    }

    let updatedFollowingIds = [...(user.followingIds || [])];

    updatedFollowingIds = updatedFollowingIds.filter(
      (followingId) => followingId !== userId
    );

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser?.id,
      },
      data: {
        followingIds: updatedFollowingIds,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
