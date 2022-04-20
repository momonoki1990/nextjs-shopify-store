import React from "react";
import Image from "next/image";
import { Product } from "lib/graphql/collection/getCollectionWithProducts";
import Link from "next/link";

type Props = {
  product: Product;
};

const ProductCard: React.FC<Props> = ({ product }) => {
  const price = product.priceMin;
  const priceVaries = !(product.priceMax === product.priceMin);

  return (
    <div className="product-card">
      <div className="product-card__inner">
        <figure className="product-card__image" style={{ margin: 0 }}>
          <Link href={`/products/${product.handle}`} passHref>
            <a>
              <Image
                priority
                src={product.images[0]?.originalSrc}
                height={400}
                width={400}
                alt={product.title}
              />
            </a>
          </Link>
        </figure>
        <div className="mt-2 product-card__info" style={{ textAlign: "left" }}>
          <div className="font-semibold text-sm product-card__title md:text-base">
            {product.title}
          </div>
          <div className="font-semibold  text-sm product-card__price">
            ¥{price.toLocaleString("ja-JP")}
            {priceVaries && "から"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
