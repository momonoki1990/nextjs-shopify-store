import React, { useState } from "react";
import { Product } from "shopify-buy";
import ProductMainImage from "components/product/ProductMainImage";
import ProductImageList from "components/product/ProductImageList";

type Props = {
  product: Product;
};



const ProductImage: React.FC<Props> = ({ product }) => {
  const [currentImageId, setCurrentImageId] = useState<string>(
    product.images[0].id as string
  );
  return (
    <>
      <ProductMainImage product={product} currentImageId={currentImageId} />
      <ProductImageList
        product={product}
        currentImageId={currentImageId}
        setCurrentImageId={setCurrentImageId}
      />
    </>
  );
};

export default ProductImage;
