import db from "@/app/libs/db";
import { dateFormatter } from "@/app/libs/utils";
import {
  ChatBubbleBottomCenterIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

export async function getPosts() {
  const posts = await db.post.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      view: true,
      create_at: true,
      _count: {
        select: {
          comments: true,
          likes: true,
        },
      },
    },
  });
  return posts;
}

export const metadata = { title: "동네생활" };

export default async function Life() {
  const posts = await getPosts();
  return (
    <div className="p-5 flex flex-col">
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/posts/${post.id}`}
          className="flex flex-col pb-5 mb-5 border-b border-neutral-500 text-neutral-400 last:border-b-0 gap-2"
        >
          <h2 className="text-white text-lg font-semibold">{post.title}</h2>
          <p>{post.description}</p>
          <div className="flex items-center justify-between text-sm">
            <div className="flex gap-4 items-center">
              <span>{dateFormatter(post.create_at.toString())}</span>
              <span>.</span>
              <span>조회 {post.view}</span>
            </div>
            <div className="flex gap-4 items-center *:flex *:items-center *:gap-1">
              <span>
                <HandThumbUpIcon className="size-4" />
                {post._count.likes}
              </span>
              <span>
                <ChatBubbleBottomCenterIcon className="size-4" />
                {post._count.comments}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}