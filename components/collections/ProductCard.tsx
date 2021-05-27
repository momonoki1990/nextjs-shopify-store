import React from "react";
import Image from "next/image";
import Link from "next/link";
// import { Product } from "shopify-buy";
import getPriceInfoFromProduct from "lib/getPriceInfoFromProduct"

type Props = {
  product: any;
};

const ProductCard: React.FC<Props> = ({ product }) => {
  const { price, priceVaries } = getPriceInfoFromProduct(product);
  console.log(JSON.stringify(product.handle))

  return (
    <div className="product-card">
      <div className="product-card__inner">
        <figure className="product-card__image" style={{ margin: 0 }}>
          <Link href={`/products/${product.handle}`}>
            <Image
              priority
              src={product.images[0].src}
              height={400}
              width={400}
            />
          </Link>
        </figure>
        <div className="product-card__info mt-2" style={{ textAlign: "left" }}>
          <div className="product-card__title font-semibold text-sm md:text-base">
            {product.title}
          </div>
          <div className="product-card__price  font-semibold text-sm">
            ¥{price.toLocaleString("ja-JP")}
            {priceVaries && "から"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
