import React from "react";
import { Product } from "shopify-buy";
import getPriceInfoFromProduct from "lib/getPriceInfoFromProduct";

type Props = {
  product: Product;
};

const ProductDetail: React.FC<Props> = ({ product }) => {
  const { options } = product;
  const { price } = getPriceInfoFromProduct(product);

  return (
    <>
      <h1>{product.title}</h1>
      <div>¥{price.toLocaleString("ja-JP")}</div>

    </>
  );
};

export default ProductDetail;
