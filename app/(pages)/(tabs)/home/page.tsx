import ProductList from "@/app/common/components/products/list";
import db from "@/app/libs/db";
import { Prisma } from "@prisma/client";
import { getInitialProducts } from "./action";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/solid";

export type InitialProducts = Prisma.PromiseReturnType<
  typeof getInitialProducts
>;

export const metaData = { title: "Home" };

export default async function Products() {
  const initialProducts = await getInitialProducts();
  return (
    <div>
      <ProductList initialProducts={initialProducts} />
      <Link
        href="/products/add"
        className="flex justify-center items-center bg-orange-500 rounded-full size-16 fixed bottom-24 right-8 text-white transition-colors hover:bg-orange-400"
      >
        <PlusIcon className="size-10" />
      </Link>
    </div>
  );
}
