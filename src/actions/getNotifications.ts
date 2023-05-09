import prisma from "../libs/prismadb";

interface IParams {
  userId: string;
}
export default async function getNotifications(params: IParams) {
  try {
    const { userId } = params;

    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid ID");
    }

    const notifications = await prisma.notification.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hasNotification: false,
      },
    });

    return notifications;
  } catch (error: any) {
    throw new Error(error);
  }
}
