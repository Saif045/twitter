import prisma from "../libs/prismadb";

interface IParams {
  postId?: string;
}

export default async function getPosts(params: IParams) {
  try {
    const { postId } = params;

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
    return  posts ;
  } catch (error: any) {
    throw new Error(error);
  }
}
