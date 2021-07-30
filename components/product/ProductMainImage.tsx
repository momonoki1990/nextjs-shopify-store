import React, { useContext } from "react";
import Image from "next/image";
import { ProductContext } from "pages/products/[handle]";
import { AlbumRounded } from "@material-ui/icons";

const ProductMainImage: React.FC = () => {
  const { product, imageId } = useContext(ProductContext);

  const selectedImage = product.images.find((image) => image.id === imageId);

  return (
    <figure className="m-0">
      {product ? (
        <Image priority src={selectedImage.src} height={2000} width={2000} />
      ) : (
        <div>hello</div>
      )}
    </figure>
  );
};

export default ProductMainImage;
