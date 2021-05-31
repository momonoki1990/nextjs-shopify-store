import React from "react";
import ProductMainImage from "components/product/ProductMainImage";
import ProductImageList from "components/product/ProductImageList";

const ProductImage: React.FC = () => {

  return (
    <>
      <div className="main-image"><ProductMainImage /></div>
      <div className="image-list"><ProductImageList /></div>
    </>
  );
};

export default ProductImage;
