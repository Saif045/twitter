import prisma from "@/libs/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { userId } = body;

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
    } catch (error) {
      console.log(error);
    }

    return NextResponse.json("Followed");
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();

    const { userId } = body;

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

    const currentUser = await getCurrentUser();

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
