import React from "react";
import { Product } from "shopify-buy";
import sanitizeHtml from "sanitize-html";
import getPriceInfoFromProduct from "lib/getPriceInfoFromProduct";

type Props = {
  product: Product;
};

const ProductDetail: React.FC<Props> = ({ product }) => {
  const { title, options, descriptionHtml } = product;
  const { price } = getPriceInfoFromProduct(product);

  return (
    <>
      <div className="title mb-2">
        <h1 className="font-semibold leading-tight text-gray-800 text-4xl tracking-wide">
          {title}
        </h1>
      </div>
      <div className="price mb-7">
        <span className="font-semibold tracking-wider">
          ¥{price.toLocaleString("ja-JP")}
        </span>
      </div>
      <div className="options mb-4">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {options.map((option) => (
            <div className="options__item mb-2 px-2" key={option.name}>
              <div className="options__name text-gray-700">{option.name}</div>
              <select className="border border-gray-300 rounded-sm px-4 py-3 w-full">
                {option.values.map((value) => (
                  <option value={value.value} key={value.value}>
                    {value.value}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>

      <div className="payment-buttons px-2 mb-24">
        <div className="cart-submit mb-2">
          <button className="border border-gray-900 font-semibold inline-block text-gray-700 rounded-sm px-4 py-3 text-sm w-full">
            カートに追加する
          </button>
        </div>

        <div className="to-checkout">
          <button className="bg-gray-800 border border-gray-900 inline-block rounded-sm px-4 py-3 text-white text-sm w-full">
            今すぐ購入
          </button>
        </div>
      </div>

      <div
        className="description"
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(descriptionHtml) }}
      />
    </>
  );
};

export default ProductDetail;
