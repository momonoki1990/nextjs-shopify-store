import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Product, ProductVariant, Option } from "shopify-buy";
import ProductOption, { SelectedValues } from "components/product/ProductOption";

type Props = {
  product: Product;
  productOption: Option;
  selectedOptions: any[];
};

const Swatch: React.FC<Props> = ({
  product,
  productOption,
  selectedOptions,
}) => {
  console.log("Swatch.tsxがレンダリングされました");

  const { name: optionName } = productOption;

  const currentValue = selectedOptions.find(opt => opt.name === optionName).value;

  const router = useRouter();

  const changeVariant = (event) => {

    // 新しく選択されたvalueと既存のvaluekからtitleを生成し、一致するvariantを取得
    const reducer = (accumulator, currentValue) => {
      accumulator.push(
        currentValue.name === optionName
          ? event.target.value
          : currentValue.value
      );
      return accumulator;
    };
    const title: string = selectedOptions.reduce(reducer, []).join(" / ");
    const newVariant = product.variants.find((vrt) => vrt.title === title);

    // query paramのvariantを更新
    router.push(
      {
        query: { handle: router.query.handle, variant: newVariant.id },
      },
      undefined,
      { shallow: true }
    );
    console.log(newVariant.id);
  };

  return (
    <>
      <div className="text-gray-700">{optionName}</div>
      <select
        className="bg-white border border-gray-300 rounded-sm px-4 py-3 w-full"
        onChange={changeVariant}
        value={currentValue}
      >
        {productOption.values.map(({ value }) => (
          <option value={value} key={value}>
            {value}
          </option>
        ))}
      </select>
    </>
  );
};

export default Swatch;
