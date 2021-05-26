import React, { useEffect, useContext } from "react";
import { Product, ProductVariant } from "shopify-buy";
import useCheckout from 'lib/useCheckout';
import client from "lib/client";
import { ProductContext } from "pages/products/[handle]";


const AddToCartButton: React.FC = () => {

  const { variant } = useContext(ProductContext);
  const { cart, addVariant } = useCheckout();

  const onClickHandler = () => {
    const quantity = 1;
    addVariant(variant.id as string, quantity);
  }

  
  console.log('AddToCartButton')
  console.log('checkoutId')
  console.log(JSON.stringify(cart));

  // console.log(JSON.stringify(checkoutID));
  return (
    <button
      className="border border-gray-900 font-semibold inline-block text-gray-700 rounded-sm px-4 py-3 text-sm w-full"
      onClick={onClickHandler}
    >
      カートに追加する
    </button>
  );
};

export default AddToCartButton;
