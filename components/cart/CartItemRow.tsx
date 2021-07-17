import React from "react";
import Image from "next/image";
import { LineItem } from "shopify-buy";

type Props = {
  item: any;
};

const CartItemRow: React.FC<Props> = ({ item }) => {
  const { handle, quantity, title } = item;
  const price = Number(item.variant.price);
  const subtotal = price * quantity;
  const imgSrc = item.variant.image.src;

  return (
    <tr className="border-gray-200 border-b">
      <td className="p-6 pl-0 text-left w-3/6">
        <figure style={{ margin: 0 }}>
          <a href={`/products/${handle}`}>
            <Image priority src={imgSrc} height={150} width={150} />
          </a>
        </figure>
        {title}
      </td>
      <td className="p-6 text-right w-1/6">
        <div>¥{price.toLocaleString("ja-JP")}</div>
        <div className="md:hidden block mt-2">数量 {quantity}</div>
      </td>
      <td className="md:table-cell hidden p-6 text-right w-1/6">{quantity}</td>
      <td className="md:table-cell hidden p-6 pr-0 text-right w-1/6">
        ¥{subtotal.toLocaleString("ja-JP")}
      </td>
    </tr>
  );
};

export default CartItemRow;
