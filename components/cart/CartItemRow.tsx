import React from "react";
import Image from "next/image";
import { LineItem } from "shopify-buy";

type Props = {
  item: any;
};

const CartItemRow: React.FC<Props> = ({ item }) => {
  console.log("CartItemRow rendered");
  console.log(JSON.stringify(item));
  const { handle, quantity, title } = item;
  const price = Number(item.variant.price);
  const subtotal = price * quantity;
  const imgSrc = item.variant.image.src;

  return (
    <tr>
      <td>
        <figure style={{ margin: 0 }}>
          <a href={`/products/${handle}`}>
            <Image priority src={imgSrc} height={150} width={150} />
          </a>
        </figure>
        {title}
      </td>
      <td>¥{price.toLocaleString("ja-JP")}</td>
      <td>{quantity}</td>
      <td>¥{subtotal.toLocaleString("ja-JP")}</td>
    </tr>
  );
};

export default CartItemRow;
