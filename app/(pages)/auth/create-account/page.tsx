"use client";

import Button from "@/app/common/components/button";
import Input from "@/app/common/components/input";
import SocialLogin from "../login/social-login";
import { useFormState } from "react-dom";
import { createAccount } from "./action";

export default function CreateAccount() {
  const [state, action] = useFormState(createAccount, null);

  return (
    <div className="flex flex-col gap-10 p-8">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요 👋</h1>
        <h2 className="text-xl">Full in the Form below to join!</h2>
      </div>
      <form action={action} className="flex flex-col gap-3">
        <div className="flex flex-col gap-4">
          <Input
            name="username"
            type="text"
            required
            errorMessages={state?.fieldErrors.username}
          />
          <Input
            name="email"
            type="email"
            required
            errorMessages={state?.fieldErrors.email}
          />
          <Input
            name="password"
            type="password"
            required
            errorMessages={state?.fieldErrors.password}
          />
          <Input
            name="confirm_password"
            type="password"
            required
            errorMessages={state?.fieldErrors.confirm_password}
          />
        </div>
        <Button label="Join" />
      </form>
      <SocialLogin />
    </div>
  );
}
