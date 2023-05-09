"use client";
import axios from "axios";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import useLoginModal from "./useLoginModal";
import { SafeUser } from "@/types";
import { useRouter } from "next/navigation";

const useFollow = ({
  currentUser,
  userId,
}: {
  currentUser?: SafeUser | null;
  userId: string;
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const isFollowing = useMemo(() => {
    const list = currentUser?.followingIds || [];

    router.refresh();
    return list.includes(userId);
  }, [currentUser, userId ,router]);

  const toggleFollow = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;

      if (isFollowing) {
        request = () => axios.delete(`/api/follow/${userId}`);
      } else {
        request = () => axios.post(`/api/follow/${userId}`);
      }

      await request();

      toast.success("Success");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  }, [currentUser, isFollowing, userId, loginModal ,router]);

  return {
    isFollowing,
    toggleFollow,
  };
};

export default useFollow;
