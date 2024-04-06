"use server";
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX } from "@/app/libs/constant";
import db from "@/app/libs/db";
import bcrypt from "bcrypt";
import { object, z } from "zod";
import { redirect } from "next/navigation";
import getSession from "@/app/libs/session";

const checkPassword = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => {
  return password === confirm_password;
};

// const checkUniqueUsername = async (username: string) => {
//   const user = await db.user.findUnique({
//     where: {
//       username: username,
//     },
//     select: {
//       id: true,
//     },
//   });
//   return !Boolean(user);
// };

// const checkUniqueEmail = async (email: string) => {
//   const user = await db.user.findUnique({
//     where: {
//       email,
//     },
//     select: {
//       id: true,
//     },
//   });
//   return !Boolean(user);
// };

const formSchema = z
  .object({
    username: z
      .string({
        required_error: "이 입력란은 필수입니다.",
      })
      .trim()
      .toLowerCase(),
    email: z.string().email("이메일 형식으로 입력해주세요.").toLowerCase(),
    password: z.string().min(PASSWORD_MIN_LENGTH, "5자리 이상입력해주세요."),
    // .regex(,
    //   PASSWORD_REGEX,
    //   "비밀번호는 소문자, 대문자, 숫자, 특수문자를 포함해야 합니다."
    // ),
    confirm_password: z
      .string()
      .min(PASSWORD_MIN_LENGTH, "5자리 이상입력해주세요."),
  })
  .superRefine(async ({ username }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "이미 존재하는 사용자 입니다.",
        path: ["username"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .superRefine(async ({ email }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "이미 존재하는 이메일입니다.",
        path: ["email"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .refine(checkPassword, {
    message: "비밀번호와 일치하지 않습니다.",
    path: ["confirm_password"],
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };

  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });
    const session = await getSession();
    session.id = user.id;
    await session.save();
    redirect("/");
  }
}
