import ProductList from "@/app/common/components/products/list";
import db from "@/app/libs/db";
import { Prisma } from "@prisma/client";
import { getInitialProducts } from "./action";

export type InitialProducts = Prisma.PromiseReturnType<
  typeof getInitialProducts
>;

export default async function Products() {
  const initialProducts = await getInitialProducts();
  return (
    <div>
      <ProductList initialProducts={initialProducts} />
    </div>
  );
}
