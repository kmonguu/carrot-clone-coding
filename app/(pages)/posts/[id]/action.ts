"use server";

import db from "@/app/libs/db";
import getSession from "@/app/libs/session";
import { revalidateTag } from "next/cache";

export const likePost = async (postId: number) => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const session = await getSession();
  try {
    await db.like.create({
      data: {
        postId,
        userId: session.id!,
      },
    });
    revalidateTag(`like-status-${postId}`);
  } catch (e) {}
};

export const disLikePost = async (postId: number) => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  try {
    const session = await getSession();
    await db.like.delete({
      where: {
        id: {
          postId,
          userId: session.id!,
        },
      },
    });
    revalidateTag(`like-status-${postId}`);
  } catch (e) {}
};
