import React from "react";
import { Product, ProductVariant } from "shopify-buy";

type Props = {
  product: Product;
  variant: ProductVariant | null;
};

const PaymentButton: React.FC<Props> = ({ product, variant }) => {
  const isAvailable = variant
    ? variant.available
    : product.variants[0].available;

  return (
    <>
      {isAvailable ? (
        <>
          <div className="add-btn mb-2">
            <button className="border border-gray-900 font-semibold inline-block text-gray-700 rounded-sm px-4 py-3 text-sm w-full">
              カートに追加する
            </button>
          </div>

          <div className="checkout-btn">
            <button className="bg-gray-800 border border-gray-900 inline-block rounded-sm px-4 py-3 text-white text-sm w-full">
              今すぐ購入
            </button>
          </div>
        </>
      ) : (
        <div className="sold-out border border-gray-400 font-semibold inline-block text-gray-400 rounded-sm px-4 py-3 text-center text-sm w-full">
          売り切れ
        </div>
      )}
    </>
  );
};

export default PaymentButton;
