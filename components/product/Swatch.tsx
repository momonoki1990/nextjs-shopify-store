import React from "react";
import { Product, ProductVariant, Option } from "shopify-buy";
import ProductOption, { SelectedValues } from "components/product/ProductOption";

type Props = {
  product: Product;
  option: Option;
  selectedValues: SelectedValues;
  setSelectedValues: (any) => void;
  setVariant: (any) => void;
};

const Swatch: React.FC<Props> = ({
  product,
  option,
  selectedValues,
  setSelectedValues,
  setVariant
}) => {
  const { name: optionName } = option;

  const onChangeHandle = (event) => {
    // selectedValuesを更新
    selectedValues[optionName] = event.target.value;
    setSelectedValues(() => {
      return { ...selectedValues };
    });

    // variantを更新(title一致find)
    const title = Object.values(selectedValues).join(" / ")
    setVariant(() => {
      const newVariant = product.variants.find(vrt => vrt.title === title)
      return newVariant;
    })
  };

  return (
    <>
      <div className="text-gray-700">{optionName}</div>
      <select
        className="bg-white border border-gray-300 rounded-sm px-4 py-3 w-full"
        onChange={onChangeHandle}
        value={selectedValues[optionName]}
      >
        {option.values.map(({ value }) => (
          <option value={value} key={value}>
            {value}
          </option>
        ))}
      </select>
    </>
  );
};

export default Swatch;
