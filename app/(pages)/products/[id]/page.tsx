import db from "@/app/libs/db";
import getSession from "@/app/libs/session";
import { priceKRFormatter } from "@/app/libs/utils";
import { DeviceTabletIcon } from "@heroicons/react/16/solid";
import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function getUploadUser(userId: number) {
  const session = await getSession();
  if (session.id) {
    return session.id === userId;
  }
  return false;
}

export async function getProducts(id: number) {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });
  return product;
}

export default async function ProductDetail({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }

  const product = await getProducts(id);
  if (!product) {
    return notFound();
  }

  const uploadUser = await getUploadUser(product.userId);

  return (
    <div className=" flex flex-col p-5 gap-5 ">
      <div className=" relative aspect-square ">
        <Image
          fill
          src={product.image}
          alt={product.title}
          className="h-28 text-neutral-700 object-cover"
        />
      </div>
      <div className="flex gap-3 items-center pb-5 border-neutral-700 border-b">
        <div className=" relative size-14 rounded-full">
          {product.user.avatar !== null ? (
            <Image
              src={product.user.avatar}
              alt={product.user.username}
              width={40}
              height={40}
            />
          ) : (
            <UserIcon />
          )}
        </div>
        <div>
          <h3>{product.user.username}</h3>
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-semibold">{product.title}</h1>
        <p>{product.description}</p>
      </div>
      <div className="flex justify-between items-center fixed w-full bottom-20 left-0 p-5 pb-5 bg-neutral-700">
        <span className=" font-semibold text-lg">
          {priceKRFormatter(product.price)}원
        </span>

        {uploadUser ? (
          <button className="size-5">
            <DeviceTabletIcon className=" text-red-700" />
          </button>
        ) : (
          <Link
            href=""
            className=" bg-orange-500 px-5 py-2.5 rounded-md text-white font-semibold"
          >
            채팅하기
          </Link>
        )}
      </div>
    </div>
  );
}
