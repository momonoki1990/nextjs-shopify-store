import React, { useCallback, useState, useEffect } from "react";
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
  const [cart, setCart] = useState<Cart | null>(null);
  const [checkoutId, setCheckoutId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

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
    setLoading(false);
  };

  useEffect(() => {
    initializeCart();
  }, []);

  /**
   * add item to cart
   * @param variantId
   * @param quantity
   */
  const addItem = useCallback(
    async (variantId: string, quantity: number) => {
      setLoading(true);
      const lineItemsToAdd = [{ variantId: variantId, quantity: quantity }];
      const newCart = await client.checkout.addLineItems(
        checkoutId,
        lineItemsToAdd
      );
      setCart(newCart);
      setLoading(false);
    },
    [checkoutId]
  );

  /**
   * remove item from cart
   * @param lineItemId
   */
  const removeItem = useCallback(
    async (lineItemId: string) => {
      setLoading(true);
      const lineItemIdsToRemove = [lineItemId];
      const newCart: Cart = await client.checkout.removeLineItems(
        checkoutId,
        lineItemIdsToRemove
      );

      setCart(newCart);
      setLoading(false);
    },
    [checkoutId]
  );

  /**
   * redirect to checkout page with selected variant
   * @param variantId
   * @param quantity
   */
  const buyNow = useCallback(
    async (variantId: string, quantity: number) => {
      const lineItemsToAdd = [{ variantId: variantId, quantity: quantity }];
      const newCart: Cart = await client.checkout.addLineItems(
        checkoutId,
        lineItemsToAdd
      );
      location.href = newCart.webUrl;
    },
    [checkoutId]
  );

  const cartState = {
    value: cart,
    loading,
  };

  const checkout = {
    addItem,
    removeItem,
    buyNow,
  };

  return [cartState, checkout];
};

export default useCart;
