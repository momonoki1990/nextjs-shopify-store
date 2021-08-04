import React from "react";
import Image from "next/image";
import { Product } from "lib/graphql/product/getProductsByTitle";

type Props = {
  product: Product;
};

export const SearchItemRow: React.FC<Props> = ({ product }) => {
  const priceVaries = !(product.priceMax === product.priceMin);

  return (
    <div>
      <a
        href={`/products/${product.handle}`}
        className="flex font-semibold items-center justify-center mb-5 text-sm md:text-base text-gray-700"
      >
        <div className="flex items-center justify-center w-full">
          <figure className="flex-grow-0 flex-shrink-0 mr-4 md:mr-6 w-16 md:w-24">
            <Image
              src={product.images[0].originalSrc}
              height={150}
              width={150}
            />
          </figure>
          <div className="w-full">{product.title}</div>
        </div>
        <div className="ml-4 md:ml-6 w-1/5 whitespace-nowrap">
          ¥{product.priceMin.toLocaleString("ja-JP")}
          {priceVaries && "から"}
        </div>
      </a>
    </div>
  );
};
