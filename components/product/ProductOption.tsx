import React from "react";
import { Product, ProductVariant, Option } from "shopify-buy";

type Props = {
  product: Product;
  variant: ProductVariant | any;
  setVariant: (variant: ProductVariant | null) => void;
  options: Option[];
};

const changeVariant = (event: React.KeyboardEvent | React.MouseEvent) => {
  
};

const ProductOption: React.FC<Props> = ({ variant, options }) => {
  const selectedOptions: any[] = variant?.selectedOptions;
  console.log(selectedOptions);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      {options.map(({ name, values }) => {
        const selectedValue: string = selectedOptions?.find(
          (opt) => opt.name === name
        )?.value;

        return (
          <div className="mb-2 md:px-2" key={name}>
            <div className="text-gray-700">{name}</div>
            <select
              className="border border-gray-300 rounded-sm px-4 py-3 w-full"
              defaultValue={selectedValue && selectedValue}
            >
              {values.map(({ value }) => (
                <option value={value} key={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        );
      })}
    </div>
  );
};

export default ProductOption;
