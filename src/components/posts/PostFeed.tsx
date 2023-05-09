"use client";
import { Post } from "@prisma/client";
import PostItem from "./PostItem";
import { SafeUser } from "@/types";

interface PostFeedProps {
  userId?: string;
  posts?: Post[];
  currentUser?: SafeUser | null;
}

const PostFeed: React.FC<PostFeedProps> = ({
  userId,
  posts = [],
  currentUser,
}) => {
  return (
    <>
      {posts.map((post: Post) => (
        <PostItem
          userId={userId}
          key={post.id}
          data={post}
          currentUser={currentUser}
        />
      ))}
    </>
  );
};

export default PostFeed;
