import React from "react";
import { Product, ProductVariant } from "shopify-buy";
import sanitizeHtml from "sanitize-html";
import getPriceInfoFromProduct from "lib/getPriceInfoFromProduct";
import ProductOption from "components/product/ProductOption"

type Props = {
  product: Product;
  variant: ProductVariant | null;
  setVariant: (variant: ProductVariant | null) => void;
};

const ProductDetail: React.FC<Props> = ({ product, variant, setVariant }) => {
  const { title, options, descriptionHtml } = product;
  const { price } = getPriceInfoFromProduct(product);

  return (
    <>
      <div className="title mb-2">
        <h1 className="font-bold md:font-semibold md:leading-tight text-gray-800 md:text-4xl text-3xl tracking-wide">
          {title}
        </h1>
      </div>
      <div className="price mb-7">
        <span className="font-semibold tracking-wider">
          ¥{price.toLocaleString("ja-JP")}
        </span>
      </div>
      <div className="options mb-4">
        <ProductOption
          product={product}
          variant={variant}
          setVariant={setVariant}
          options={options}
        />
      </div>

      <div className="payment-buttons md:px-2 mb-24">
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
