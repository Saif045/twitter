import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Form from "@/components/Form";
import PostFeed from "@/components/posts/PostFeed";
import ClientOnly from "@/components/ClientOnly";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <Header label="Home" />
      <ClientOnly>
        <Form placeholder="What's happening?" />
        <PostFeed />
      </ClientOnly>
    </div>
  );
}
