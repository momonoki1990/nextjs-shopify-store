import React, { useContext } from "react";
import { Product, ProductVariant } from "shopify-buy";
import ProductOption from "components/product/ProductOption";
import PaymentButton from "components/product/PaymentButton";

const ProductForm: React.FC = () => {
  return (
    <>
      <div className="options mb-4">
        <ProductOption />
      </div>
      <div className="payment-buttons md:px-2">
        <PaymentButton />
      </div>
    </>
  );
};

export default ProductForm;