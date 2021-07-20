import React, { useContext } from "react";
import useCart from "lib/useCart";
import { ProductContext } from "pages/products/[handle]";
import AddToCartButton from "components/product/AddToCartButton";
import BuyNowButton from "components/product/BuyNowButton";

const PaymentButton: React.FC = () => {
  const { product, variant } = useContext(ProductContext);
  const [cartState, checkout] = useCart();

  const isAvailable = variant
    ? variant.availableForSale
    : product.variants[0].availableForSale;

  return (
    <>
      {isAvailable ? (
        <>
          <div className="add-btn mb-2">
            <AddToCartButton cartState={cartState} checkout={checkout} />
          </div>

          <div className="buynow-btn">
            <BuyNowButton checkout={checkout} />
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
