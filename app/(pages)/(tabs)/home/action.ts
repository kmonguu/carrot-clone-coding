"use server";

import db from "@/app/libs/db";
import { unstable_cache } from "next/cache";

export const getCachedProducts = unstable_cache(getInitialProducts, [
  "initialProduct",
]);

export async function getInitialProducts() {
  const products = await db.product.findMany({
    select: {
      title: true,
      price: true,
      description: true,
      image: true,
      id: true,
      create_at: true,
    },
    orderBy: {
      create_at: "desc",
    },
  });
  return products;
}

export async function getMoreProducts(page: number) {
  const products = await db.product.findMany({
    select: {
      title: true,
      price: true,
      description: true,
      image: true,
      id: true,
      create_at: true,
    },
    orderBy: {
      create_at: "desc",
    },
    skip: page * 1,
    take: 1,
  });
  return products;
}
