"use server";

import { redirect } from "next/navigation";
import validator from "validator";
import { z } from "zod";

interface ActionState {
  token: boolean;
}

const phoneNumberSchema = z
  .string()
  .trim()
  .refine(
    (phone) => validator.isMobilePhone(phone, "ko-KR"),
    "잘못된 번호 형식입니다."
  );
const tokenSchema = z.coerce.number().min(100000).max(999999);

export async function smsLogin(prevState: ActionState, formData: FormData) {
  const phone = formData.get("phone");
  const token = formData.get("token");

  if (!prevState.token) {
    const phone_result = phoneNumberSchema.safeParse(phone);

    if (!phone_result.success) {
      return { token: false, error: phone_result.error.flatten() };
    }
    return { token: true };
  }
  const token_result = tokenSchema.safeParse(token);
  if (!token_result.success) {
    return {
      token: true,
      error: token_result.error.flatten(),
    };
  }
  redirect("/");
}
