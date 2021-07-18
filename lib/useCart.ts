import React, { useState, useEffect } from "react";
import { Cart } from "shopify-buy";
import client from "lib/client";

type Checkout = {
  addItem: (variantId: string, quantity: number) => Promise<void>;
  removeItem: (lineItemId: string) => Promise<void>;
  buyNow: (variantId: string, quantity: number) => Promise<void>;
};

const useCart = (): [Cart, Checkout] => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [checkoutId, setCheckoutId] = useState<string>("");

  /**
   * get checkout id and initialize cart object
   */
  const initializeCart = async () => {
    const id: string = localStorage.getItem("checkoutId");

    let newCart: Cart;
    let newCheckoutId: string;
    if (id) {
      newCart = await client.checkout.fetch(id);
      newCheckoutId = newCart.id as string;
    } else {
      newCart = await client.checkout.create();
      newCheckoutId = newCart.id as string;
      localStorage.setItem("checkoutId", newCheckoutId);
    }

    setCheckoutId(newCheckoutId);
    setCart(newCart);
  };

  useEffect(() => {
    initializeCart();
  }, []);

  /**
   * add item to cart
   * @param variantId
   * @param quantity
   */
  const addItem = async (variantId: string, quantity: number) => {
    const lineItemsToAdd = [{ variantId: variantId, quantity: quantity }];
    const checkout = await client.checkout.addLineItems(
      checkoutId,
      lineItemsToAdd
    );
    setCart(checkout);
  };

  /**
   * remove item from cart
   * @param lineItemId
   */
  const removeItem = async (lineItemId: string) => {
    const lineItemIdsToRemove = [lineItemId];
    const newCart: Cart = await client.checkout.removeLineItems(
      checkoutId,
      lineItemIdsToRemove
    );

    setCart(newCart);
  };

  /**
   * redirect to checkout page with selected variant
   * @param variantId
   * @param quantity
   */
  const buyNow = async (variantId: string, quantity: number) => {
    const lineItemsToAdd = [{ variantId: variantId, quantity: quantity }];
    const newCart: Cart = await client.checkout.addLineItems(
      checkoutId,
      lineItemsToAdd
    );
    location.href = newCart.webUrl;
  };

  const checkout = {
    addItem,
    removeItem,
    buyNow,
  };

  return [cart, checkout];
};

export default useCart;
