import React, { useContext } from "react";
import { Product, ProductVariant } from "shopify-buy";
import AddToCartButton from "components/product/AddToCartButton";
import { ProductContext } from "pages/products/[handle]";


const PaymentButton: React.FC = () => {

  const { product, variant } = useContext(ProductContext)

  const isAvailable = variant
    ? variant.available
    : product.variants[0].available;

  return (
    <>
      {isAvailable ? (
        <>
          <div className="add-btn mb-2">
            <AddToCartButton product={product} variant={variant} />
          </div>

          <div className="checkout-btn">
            <button className="bg-gray-800 border border-gray-900 inline-block rounded-sm px-4 py-3 text-white text-sm w-full">
              今すぐ購入
            </button>
          </div>
        </>
      ) : (
        <div className="sold-out border border-gray-400 inline-block text-gray-400 rounded-sm px-4 py-3 text-center text-sm w-full">
          売り切れ
        </div>
      )}
    </>
  );
};

export default PaymentButton;
