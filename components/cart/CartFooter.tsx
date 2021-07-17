import React, { createContext } from "react";

const CartFooter: React.FC = () => {
  return (
    <div className="mt-12 text-center md:text-right">
      <div>
        <span>小計</span>
        <span className="ml-2">~~~~JPY</span>
      </div>
      <div className="mt-3">税と配送料は購入手続き時に計算されます</div>
      <div className="max-w-xs mx-auto md:mr-0">
        <a
          href=""
          className="bg-gray-700 flex-grow inline-block mt-12 px-4 py-3 text-sm text-white w-full md:w-auto"
        >
          ご購入手続きへ
        </a>
      </div>
    </div>
  );
};

export default CartFooter;
