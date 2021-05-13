import React from "react";
import { Option } from "shopify-buy";

type Props = {
  options: Option[]
};

const ProductOption:React.FC<Props> = ({options}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      {options.map((option) => (
        <div className="mb-2 md:px-2" key={option.name}>
          <div className="text-gray-700">{option.name}</div>
          <select className="border border-gray-300 rounded-sm px-4 py-3 w-full">
            {option.values.map((value) => (
              <option value={value.value} key={value.value}>
                {value.value}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}

export default ProductOption;