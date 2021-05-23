import React from "react";
import { Product, ProductVariant } from "shopify-buy";
import client from "lib/client";

type Props = {
  product: Product;
  variant: ProductVariant | null;
};

const AddToCartButton: React.FC<Props> = ({ product, variant }) => {
  const addToCart = () => {
    client.checkout
      .create()
      .then((checkout) => {
        console.log(JSON.stringify(checkout.id));
        const lineItemsToAdd = [{
          variantId: variant.id,
          quantity: 1
        }]
        client.checkout.addLineItems(checkout.id, lineItemsToAdd).then((checkout) => {
          console.log(JSON.stringify(checkout.lineItems))
        })
      })
      .catch((err) => {
        console.error(JSON.stringify(err));
      });
  };

  return (
    <button
      className="border border-gray-900 font-semibold inline-block text-gray-700 rounded-sm px-4 py-3 text-sm w-full"
      onClick={addToCart}
    >
      カートに追加する
    </button>
  );
};

export default AddToCartButton;
