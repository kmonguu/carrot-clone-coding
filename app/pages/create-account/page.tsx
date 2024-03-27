import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function CreateAccount() {
  return (
    <div className="flex flex-col gap-10 p-8">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요 👋</h1>
        <h2 className="text-xl">Full in the Form below to join!</h2>
      </div>
      <form className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <input
            className=" bg-transparent w-full h-10 rounded-md ring-1 ring-neutral-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
            type="text"
            placeholder="Username"
            required
          />
          <span className=" text-red-500">input error</span>
        </div>
        <button className="primary-btn h-10">JOIN</button>
      </form>
      <div className="w-full h-px bg-neutral-500" />
      <div>
        <Link
          className="primary-btn flex h-10 items-center justify-center gap-3"
          href="/sms"
        >
          <span>
            <ChatBubbleOvalLeftIcon className="size-5" />
          </span>
          <span>Sign up with SMS</span>
        </Link>
      </div>
    </div>
  );
}
