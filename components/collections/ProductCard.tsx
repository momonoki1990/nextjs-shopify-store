import React from "react";
import Image from "next/image";
import { Product } from "lib/graphql/collection";
// import { Product } from "shopify-buy";
import getPriceInfoFromProduct from "lib/getPriceInfoFromProduct"

type Props = {
  product: Product;
};

const ProductCard: React.FC<Props> = ({ product }) => {
  // const { price, priceVaries } = getPriceInfoFromProduct(product);
  const price = product.priceMin;
  const priceVaries = !(product.priceMax === product.priceMin);


  return (
    <div className="product-card">
      <div className="product-card__inner">
        <figure className="product-card__image" style={{ margin: 0 }}>
          <a href={`/products/${product.handle}`}>
            <Image
              priority
              src={product.images[0]?.originalSrc}
              height={400}
              width={400}
            />
          </a>
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
