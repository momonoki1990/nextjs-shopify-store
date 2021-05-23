import React, { useContext } from "react";
import { Product, ProductVariant } from "shopify-buy";
import Swatch from "components/product/Swatch";
import { ProductContext } from "pages/products/[handle]";

type OptionValue = string;

const ProductOption: React.FC = () => {
  console.log("ProductOption.tsxがレンダリングされました");

  const { product } = useContext(ProductContext);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      {product.options.map((option) => {
        const { name: optionName } = option;
        return (
          <div className="swatch mb-2 md:px-2" key={optionName}>
            <Swatch productOption={option} />
          </div>
        );
      })}
    </div>
  );
};

export default ProductOption;
