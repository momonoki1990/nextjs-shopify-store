import React, { createContext } from "react";
import { CircularProgress } from "@material-ui/core";
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
  console.log("render CartPage");
  const [cartState, checkout] = useCart();
  console.log("cartState in CartPage component");
  const CartContextValue: CartContext = {
    cartState,
    checkout,
  };

  return (
    <CartContext.Provider value={CartContextValue}>
      <Layout>
        <article className="collections-all">
          <header className="mb-9 md:mb-14 text-center">
            <h1 className="font-semibold mb-2 text-gray-700 text-4xl">
              ショッピングカート
            </h1>
          </header>
          <section className="container">
            {cartState.loading ? (
              <div className="loading-icon flex items-center justify-center">
                <CircularProgress
                  classes={{ svg: "font-bold text-gray-400" }}
                  size="1.25rem"
                  thickness={6}
                />
              </div>
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
