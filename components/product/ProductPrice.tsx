import React from "react";
import { Product, ProductVariant } from "shopify-buy";
import getPriceInfoFromProduct from "lib/getPriceInfoFromProduct";

type Props = {
  product: Product;
  variant: ProductVariant | null;
};

const ProductPrice: React.FC<Props> = ({ product, variant }) => {
  const price = variant ? variant.price : getPriceInfoFromProduct(product).price.toLocaleString("ja-JP");
  const isAvailable = variant
    ? variant.available
    : product.variants[0].available;

  return (
    <div className="flex items-center">
      <span className="price font-semibold text-lg tracking-wider">
        ¥{price}
      </span>
      {isAvailable || (
        <span className="soldout border border-gray-800 ml-6 px-2 py-1 rounded-sm text-xs">
          売り切れ
        </span>
      )}
    </div>
  );
};

export default ProductPrice;
