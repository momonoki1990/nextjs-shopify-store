import React from "react";
import Image from "next/image";
import { Product } from "lib/graphql/product/getProductsByTitle";
import Link from "next/link";

type Props = {
  product: Product;
};

export const SearchItemRow: React.FC<Props> = ({ product }) => {
  const priceVaries = !(product.priceMax === product.priceMin);

  return (
    <div>
      <Link href={`/products/${product.handle}`} passHref>
        <a className="flex font-semibold text-sm mb-5 text-gray-700 items-center justify-center md:text-base">
          <div className="flex w-full items-center justify-center">
            <figure className="flex-grow-0 flex-shrink-0 mr-4 w-16 md:mr-6 md:w-24">
              <Image
                src={product.images[0].originalSrc}
                height={150}
                width={150}
                alt={product.title}
              />
            </figure>
            <div className="w-full">{product.title}</div>
          </div>
          <div className="ml-4 w-1/5 whitespace-nowrap md:ml-6">
            ¥{product.priceMin.toLocaleString("ja-JP")}
            {priceVaries && "から"}
          </div>
        </a>
      </Link>
    </div>
  );
};
