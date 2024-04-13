"use client";

import { useEffect, useRef, useState } from "react";
import ProductListItem from "./item";
import { getMoreProducts } from "@/app/(pages)/(tabs)/home/action";
import { InitialProducts } from "@/app/(pages)/(tabs)/home/page";

interface ProductListProps {
  initialProducts: InitialProducts;
}

export default function ProductList({ initialProducts }: ProductListProps) {
  const [products, setProducts] = useState(initialProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const trigger = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => {
        const element = entries[0];
        if (element.isIntersecting && trigger.current) {
          observer.unobserve(trigger.current);
          setIsLoading(true);
          const moreProduct = await getMoreProducts(page + 1);
          if (moreProduct.length !== 0) {
            setPage((prev) => prev + 1);
          } else {
            setIsLastPage(true);
          }
          setProducts((prev) => [...prev, ...moreProduct]);
          setIsLoading(false);
        }
      },
      {
        threshold: 1.0,
      }
    );
    if (trigger.current) {
      observer.observe(trigger.current);
    }
    return () => observer.disconnect();
  }, [page]);

  return (
    <div className="flex flex-col p-5 gap-5">
      {products.map((product) => (
        <ProductListItem key={product.id} {...product} />
      ))}
      {!isLastPage && (
        <span
          ref={trigger}
          className="text-sm bg-orange-500 rounded-md px-3 py-2 hover:bg-orange-600 active:scale-95"
        >
          더 불러오기
        </span>
      )}
    </div>
  );
}
