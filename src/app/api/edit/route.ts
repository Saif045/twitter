import prisma from "@/libs/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";

export  async function PATCH(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    const body = await req.json();

    const { name, username, bio, profileImage, coverImage } = body;

    if (!name || !username) {
      throw new Error("Missing fields");
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser?.id,
      },
      data: {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });

  }
}
