"use client";
import { ClipLoader } from "react-spinners";

import usePost from "@/hooks/usePost";

import Header from "@/components/Header";
import Form from "@/components/Form";
import PostItem from "@/components/posts/PostItem";
import CommentFeed from "@/components/posts/CommentFeed";
import ClientOnly from "@/components/ClientOnly";

interface IParams {
  postId: string;
}

const PostView = ({ params }: { params: IParams }) => {
  const postId = params.postId;

  const { data: fetchedPost, isLoading } = usePost(postId as string);

  if (isLoading || !fetchedPost) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  return (
    <>
      <ClientOnly>
        <Header showBackArrow label="Tweet" />
        <PostItem data={fetchedPost} />
        <Form
          postId={postId as string}
          isComment
          placeholder="Tweet your reply"
        />
        <CommentFeed comments={fetchedPost?.comments} />
      </ClientOnly>
    </>
  );
};

export default PostView;
