import { useState, useEffect } from "react";
import { Cart } from "shopify-buy";
import client from "lib/client";

// type SetCart = {
//   initializeCart;
//   addVariant;
//   changeQuantity;
//   deleteVariant;
// };

const useCheckout = () => {
  const [cart, setCart] = useState({});
  const [checkoutId, setCheckoutId] = useState("");

  const initializeCart = () => {
    const id: string | null = localStorage.getItem("checkoutId") || null;
    if (id) {
      client.checkout.fetch(id).then((checkout) => {
        setCheckoutId(checkout.id as string);
        console.log(JSON.stringify(checkout))
      });
    } else {
      client.checkout.create().then((checkout) => {
        localStorage.setItem("checkoutId", checkout.id as string);
        setCheckoutId(checkout.id as string);
      });
    }
  };

  useEffect(() => {
    initializeCart();
  }, []);

  const addVariant = (variantId: string, quantity: number): void => {
    const lineItemsToAdd = [{ variantId: variantId, quantity: quantity }];
    client.checkout.addLineItems(checkoutId, lineItemsToAdd).then(checkout => {
      console.log('商品が追加されました')
      setCart(checkout)
      console.log('addVariantの結果セットされたcart state')
      console.log(JSON.stringify(cart))
    })
  }

  return {cart: cart, addVariant: addVariant};
};

export default useCheckout;
