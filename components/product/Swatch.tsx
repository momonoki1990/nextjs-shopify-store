import React from "react";
import { useRouter } from "next/router";
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

  const router = useRouter();

  const onChangeHandle = (event) => {
    // selectedValuesを更新
    selectedValues[optionName] = event.target.value;
    setSelectedValues(() => {
      return { ...selectedValues };
    });

    // variantを更新(title一致find)
    const title = Object.values(selectedValues).join(" / ")
    const newVariant = product.variants.find((vrt) => vrt.title === title);
    setVariant(() => {
      return newVariant;
    })

    // query paramsを更新
    // router.push(`${router.pathname}?variant=${newVariant.id as string}`, undefined, { shallow: true });
    router.push({
      query: {　handle: router.query.handle, variant: newVariant.id },
    });
    console.log('hahah')
    console.log(newVariant.id)
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
