"use client";
import axios from "axios";
import { useCallback, useMemo, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import useLoginModal from "./useLoginModal";
import getPostById from "@/actions/getPostById";
import getCurrentUser from "@/actions/getCurrentUser";
import { SafeUser } from "@/types";
import { Post } from "@prisma/client";
import { useRouter } from "next/navigation";

const useLike = ({
  post,
  currentUser,
}: {
  post: Post;
  currentUser?: SafeUser | null;
}) => {
  const loginModal = useLoginModal();
  const Router = useRouter();

  const hasLiked = useMemo(() => {
    const list = post?.likedIds || [];

    return list.includes(currentUser?.id as string);
  }, [post, currentUser]);

  const toggleLike = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;

      if (hasLiked) {
        request = () => axios.delete(`/api/like/${post.id}`);
      } else {
        request = () => axios.post(`/api/like/${post.id}`);
      }

      await request();

      toast.success("Success");
      Router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  }, [currentUser, hasLiked, post.id, loginModal]);

  return {
    hasLiked,
    toggleLike,
  };
};

export default useLike;
