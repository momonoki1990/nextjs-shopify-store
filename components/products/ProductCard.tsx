import React from 'react'
import Image from "next/image"
import { Product } from "shopify-buy"

type Props = {
  product: Product
}

const ProductCard: React.FC<Props> = ({ product }) => {
  // product.variantsから価格に関する情報を取得する
  const { variants } = product;
  variants.sort((a, b) => {
    const [ priceA, priceB ]: number[] = [a.price, b.price].map((str) => Number(str));
    if (priceA > priceB) return 1;
    if (priceA < priceB) return -1;
    return 0;
  })
  const price: number = Number(variants[0].price);
  const priceVaries: boolean = variants[0].price !== variants[variants.length - 1].price;

  return (
    <div className="product-card__wrapper" style={{ flex: "0 0 25%" }}>
      <div className="product-card__inner">
        <figure className="product-card__image" style={{ margin: 0 }}>
          <Image
            priority
            src={product.images[0].src}
            height={250}
            width={250}
          />
        </figure>
        <div
          className="product-card__description"
          style={{ margin: "0 auto", textAlign: "left", width: "250px" }}
        >
          <div className="product-card__title">{product.title}</div>
          <div className="product-card__price">{price}{priceVaries && "から"}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard