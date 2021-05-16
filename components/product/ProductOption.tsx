import React, { useState } from "react";
import { Product, ProductVariant } from "shopify-buy";
import Swatch from "components/product/Swatch";

type Props = {
  product: Product;
  variant: ProductVariant | any;
};

type OptionValue = string;

export type SelectedValues = {
  optionName?: OptionValue
};

const ProductOption: React.FC<Props> = ({ product, variant }) => {
  
  console.log('ProductOption.tsxがレンダリングされました')
  const selectedOptions = variant ? variant.selectedOptions : product.variants[0].selectedOptions;
  console.log(selectedOptions)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      {product.options.map((option) => {
        const { name: optionName } = option;
        return (
          <div className="swatch mb-2 md:px-2" key={optionName}>
            <Swatch
              product={product}
              productOption={option}
              selectedOptions={selectedOptions}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ProductOption;
