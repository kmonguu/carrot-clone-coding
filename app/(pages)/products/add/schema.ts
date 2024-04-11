import { z } from "zod";

export const uploadProductSchema = z.object({
  image: z.string({ required_error: "상품 이미지는 필수입니다." }),
  title: z.string({ required_error: "상품 제목은 필수입니다." }),
  price: z.coerce.number({ required_error: "상품 가격은 필수입니다." }),
  description: z.string(),
});

export type UploadProductType = z.infer<typeof uploadProductSchema>;
