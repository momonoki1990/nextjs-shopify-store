import React, { createContext } from "react";
import { Skeleton } from "@material-ui/lab";
import useCart, { CartState, Checkout } from "lib/useCart";
import Layout from "components/common/Layout";
import CartItemTable from "components/cart/CartItemTable";
import CartFooter from "components/cart/CartFooter";
import Link from "next/link";

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
          <header className="text-center mb-9 md:mb-14">
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
                      <Link href="/collections/all" passHref>
                        <a className="border-b border-gray-600 text-gray-600">
                          買い物を続ける
                        </a>
                      </Link>
                    </div>
                    <CartItemTable />
                    <CartFooter />
                  </>
                ) : (
                  <>
                    <div className="mb-4">カート内に商品がありません</div>
                    <div className="continue-btn">
                      <Link href="/collections/all" passHref >
                        <a className="flex-grow bg-gray-700 text-sm text-white py-3 px-4 inline-block">
                          買い物を続ける
                        </a>
                      </Link>
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
  <div className="flex mb-5 justify-center">
    <div className="flex w-full justify-center items-start">
      <div className="flex-grow-0 flex-shrink-0 mr-4 w-16 md:mr-6 md:w-24">
        <div
          className="h-0 overflow-hidden relative"
          style={{ paddingTop: "100%" }}
        >
          <Skeleton
            variant="rect"
            className="h-full w-full top-0 left-0 absolute"
          />
        </div>
      </div>
      <div className="flex-grow-1 w-full">
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="text" />
      </div>
    </div>
    <div className="px-2 w-2/6 md:w-1/6">
      <Skeleton variant="text" />
      <Skeleton variant="text" className="md:hidden" />
    </div>
    <div className="px-2 w-1/6 hidden md:block">
      <Skeleton variant="text" />
    </div>
    <div className="px-2 w-1/6 hidden md:block">
      <Skeleton variant="text" />
    </div>
  </div>
);
