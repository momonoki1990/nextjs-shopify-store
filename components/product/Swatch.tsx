import React from "react";
import { Option } from "shopify-buy";
import {SelectedValues} from 'components/product/ProductOption'

type Props = {
  option: Option;
  selectedValues: SelectedValues;
  // setSelectedValues: (selectedValues: SelectedValues) => void;
  setSelectedValues: any;
};

const Swatch: React.FC<Props> = ({ option, selectedValues, setSelectedValues }) => {
  const { name: optionName } = option;

  const onChangeHandle = (event) => {
    setSelectedValues((prev) => {
      prev[optionName] = event.target.value;
      return { ...prev };
    });
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
