import React from "react";
import { Product } from "shopify-buy";
import ProductMainImage from "components/product/ProductMainImage";
import ProductImageList from "components/product/ProductImageList";

type Props = {
  product: Product;
};

const ProductImage: React.FC<Props> = ({ product }) => {
  return (
    <>
      <ProductMainImage product={product} imageId="" />
      <ProductImageList product={product} imageId="" />
    </>
  );
};

export default ProductImage;
