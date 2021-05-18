import React from "react";
import { Product, ProductVariant } from "shopify-buy";
import sanitizeHtml from "sanitize-html";
import ProductForm from "components/product/ProductForm";
import ProductPrice from "components/product/ProductPrice";

type Props = {
  product: Product;
  variant: ProductVariant | null;
  setVariant: any;
  setImageId: (imageId: string) => void;
};

const ProductDetail: React.FC<Props> = ({
  product,
  variant,
  setVariant,
  setImageId,
}) => {
  const { title, descriptionHtml } = product;

  return (
    <>
      <div className="title mb-4">
        <h1 className="font-bold md:font-semibold md:leading-tight text-gray-800 md:text-4xl text-3xl tracking-wide">
          {title}
        </h1>
      </div>
      <div className="price mb-8">
        <ProductPrice product={product} variant={variant} />
      </div>
      <div className="form mb-24">
        <ProductForm
          product={product}
          variant={variant}
          setVariant={setVariant}
          setImageId={setImageId}
        />
      </div>

      <div
        className="description"
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(descriptionHtml) }}
      />
    </>
  );
};

export default ProductDetail;
