"use server";

import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX } from "@/app/libs/constant";
import db from "@/app/libs/db";
import getSession from "@/app/libs/session";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { z } from "zod";

const checkEmailExist = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
    },
  });
  return Boolean(user);
};

const formSchema = z.object({
  email: z.string().email().toLowerCase().refine(checkEmailExist),
  password: z.string().min(PASSWORD_MIN_LENGTH, "5자리 이상입력해주세요."),
  // .regex(
  //   PASSWORD_REGEX,
  //   "비밀번호는 소문자, 대문자, 숫자, 특수문자를 포함해야 합니다."
  // ),
});

export async function login(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  }
  const user = await db.user.findUnique({
    where: {
      email: result.data.email,
    },
    select: {
      id: true,
      password: true,
    },
  });
  const isPasswordMatch = await bcrypt.compare(
    result.data.password,
    user?.password ?? ""
  );
  if (!isPasswordMatch) {
    return {
      fieldErrors: {
        password: ["비밀번호를 다시 확인해주세요."],
        email: [],
      },
    };
  }
  if (isPasswordMatch) {
    const session = await getSession();
    session.id = user!.id;
    await session.save();
    redirect("/");
  }
}
