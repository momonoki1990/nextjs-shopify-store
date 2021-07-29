import React, { useContext } from "react";
import { ProductContext } from "pages/products/[handle]";

const ProductPrice: React.FC = () => {
  const { product, variant } = useContext(ProductContext);

  const price = variant
    ? variant.price
    : product.variants[0].price.toLocaleString("ja-JP");
  const isAvailable = variant
    ? variant.availableForSale
    : product.variants[0].availableForSale;

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
