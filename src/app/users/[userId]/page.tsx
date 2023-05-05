"use client";
import { ClipLoader } from "react-spinners";

import useUser from "@/hooks/useUser";

import PostFeed from "@/components/posts/PostFeed";
import Header from "@/components/Header";
import UserBio from "@/components/users/UserBio";
import UserHero from "@/components/users/UserHero";
import ClientOnly from "@/components/ClientOnly";

interface IParams {
  userId: string;
}
const UserView = ({ params }: { params: IParams }) => {
  const userId = params.userId;

  const { data: fetchedUser, isLoading } = useUser(userId as string);

  if (isLoading || !fetchedUser) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  return (
    <>
      <ClientOnly>
        <Header showBackArrow label={fetchedUser?.name} />
        <UserHero userId={userId as string} />
        <UserBio userId={userId as string} />
        <PostFeed userId={userId as string} />
      </ClientOnly>
    </>
  );
};

export default UserView;
