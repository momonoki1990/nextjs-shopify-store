import React, { useContext } from "react";
import Image from "next/image";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { LineItem } from "shopify-buy";
import { CartContext } from "pages/cart";
import { QuantityInput } from "components/cart/QuantityInput";

const useStyles = makeStyles({
  myFlex: {
    flex: "0 0 5rem ",
    paddingRight: "1.5rem",
  },
  myFlex2: {
    flex: "0 0 9rem",
    paddingRight: "3rem",
  },
});

type Props = {
  item: LineItem;
};

const CartItemRow: React.FC<Props> = ({ item }) => {
  const classes = useStyles();
  const matches = useMediaQuery("(min-width:768px)");

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
    <tr className="border-gray-200 border-b">
      <td className="py-5 text-left w-4/6">
        <div className="flex">
          <figure className={matches ? classes.myFlex2 : classes.myFlex}>
            <a
              href={`/products/${variant.product.handle}?variant=${variant.id}`}
            >
              <Image priority src={imgSrc} height={150} width={150} />
            </a>
          </figure>
          <div>
            <div className="font-semibold text-gray-700 text-sm hover:underline">
              <a
                href={`/products/${variant.product.handle}?variant=${variant.id}`}
              >
                {title}
              </a>
            </div>
            <div className="mt-3">
              {item.variant.selectedOptions.map((opt, idx) => (
                <div className="text-gray-700 text-sm" key={idx}>
                  <span>{opt.name}:</span>
                  <span>{opt.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-3">
              <button
                onClick={() => onClickHandler(item.id as string)}
                className="border-b border-gray-600 text-gray-700 text-sm"
              >
                削除
              </button>
            </div>
          </div>
        </div>
      </td>
      <td className="align-top md:align-middle p-5 text-right text-gray-700 md:w-1/6 w-2/6">
        <div className="text-sm">¥{price.toLocaleString("ja-JP")}</div>
        <div className="md:hidden mt-3">
          <label className="inline-block mt-auto mb-auto mr-2 my-auto text-xs">
            数量
          </label>
          <QuantityInput id={item.id as string} quantity={quantity} />
        </div>
      </td>
      <td className="md:table-cell hidden p-5 text-gray-700 text-right w-1/6">
        <QuantityInput id={item.id as string} quantity={quantity} />
      </td>
      <td className="md:table-cell hidden p-5 pr-0 text-gray-700 text-right w-1/6">
        ¥{subtotal.toLocaleString("ja-JP")}
      </td>
    </tr>
  );
};

export default CartItemRow;
