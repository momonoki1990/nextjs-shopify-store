import React, { useContext } from "react";
import { CheckoutContext } from "pages/cart";
import CartItemRow from "components/cart/CartItemRow";

const CartItemTable = () => {
  console.log("CartItemTable rendered");

  const checkout = useContext(CheckoutContext);
  console.log(checkout?.lineItems?.length);

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
