"use client";

import Button from "@/app/common/components/button";
import Input from "@/app/common/components/input";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { uploadProduct } from "./action";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadProductType, uploadProductSchema } from "./schema";

export default function ProductAdd() {
  const [state, action] = useFormState(uploadProduct, null);
  const [preView, setPreView] = useState("");
  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = e;
    if (!files) return;
    const file = files[0];
    const url = URL.createObjectURL(file);

    setPreView(url);
  };

  return (
    <div>
      <form action={action} className="flex flex-col gap-5 p-5">
        <label
          htmlFor="image"
          style={{
            backgroundImage: `url(${preView})`,
            backgroundSize: "contain",
            backgroundRepeat: "none",
          }}
          className="border-2 aspect-square flex justify-center items-center flex-col text-neutral-400 border-neutral-400 cursor-pointer rounded-md"
        >
          {preView === "" && (
            <>
              <PhotoIcon className="w-20" />
              <div className="text-neutral-400 text-sm">
                사진을 추가해주세요.
              </div>
            </>
          )}
        </label>
        <input
          onChange={onImageChange}
          type="file"
          id="image"
          name="image"
          accept="image/*"
          className="hidden"
        />
        <Input
          name="title"
          required
          placeholder=""
          type="text"
          errorMessages={state?.fieldErrors.title}
        />
        <Input
          name="price"
          type="number"
          required
          placeholder=""
          errorMessages={state?.fieldErrors.price}
        />
        <Input
          name="description"
          type="text"
          required
          placeholder=""
          errorMessages={state?.fieldErrors.description}
        />
        <Button label="작성완료" />
      </form>
    </div>
  );
}
