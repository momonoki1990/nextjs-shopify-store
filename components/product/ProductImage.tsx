import React, { useState } from "react";
import { Product, ProductVariant } from "shopify-buy";
import ProductMainImage from "components/product/ProductMainImage";
import ProductImageList from "components/product/ProductImageList";

type Props = {
  product: Product;
  variant: ProductVariant | null;
  imageId: string;
  setImageId: (imageId: string) => void;
};



const ProductImage: React.FC<Props> = ({ product, variant, imageId, setImageId }) => {
  
  return (
    <>
      <ProductMainImage product={product} imageId={imageId} />
      <ProductImageList
        product={product}
        imageId={imageId}
        setImageId={setImageId}
      />
    </>
  );
};

export default ProductImage;
