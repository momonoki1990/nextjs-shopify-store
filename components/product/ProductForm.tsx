import React from "react";
import { Product, ProductVariant } from "shopify-buy";
import ProductOption from "components/product/ProductOption";
import PaymentButton from "components/product/PaymentButton";

type Props = {
  product: Product;
  variant: ProductVariant | null;
  setVariant: any;
  setImageId: (imageId: string) => void;
};

const ProductForm: React.FC<Props> = ({
  product,
  variant,
  setVariant,
  setImageId,
}) => {
  return (
    <>
      <div className="options mb-4">
        <ProductOption
          product={product}
          variant={variant}
          setVariant={setVariant}
          setImageId={setImageId}
        />
      </div>
      <div className="payment-buttons md:px-2">
        <PaymentButton product={product} variant={variant} />
      </div>
    </>
  );
};

export default ProductForm;