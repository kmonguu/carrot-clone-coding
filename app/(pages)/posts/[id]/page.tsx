import db from "@/app/libs/db";
import getSession from "@/app/libs/session";
import { dateFormatter } from "@/app/libs/utils";
import { EyeIcon } from "@heroicons/react/24/solid";
import { revalidateTag, unstable_cache } from "next/cache";
import { notFound } from "next/navigation";
import PostLikeButton from "@/app/common/components/life/like-button";
import Image from "next/image";

async function getPost(id: number) {
  try {
    const posts = await db.post.update({
      where: {
        id,
      },
      data: {
        view: {
          increment: 1,
        },
      },
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });
    return posts;
  } catch (e) {
    return null;
  }
}

const getCachePost = unstable_cache(getPost, ["post-detail"], {
  tags: ["post-detail"],
  revalidate: 60,
});

async function getLikeStatus(postId: number) {
  const session = await getSession();
  const isLiked = await db.like.findUnique({
    where: {
      id: {
        postId,
        userId: session.id!,
      },
    },
  });
  const likeCount = await db.like.count({
    where: {
      postId,
    },
  });
  return { likeCount, isLiked: Boolean(isLiked) };
}

function getLikeStatusCache(postId: number) {
  const cacheOperation = unstable_cache(getLikeStatus, ["post-like-status"], {
    tags: [`like-status-${postId}`],
  });
  return cacheOperation(postId);
}

export default async function PostDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (!id) return notFound;
  const post = await getCachePost(id);
  if (!post) return notFound;

  const { likeCount, isLiked } = await getLikeStatusCache(id);
  return (
    <div className="p-5 text-white">
      <div className="flex items-center gap-2 mb-2">
        <Image
          width={28}
          height={28}
          className="size-7 rounded-full"
          src={post.user.avatar!}
          alt={post.user.username}
        />
        <div>
          <span className="text-sm font-semibold">{post.user.username}</span>
          <div className="text-xs">
            <span>{dateFormatter(post.create_at.toString())}</span>
          </div>
        </div>
      </div>
      <h2 className="text-lg font-semibold">{post.title}</h2>
      <p className="mb-5">{post.description}</p>
      <div className="flex flex-col gap-5 items-start">
        <div className="flex items-center gap-2 text-neutral-400 text-sm">
          <EyeIcon className="size-5" />
          <span>조회 {post.view}</span>
        </div>
        <PostLikeButton isLiked={isLiked} likeCount={likeCount} postId={id} />
      </div>
    </div>
  );
}
