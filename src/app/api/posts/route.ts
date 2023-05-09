import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    const bodyy = await req.json();
    const { body } = bodyy;

    if (currentUser) {
      const post = await prisma.post.create({
        data: {
          body,
          userId: currentUser.id,
        },
      });

      return NextResponse.json(post);
    }
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
