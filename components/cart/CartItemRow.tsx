import React from "react";
import Image from "next/image";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { LineItem } from "shopify-buy";

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
  item: any;
};

const CartItemRow: React.FC<Props> = ({ item }) => {
  const classes = useStyles();
  const matches = useMediaQuery("(min-width:768px)");

  const { handle, quantity, title } = item;
  const price = Number(item.variant.price);
  const subtotal = price * quantity;
  const imgSrc = item.variant.image.src;

  return (
    <tr className="border-gray-200 border-b">
      <td className="p-6 pl-0 text-left w-3/6">
        <div className="flex">
          <figure className={matches ? classes.myFlex2 : classes.myFlex}>
            <a href={`/products/${handle}`}>
              <Image priority src={imgSrc} height={150} width={150} />
            </a>
          </figure>
          <div>
            <div className="font-semibold text-gray-700 text-base">{title}</div>
            <div className="mt-3">
              {item.variant.selectedOptions.map((opt, idx) => (
                <div className="text-gray-600 text-sm" key={idx}>
                  <span>{opt.name}:</span>
                  <span>{opt.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-3">
              <button className="border-b border-gray-600 text-gray-600 text-sm">
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
