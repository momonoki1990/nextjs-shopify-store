import React, { useContext } from "react";
import Image from "next/image";
import { ProductContext } from "pages/products/[handle]";



const ProductMainImage: React.FC = () => {
  const { product, imageId } = useContext(ProductContext);
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
