"use server";

import { z } from "zod";
import fs from "fs/promises";
import db from "@/app/libs/db";
import getSession from "@/app/libs/session";
import { redirect } from "next/navigation";
import { uploadProductSchema } from "./schema";

export async function uploadProduct(_: any, formData: FormData) {
  const data = {
    image: formData.get("image"),
    title: formData.get("title"),
    price: formData.get("price"),
    description: formData.get("description"),
  };
  if (data.image instanceof File) {
    const imageBufferData = await data.image.arrayBuffer();
    await fs.appendFile(
      `./public/${data.image.name}`,
      Buffer.from(imageBufferData)
    );
    data.image = `/${data.image.name}`;
  }
  const result = uploadProductSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  }
  const session = await getSession();
  if (session.id) {
    await db.product.create({
      data: {
        title: result.data.title,
        price: result.data.price,
        image: result.data.image,
        description: result.data.description,
        user: {
          connect: {
            id: session.id,
          },
        },
      },
      select: {
        id: true,
      },
    });
    redirect("/products");
  }
}
