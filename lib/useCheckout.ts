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
  console.log('useCheckout')
  const [loading, setLoading] = useState<boolean>(false);
  const [checkout, setCheckout] = useState({});
  const [checkoutId, setCheckoutId] = useState<string>("");


  const initializeCart = () => {
    console.log('initializeCart')

    const id: string | null = localStorage.getItem("checkoutId") || null;
    if (id) {
      client.checkout.fetch(id).then((checkout) => {
        setCheckoutId(checkout.id as string);
      });
    } else {
      client.checkout.create().then((checkout) => {
        localStorage.setItem("checkoutId", checkout.id as string);
        setCheckoutId(checkout.id as string);
      });
    }
  };

  useEffect(() => {
    console.log('useCheckout内のuseEffect')
    initializeCart();
  }, []);

  const addVariant = async (variantId: string, quantity: number) => {
    console.log('addVariant関数の中')
    setLoading(true);
    const lineItemsToAdd = [{ variantId: variantId, quantity: quantity }];
    const checkout = await client.checkout.addLineItems(checkoutId, lineItemsToAdd)
    console.log("addVariant関数の中でのaddLineItemsのあと");
    setCheckout(checkout);
    console.log("addVariant関数の中でのsetCheckoutのあと");
    setLoading(false)
  }

  return {checkout: checkout, loading:loading, addVariant: addVariant};
};

export default useCheckout;
