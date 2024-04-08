"use client";
import Button from "@/app/common/components/button";
import Input from "@/app/common/components/input";
import { useFormState } from "react-dom";
import { smsLogin } from "./action";

const initialToken = {
  token: false,
  errorMessage: undefined,
};

export default function SMSLogin() {
  const [state, dispatch] = useFormState(smsLogin, initialToken);

  return (
    <div className="flex flex-col gap-10 p-8">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS Login</h1>
        <h2 className="text-xl">Verify your phone number</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <div className="flex flex-col gap-4">
          {state.token ? (
            <Input
              name="token"
              type="number"
              required
              errorMessages={state.error?.formErrors}
            />
          ) : (
            <Input
              name="phone"
              type="text"
              required
              errorMessages={state?.error?.formErrors}
            />
          )}
        </div>
        <Button
          label={state?.token ? "Verify Token" : "Send Verification SMS"}
        />
      </form>
    </div>
  );
}
