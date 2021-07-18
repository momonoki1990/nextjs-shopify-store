import React, { useState, useEffect } from "react";
import { Cart } from "shopify-buy";
import client from "lib/client";

// type SetCart = {
//   initializeCart;
//   addVariant;
//   changeQuantity;
//   deleteVariant;
// };

const useCheckout = () => {
  const [checkout, setCheckout] = useState<Cart | null>(null);
  const [checkoutId, setCheckoutId] = useState<string>("");

  const initializeCart = () => {
    const id: string | null = localStorage.getItem("checkoutId") || null;

    if (id) {
      client.checkout.fetch(id).then((checkout) => {
        setCheckoutId(checkout.id as string);
        setCheckout(checkout);
      });
    } else {
      client.checkout.create().then((checkout) => {
        localStorage.setItem("checkoutId", checkout.id as string);
        setCheckoutId(checkout.id as string);
        setCheckout(checkout);
      });
    }
  };

  useEffect(() => {
    initializeCart();
  }, []);

  const addVariant = async (variantId: string, quantity: number) => {
    const lineItemsToAdd = [{ variantId: variantId, quantity: quantity }];
    const checkout = await client.checkout.addLineItems(
      checkoutId,
      lineItemsToAdd
    );
    setCheckout(checkout);
  };

  const buyNow = async (variantId: string, quantity: number) => {
    const lineItemsToAdd = [{ variantId: variantId, quantity: quantity }];
    const checkout = (await client.checkout.addLineItems(
      checkoutId,
      lineItemsToAdd
    )) as any;
    location.href = checkout.webUrl;
  };

  const removeItem = async (lineItemId: string) => {
    const lineItemIdsToRemove = [lineItemId];

    const newCheckout = await client.checkout.removeLineItems(
      checkoutId,
      lineItemIdsToRemove
    );

    setCheckout(newCheckout);
  };

  return {
    checkout,
    addVariant,
    buyNow,
    removeItem,
  };
};

export default useCheckout;
