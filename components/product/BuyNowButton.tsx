import React, { useContext } from "react";
import { Checkout } from "lib/useCart";
import { ProductContext } from "pages/products/[handle]";

type Props = {
  checkout: Checkout;
};

const CheckoutButton: React.FC<Props> = ({ checkout }) => {
  const { product, variant } = useContext(ProductContext);

  const onClickHandler = async () => {
    const quantity = 1;
    await checkout.buyNow(
      (variant ? variant : product.variants[0]).id,
      quantity
    );
  };

  return (
    <button
      className="bg-gray-800 border border-gray-900 inline-block rounded-sm px-4 py-3 text-white text-sm w-full"
      onClick={onClickHandler}
    >
      今すぐ購入
    </button>
  );
};

export default CheckoutButton;
