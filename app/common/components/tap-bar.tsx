"use client";

import {
  HomeIcon as HomeIcon_solid,
  NewspaperIcon as NewspaperIcon_solid,
  ChatBubbleOvalLeftEllipsisIcon as ChatBubbleOvalLeftEllipsisIcon_solid,
  VideoCameraIcon as VideoCameraIcon_solid,
  UserIcon as UserIcon_solid,
} from "@heroicons/react/24/solid";
import {
  HomeIcon as HomeIcon_outline,
  NewspaperIcon as NewspaperIcon_outline,
  ChatBubbleOvalLeftEllipsisIcon as ChatBubbleOvalLeftEllipsisIcon_outline,
  VideoCameraIcon as VideoCameraIcon_outline,
  UserIcon as UserIcon_outline,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TabBar() {
  const pathName = usePathname();

  return (
    <div className="fixed bottom-0 w-full mx-auth max-w-screen-md grid grid-cols-5 border-neutral-500 border-t px-5 py-3 bg-neutral-800">
      <Link href="/products" className="flex flex-col items-center gap-px">
        {pathName === "/home" ? (
          <HomeIcon_solid className="size-7" />
        ) : (
          <HomeIcon_outline className="size-7" />
        )}
        <span>홈</span>
      </Link>
      <Link href="/life" className="flex flex-col items-center gap-px">
        {pathName === "/life" ? (
          <NewspaperIcon_solid className="size-7" />
        ) : (
          <NewspaperIcon_outline className="size-7" />
        )}
        <span>동네생활</span>
      </Link>
      <Link href="/chat" className="flex flex-col items-center gap-px">
        {pathName === "/chat" ? (
          <ChatBubbleOvalLeftEllipsisIcon_solid className="size-7" />
        ) : (
          <ChatBubbleOvalLeftEllipsisIcon_outline className="size-7" />
        )}
        <span>채팅</span>
      </Link>
      <Link href="/live" className="flex flex-col items-center gap-px">
        {pathName === "/live" ? (
          <VideoCameraIcon_solid className="size-7" />
        ) : (
          <VideoCameraIcon_outline className="size-7" />
        )}
        <span>쇼핑</span>
      </Link>
      <Link href="/my" className="flex flex-col items-center gap-px">
        {pathName === "/my" ? (
          <UserIcon_solid className="size-7" />
        ) : (
          <UserIcon_outline className="size-7" />
        )}
        <span>나의 당근</span>
      </Link>
    </div>
  );
}
