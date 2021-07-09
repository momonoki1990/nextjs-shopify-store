import React, { createContext } from "react";
import { GetServerSideProps } from "next";
import { Cart } from "shopify-buy";
import { CircularProgress } from "@material-ui/core";
import Layout from "components/common/Layout";
import CartItemTable from "components/cart/CartItemTable";
import useCheckout from 'lib/useCheckout';

export const CheckoutContext = createContext<Cart | null>(null);

const CartPage: React.FC = () => {

  const { checkout } = useCheckout();

  return (
    <CheckoutContext.Provider value={checkout}>
      <Layout>
        <article className="collections-all">
          <header>
            <h1 className="font-semibold mb-9 md:mb-14 text-center text-gray-700 text-4xl">
              ショッピングカート
            </h1>
          </header>
          <section>
            <div className="container">
              {checkout ? (
                checkout.lineItems.length > 0 ? (
                  <CartItemTable />
                ) : (
                  <>
                    <div>カート内に商品がありません</div>
                    <div>
                      <a
                        className="bg-gray-700 flex-grow inline-block px-4 py-3 text-sm text-white"
                        href="/collections/all"
                      >
                        買い物を続ける
                      </a>
                    </div>
                  </>
                )
              ) : (
                <div className="flex items-center justify-center">
                  <CircularProgress
                    classes={{ svg: "font-bold text-gray-400" }}
                    size="1.25rem"
                    thickness={6}
                  />
                </div>
              )}
              {}
            </div>
          </section>
        </article>
      </Layout>
    </CheckoutContext.Provider>
  );
};

export default CartPage;
