import React, { useContext } from "react";
import getPriceInfoFromProduct from "lib/getPriceInfoFromProduct";
import { ProductContext } from "pages/products/[handle]";

const ProductPrice: React.FC = () => {
  const { product, variant } = useContext(ProductContext)

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
