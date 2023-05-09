import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Form from "@/components/Form";
import PostFeed from "@/components/posts/PostFeed";
import ClientOnly from "@/components/ClientOnly";
import getCurrentUser from "@/actions/getCurrentUser";
import getPosts from "@/actions/getPosts";

const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
  const currentUser = await getCurrentUser();
  const posts = await getPosts({});

  return (
    <div>
      <Header label="Home" />
      <ClientOnly>
        <Form placeholder="What's happening?" currentUser={currentUser} />
        <PostFeed posts={posts} currentUser={currentUser}/>
      </ClientOnly>
    </div>
  );
}
