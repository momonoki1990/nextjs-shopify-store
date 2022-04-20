import React, { useContext } from "react";
import { CartContext } from "pages/cart";
import Link from "next/link";

const CartFooter: React.FC = () => {
  const { cartState } = useContext(CartContext);
  return (
    <div className="mt-12 text-center md:text-right">
      <div>
        <span>小計</span>
        <span className="ml-2">
          ¥{Number(cartState.value.subtotalPrice).toLocaleString("ja-JP")} JPY
        </span>
      </div>
      <div className="mt-3">税と配送料は購入手続き時に計算されます</div>
      <div className="mx-auto max-w-xs md:mr-0">
        <Link href={cartState.value.webUrl} passHref>
          <a className="flex-grow bg-gray-700 mt-12 text-sm text-white w-full py-3 px-4 inline-block md:w-auto">
            ご購入手続きへ
          </a>
        </Link>
      </div>
    </div>
  );
};

export default CartFooter;
