import React, { useContext } from "react";
import Image from "next/image";
import { LineItem } from "shopify-buy";
import { CartContext } from "pages/cart";
import { QuantityInput } from "components/cart/QuantityInput";
import Link from "next/link";

type Props = {
  item: LineItem;
};

const CartItemRow: React.FC<Props> = ({ item }) => {
  const { cartState, checkout } = useContext(CartContext);

  const { handle, quantity, title, variant } = item;
  const price = Number(item.variant.price);
  const subtotal = price * quantity;
  const imgSrc = variant.image.src;

  const onClickHandler = async (variantId: string) => {
    await checkout.removeItem(variantId).catch((err) => {
      console.error(err);
      alert("削除に失敗しました");
    });
  };

  return (
    <tr className="border-b border-gray-200">
      <td className="text-left py-5 w-4/6">
        <div className="flex">
          <figure className="flex-grow-0 flex-shrink-0 pr-6 w-20 md:pr-12 md:w-36">
            <Link
              href={`/products/${variant.product.handle}?variant=${variant.id}`}
              passHref
            >
              <a>
                <Image
                  priority
                  src={imgSrc}
                  height={150}
                  width={150}
                  alt={title}
                />
              </a>
            </Link>
          </figure>
          <div>
            <div className="font-semibold text-sm text-gray-700 hover:underline">
              <Link
                href={`/products/${variant.product.handle}?variant=${variant.id}`}
                passHref
              >
                <a>{title}</a>
              </Link>
            </div>
            <div className="mt-3">
              {item.variant.selectedOptions.map((opt, idx) => (
                <div className="text-sm text-gray-700" key={idx}>
                  <span>{opt.name}:</span>
                  <span>{opt.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-3">
              <button
                onClick={() => onClickHandler(item.id as string)}
                className="border-b border-gray-600 text-sm text-gray-700"
              >
                削除
              </button>
            </div>
          </div>
        </div>
      </td>
      <td className="text-right p-5 text-gray-700 w-2/6 align-top md:w-1/6 md:align-middle">
        <div className="text-sm">¥{price.toLocaleString("ja-JP")}</div>
        <div className="mt-3 md:hidden">
          <label className="my-auto mt-auto mb-auto mr-2 text-xs inline-block">
            数量
          </label>
          <QuantityInput id={item.id as string} quantity={quantity} />
        </div>
      </td>
      <td className="text-right p-5 text-gray-700 w-1/6 hidden md:table-cell">
        <QuantityInput id={item.id as string} quantity={quantity} />
      </td>
      <td className="text-right p-5 pr-0 text-gray-700 w-1/6 hidden md:table-cell">
        ¥{subtotal.toLocaleString("ja-JP")}
      </td>
    </tr>
  );
};

export default CartItemRow;
