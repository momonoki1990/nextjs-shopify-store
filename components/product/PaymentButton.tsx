import React, { useContext } from "react";
import { ProductContext } from "pages/products/[handle]";
import AddToCartButton from "components/product/AddToCartButton";
import CheckoutButton from "components/product/CheckoutButton"


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
            <AddToCartButton />
          </div>

          <div className="buynow-btn">
            <CheckoutButton />
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
