"use client";

import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

export default function productDetailModal({
  params,
}: {
  params: { id: number };
}) {
  const router = useRouter();
  const onCloseModal = () => {
    router.back();
  };
  return (
    <div className="absolute flex justify-center items-center z-50 w-full h-full left-0 top-0 bg-black bg-opacity-50">
      <button
        onClick={onCloseModal}
        className="absolute right-10 top-10 text-neutral-200"
      >
        <XMarkIcon className="size-10" />
      </button>
      <div className=" max-w-screen-sm flex justify-center w-full h-1/2">
        <div className="flex justify-center items-center rounded-md bg-neutral-700 text-neutral-200 aspect-square ">
          <PhotoIcon className="h-28" />
        </div>
      </div>
    </div>
  );
}
