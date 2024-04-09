import { dateFormatter, priceKRFormatter } from "@/app/libs/utils";
import Image from "next/image";
import Link from "next/link";

interface ProductListProps {
  title: string;
  price: number;
  description: string;
  image: string;
  create_at: Date;
  id: number;
}

export default function ProductListItem({
  title,
  price,
  description,
  image,
  create_at,
  id,
}: ProductListProps) {
  return (
    <Link href={`/products/${id}`} className="flex gap-5">
      <div className=" relative size-28 rounded-md overflow-hidden">
        <Image fill src={image} alt={title} className=" object-cover" />
      </div>
      <div className="flex flex-col gap-1 *:text-white">
        <span className="text-lg">{title}</span>
        <span className="text-sm text-neutral-500">
          {dateFormatter(create_at.toString())}
        </span>
        <span className="text-lg font-semibold">{priceKRFormatter(price)}</span>
      </div>
    </Link>
  );
}
