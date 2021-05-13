import React from "react";
import Image from "next/image";
import { Product } from "shopify-buy";

type Props = {
  product: Product;
  imageId: string;
};

const ProductMainImage: React.FC<Props> = ({ product, imageId }) => {
  const selectedImage = product.images.find((image) => image.id === imageId);
  return (
    <figure className="m-0">
      <Image
        priority
        src={selectedImage.src}
        height={2000}
        width={2000}
      ></Image>
    </figure>
  );
};

export default ProductMainImage;
