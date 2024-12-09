"use client";

import { HandThumbUpIcon as HandThumbUpIcon_solid } from "@heroicons/react/24/solid";
import { HandThumbUpIcon as HandThumbUpIcon_outline } from "@heroicons/react/24/outline";
import { useOptimistic } from "react";
import { disLikePost, likePost } from "@/app/(pages)/posts/[id]/action";

interface Props {
  isLiked: boolean;
  likeCount: number;
  postId: number;
}

export default function PostLikeButton({ isLiked, likeCount, postId }: Props) {
  const [state, reducerFn] = useOptimistic(
    { isLiked, likeCount },
    (previousState, payload) => {
      return {
        isLiked: !previousState.isLiked,
        likeCount: previousState.isLiked
          ? previousState.likeCount - 1
          : previousState.likeCount + 1,
      };
    }
  );

  const onClickButton = async () => {
    reducerFn(undefined);
    if (isLiked) {
      await disLikePost(postId);
      return;
    }
    await likePost(postId);
    return;
  };

  return (
    <button
      onClick={onClickButton}
      className={`flex items-center gap-2 text-neutral-400 text-sm border border-neutral-400 rounded-full p-2  transition-colors ${
        state.isLiked
          ? "bg-orange-500 text-white border-orange-500"
          : "hover:bg-neutral-800"
      }`}
    >
      {state.isLiked ? (
        <HandThumbUpIcon_solid className="size-5" />
      ) : (
        <HandThumbUpIcon_outline className="size-5" />
      )}
      {state.isLiked ? (
        <span> {state.likeCount}</span>
      ) : (
        <span>공감하기 ({state.likeCount})</span>
      )}
    </button>
  );
}
