import ChatBubbleOvalLeftIcon from "@heroicons/react/24/solid/ChatBubbleOvalLeftIcon";
import Link from "next/link";

export default function SocialLogin() {
  return (
    <>
      <div className="w-full h-px bg-neutral-500" />
      <div className="flex flex-col gap-3">
        <Link
          className="primary-btn flex h-10 items-center justify-center gap-3"
          href="/github"
        >
          <span>
            <ChatBubbleOvalLeftIcon className="size-5" />
          </span>
          <span>Continue with GibHub</span>
        </Link>
        <Link
          className="primary-btn flex h-10 items-center justify-center gap-3"
          href="/pages/sms"
        >
          <span>
            <ChatBubbleOvalLeftIcon className="size-5" />
          </span>
          <span>Continue with SMS</span>
        </Link>
      </div>
    </>
  );
}
