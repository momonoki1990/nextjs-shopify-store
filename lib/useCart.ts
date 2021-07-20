import React, { useState, useEffect } from "react";
import { Cart } from "shopify-buy";
import client from "lib/client";

export type CartState = {
  value: Cart;
  loading: boolean;
};

export type Checkout = {
  addItem: (variantId: string, quantity: number) => Promise<void>;
  removeItem: (lineItemId: string) => Promise<void>;
  buyNow: (variantId: string, quantity: number) => Promise<void>;
};

const useCart = (): [CartState, Checkout] => {
  console.log("useCart called");
  const [cart, setCart] = useState<Cart | null>(null);
  const [checkoutId, setCheckoutId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  console.log("cart.lineItems.length", cart?.lineItems.length);
  console.log("loading", loading);

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
    console.log("setCheckoutId will be called");
    setCheckoutId(newCheckoutId);
    console.log("setCheckoutId called");
    setCart(newCart);
    console.log("setCart called");
    setLoading(false);
    console.log("setLoading called");
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
    setLoading(true);
    const lineItemsToAdd = [{ variantId: variantId, quantity: quantity }];
    const newCart = await client.checkout.addLineItems(
      checkoutId,
      lineItemsToAdd
    );
    setCart(newCart);
    setLoading(false);
  };

  /**
   * remove item from cart
   * @param lineItemId
   */
  const removeItem = async (lineItemId: string) => {
    setLoading(true);
    const lineItemIdsToRemove = [lineItemId];
    const newCart: Cart = await client.checkout.removeLineItems(
      checkoutId,
      lineItemIdsToRemove
    );

    setCart(newCart);
    setLoading(false);
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

  const cartState = {
    value: cart,
    loading,
  };

  const checkout = {
    addItem,
    removeItem,
    buyNow,
  };

  console.log("return in useCart");
  console.log(cartState);
  return [cartState, checkout];
};

export default useCart;
