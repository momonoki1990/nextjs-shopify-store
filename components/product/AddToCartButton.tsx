import React, { useState, useContext } from "react";
import { Product, ProductVariant } from "shopify-buy";
import { CircularProgress } from "@material-ui/core";
import useCheckout from "lib/useCheckout";
import client from "lib/client";
import { ProductContext } from "pages/products/[handle]";
import CartDrawer from "components/product/CartDrawer";

const AddToCartButton: React.FC = () => {
  const { product, variant } = useContext(ProductContext);
  const { loading, checkout, addVariant } = useCheckout();
  const [isOpen, setIsOpen] = useState(false);

  const onClickHandler = async () => {
    const quantity = 1;
    await addVariant((variant ? variant : product.variants[0]).id, quantity);
    setIsOpen(true);
  };

  return (
    <>
      {loading ? (
        <button
          className="border border-gray-400 font-semibold inline-block text-gray-700 rounded-sm px-4 py-3 text-sm w-full"
          onClick={onClickHandler}
        >
          <CircularProgress
            classes={{ svg: "font-bold text-gray-400" }}
            size="1.25rem"
            thickness={6}
          />
        </button>
      ) : (
        <button
          className="border border-gray-900 font-semibold inline-block text-gray-700 rounded-sm px-4 py-3 text-sm w-full"
          onClick={onClickHandler}
        >
          カートに追加する
        </button>
      )}
      <CartDrawer isOpen={isOpen} setIsOpen={setIsOpen} checkout={checkout} />
    </>
  );
};

export default AddToCartButton;
