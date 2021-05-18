import React, { useState } from "react";
import { Product, ProductVariant } from "shopify-buy";
import Swatch from "components/product/Swatch";

type Props = {
  product: Product;
  variant: ProductVariant | any;
  setVariant: any;
  setImageId: (imageId: string) => void;
};

type OptionValue = string;

export type SelectedValues = {
  optionName?: OptionValue;
};

const ProductOption: React.FC<Props> = ({
  product,
  variant,
  setVariant,
  setImageId,
}) => {
  console.log("ProductOption.tsxがレンダリングされました");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      {product.options.map((option) => {
        const { name: optionName } = option;
        return (
          <div className="swatch mb-2 md:px-2" key={optionName}>
            <Swatch
              product={product}
              productOption={option}
              variant={variant}
              setVariant={setVariant}
              setImageId={setImageId}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ProductOption;
