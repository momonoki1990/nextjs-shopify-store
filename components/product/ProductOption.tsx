import React, { useState } from "react";
import { Product, ProductVariant, Option } from "shopify-buy";
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



const ProductOption: React.FC<Props> = ({ product, variant }) => {

  // オブジェクトからnameとvalueを抜き出して{name: value}として詰めていく
  const reducer = (accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.value;
    return accumulator;
  };

  // 選択されたoptionの値をstateとして持っておく
  const [selectedValues, setSelectedValues] = useState<SelectedValues>(
    variant?.selectedOptions?.reduce(reducer, {}) || {}
  );
  console.log(selectedValues)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      {product.options.map((option) => {
        const { name: optionName } = option;
        return (
          <div className="swatch mb-2 md:px-2" key={optionName}>
            <Swatch
              option={option}
              selectedValues={selectedValues}
              setSelectedValues={setSelectedValues}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ProductOption;
