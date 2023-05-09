import prisma from "../libs/prismadb";

interface IParams {
  userId: string;
}

export default async function getUserById(params: IParams) {
  try {
    const { userId } = params;

    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid ID");
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId as string,
      },
    });

    if (!existingUser) {
      throw new Error("Invalid ID");
    }
    const followersCount = await prisma.user.count({
      where: {
        followingIds: {
          has: userId ,
        },
      },
    });
    return {
      ...existingUser,
      followersCount,
      createdAt: existingUser.createdAt.toISOString(),
      updatedAt: existingUser.updatedAt.toISOString(),
      emailVerified: existingUser.emailVerified?.toISOString() || null,
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
