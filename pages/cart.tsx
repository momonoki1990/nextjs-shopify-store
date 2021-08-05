import React, { createContext } from "react";
import { Skeleton } from "@material-ui/lab";
import useCart, { CartState, Checkout } from "lib/useCart";
import Layout from "components/common/Layout";
import CartItemTable from "components/cart/CartItemTable";
import CartFooter from "components/cart/CartFooter";

type CartContext = {
  cartState: CartState;
  checkout: Checkout;
};

export const CartContext = createContext<CartContext>({} as CartContext);

const CartPage: React.FC = () => {
  const [cartState, checkout] = useCart();
  const CartContextValue: CartContext = {
    cartState,
    checkout,
  };

  return (
    <CartContext.Provider value={CartContextValue}>
      <Layout>
        <article className="collections-all">
          <header className="mb-9 md:mb-14 text-center">
            <h1 className="font-semibold mb-2 text-gray-700 text-3xl md:text-4xl">
              ショッピングカート
            </h1>
          </header>
          <section className="container">
            {cartState.loading ? (
              Array.from(new Array(3)).map((_, idx) => (
                <SleltonLoader key={idx} />
              ))
            ) : (
              <div className="text-center">
                {cartState.value.lineItems.length > 0 ? (
                  <>
                    <div className="continue-link">
                      <a
                        href="/collections/all"
                        className="border-b border-gray-600 text-gray-600"
                      >
                        買い物を続ける
                      </a>
                    </div>
                    <CartItemTable />
                    <CartFooter />
                  </>
                ) : (
                  <>
                    <div className="mb-4">カート内に商品がありません</div>
                    <div className="continue-btn">
                      <a
                        className="bg-gray-700 flex-grow inline-block px-4 py-3 text-sm text-white"
                        href="/collections/all"
                      >
                        買い物を続ける
                      </a>
                    </div>
                  </>
                )}
              </div>
            )}
          </section>
        </article>
      </Layout>
    </CartContext.Provider>
  );
};

export default CartPage;

const SleltonLoader = () => (
  <div className="flex justify-center mb-5">
    <div className="flex justify-center w-full items-start">
      <div className="flex-grow-0 flex-shrink-0 mr-4 md:mr-6 w-16 md:w-24">
        <div
          className="h-0 overflow-hidden relative"
          style={{ paddingTop: "100%" }}
        >
          <Skeleton
            variant="rect"
            className="absolute h-full left-0 top-0 w-full"
          />
        </div>
      </div>
      <div className="flex-grow-1 w-full">
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="text" />
      </div>
    </div>
    <div className="px-2 md:w-1/6 w-2/6">
      <Skeleton variant="text" />
      <Skeleton variant="text" className="md:hidden" />
    </div>
    <div className="hidden px-2 md:block w-1/6">
      <Skeleton variant="text" />
    </div>
    <div className="hidden px-2 md:block w-1/6">
      <Skeleton variant="text" />
    </div>
  </div>
);
