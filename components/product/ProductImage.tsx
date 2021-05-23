import React from "react";
import { Product, ProductVariant } from "shopify-buy";
import ProductMainImage from "components/product/ProductMainImage";
import ProductImageList from "components/product/ProductImageList";

const ProductImage: React.FC = () => {
  
  return (
    <>
      <ProductMainImage />
      <ProductImageList />
    </>
  );
};

export default ProductImage;
