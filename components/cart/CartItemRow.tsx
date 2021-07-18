import React from "react";
import Image from "next/image";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { LineItem } from "shopify-buy";
import useCart from "lib/useCart";

const useStyles = makeStyles({
  myFlex: {
    flex: "5rem 0 0",
    paddingRight: "1.5rem",
  },
  myFlex2: {
    flex: "9rem 0 0",
    paddingRight: "3rem",
  },
});

type Props = {
  item: LineItem;
};

const CartItemRow: React.FC<Props> = ({ item }) => {
  const classes = useStyles();
  const matches = useMediaQuery("(min-width:768px)");

  const [_cart, checkout] = useCart();

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
    <tr className="border-gray-200 border-b">
      <td className="p-6 pl-0 text-left w-3/6">
        <div className="flex">
          <figure className={matches ? classes.myFlex2 : classes.myFlex}>
            <a
              href={`/products/${variant.product.handle}?variant=${variant.id}`}
            >
              <Image priority src={imgSrc} height={150} width={150} />
            </a>
          </figure>
          <div>
            <div className="font-semibold text-gray-700 text-base hover:underline">
              <a
                href={`/products/${variant.product.handle}?variant=${variant.id}`}
              >
                {title}
              </a>
            </div>
            <div className="mt-3">
              {item.variant.selectedOptions.map((opt, idx) => (
                <div className="text-gray-600 text-sm" key={idx}>
                  <span>{opt.name}:</span>
                  <span>{opt.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-3">
              <button
                onClick={() => onClickHandler(item.id as string)}
                className="border-b border-gray-600 text-gray-600 text-sm"
              >
                削除
              </button>
            </div>
          </div>
        </div>
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
