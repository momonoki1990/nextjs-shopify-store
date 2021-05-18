import React from "react";
import { Product, ProductVariant } from "shopify-buy";
import ProductOption from "components/product/ProductOption";

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
        <div className="cart-submit mb-2">
          <button className="border border-gray-900 font-semibold inline-block text-gray-700 rounded-sm px-4 py-3 text-sm w-full">
            カートに追加する
          </button>
        </div>

        <div className="to-checkout">
          <button className="bg-gray-800 border border-gray-900 inline-block rounded-sm px-4 py-3 text-white text-sm w-full">
            今すぐ購入
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductForm;