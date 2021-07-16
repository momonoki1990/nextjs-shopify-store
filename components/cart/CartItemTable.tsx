import React, { useContext } from "react";
import { CheckoutContext } from "pages/cart";
import CartItemRow from "components/cart/CartItemRow";

const CartItemTable = () => {
  const checkout = useContext(CheckoutContext);

  return (
    <table>
      <thead>
        <tr>
          <th>商品名</th>
          <th>価格</th>
          <th>数量</th>
          <th>合計</th>
        </tr>
      </thead>
      <tbody>
        {checkout?.lineItems?.map((item, idx) => (
          <CartItemRow item={item} key={idx} />
        ))}
      </tbody>
    </table>
  );
};

export default CartItemTable;
