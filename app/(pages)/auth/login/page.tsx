"use client";

import Button from "@/app/common/components/button";
import Input from "@/app/common/components/input";
import SocialLogin from "./social-login";
import { useFormState } from "react-dom";
import { login } from "./action";

export default function Login() {
  const [state, dispatch] = useFormState(login, null);

  return (
    <div className="flex flex-col gap-10 p-8">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">Login</h1>
        <h2 className="text-xl">Log in with Email and Password</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <div className="flex flex-col gap-4">
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
        </div>
        <Button label="Login" />
      </form>
      <SocialLogin />
    </div>
  );
}
