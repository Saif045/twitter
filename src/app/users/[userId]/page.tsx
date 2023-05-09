import { ClipLoader } from "react-spinners";

import PostFeed from "@/components/posts/PostFeed";
import Header from "@/components/Header";
import UserBio from "@/components/users/UserBio";
import UserHero from "@/components/users/UserHero";
import getCurrentUser from "@/actions/getCurrentUser";
import getUserById from "@/actions/getUserById";
import getPosts from "@/actions/getPosts";

interface IParams {
  userId: string;
}
const UserView = async ({ params }: { params: IParams }) => {
  const userId = params.userId;

  const currentUser = await getCurrentUser();
  const fetchedUser = await getUserById({ userId });
  const posts = await getPosts({ postId: userId });

  if (!fetchedUser) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  return (
    <>
      <Header showBackArrow label={fetchedUser.name as string} />
      <UserHero userId={userId as string} fetchedUser={fetchedUser} />

      <UserBio
        userId={userId as string}
        currentUser={currentUser}
        fetchedUser={fetchedUser}
      />

      <PostFeed
        userId={userId as string}
        currentUser={currentUser}
        posts={posts}
      />
    </>
  );
};

export default UserView;
