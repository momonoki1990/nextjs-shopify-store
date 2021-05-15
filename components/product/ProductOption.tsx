import React, { useState } from "react";
import { Product, ProductVariant } from "shopify-buy";
import Swatch from "components/product/Swatch";

type Props = {
  product: Product;
  variant: ProductVariant | any;
  setVariant: (variant: ProductVariant | null) => void;
};

type OptionValue = string;

export type SelectedValues = {
  optionName?: OptionValue
};

const changeVariant = (event) => { };



const ProductOption: React.FC<Props> = ({ product, variant, setVariant }) => {
  // オブジェクトからnameとvalueを抜き出して{name: value}として詰めていく
  const reducer = (accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.value;
    return accumulator;
  };

  // 選択されたoptionの値をstateとして持っておく
  const [selectedValues, setSelectedValues] = useState<SelectedValues>(
    variant?.selectedOptions?.reduce(reducer, {}) || {}
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      {product.options.map((option) => {
        const { name: optionName } = option;
        return (
          <div className="swatch mb-2 md:px-2" key={optionName}>
            <Swatch
              product={product}
              option={option}
              selectedValues={selectedValues}
              setSelectedValues={setSelectedValues}
              setVariant={setVariant}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ProductOption;
