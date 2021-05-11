import React, { useState } from "react";
import { Product } from "shopify-buy";
import ProductMainImage from "components/product/ProductMainImage";
import ProductImageList from "components/product/ProductImageList";

type Props = {
  product: Product;
};



const ProductImage: React.FC<Props> = ({ product }) => {
  const [imageId, setImageId] = useState<string>(product.images[0].id as string);
  return (
    <>
      <ProductMainImage product={product} currentImageId={imageId} />
      <ProductImageList
        product={product}
        currentImageId={imageId}
        setImageId={setImageId}
      />
    </>
  );
};

export default ProductImage;
