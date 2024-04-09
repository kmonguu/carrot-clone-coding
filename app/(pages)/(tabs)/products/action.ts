"use server";

import db from "@/app/libs/db";

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
    take: 1,
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
