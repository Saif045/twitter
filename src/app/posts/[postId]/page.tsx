import Header from "@/components/Header";
import Form from "@/components/Form";
import ClientOnly from "@/components/ClientOnly";
import getCurrentUser from "@/actions/getCurrentUser";
import getPostById from "@/actions/getPostById";
import { ClipLoader } from "react-spinners";
import PostItem from "@/components/posts/PostItem";
import CommentFeed from "@/components/posts/CommentFeed";

interface IParams {
  postId: string;
}

const PostView = async ({ params }: { params: IParams }) => {
  const postId = params.postId;

  const currentUser = await getCurrentUser();
  const post = await getPostById({ postId });

  if (!post) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  return (
    <>
      <Header showBackArrow label="Tweet" />
      <Form
        currentUser={currentUser}
        postId={postId as string}
        isComment
        placeholder="Tweet your reply"
      />

      <ClientOnly>
        <PostItem data={post} currentUser={currentUser} />
        <CommentFeed comments={post.comments} />
      </ClientOnly>
    </>
  );
};

export default PostView;
