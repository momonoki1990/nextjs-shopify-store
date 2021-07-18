import React, { useContext } from "react";
import { CheckoutContext } from "pages/cart";
import CartItemRow from "components/cart/CartItemRow";

const CartItemTable = () => {
  const cart = useContext(CheckoutContext);

  return (
    <table>
      <thead>
        <tr className="border-gray-200 border-b">
          <th className="px-6 py-8 pl-0 text-left w-3/6">商品名</th>
          <th className="px-6 py-8 text-right w-1/6">価格</th>
          <th className="md:table-cell hidden px-6 py-8 text-right w-1/6">
            数量
          </th>
          <th className="md:table-cell hidden px-6 py-8 pr-0 text-right w-1/6">
            合計
          </th>
        </tr>
      </thead>
      <tbody>
        {cart?.lineItems?.map((item, idx) => (
          <CartItemRow item={item} key={idx} />
        ))}
      </tbody>
    </table>
  );
};

export default CartItemTable;
