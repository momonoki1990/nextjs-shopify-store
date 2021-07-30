import React, { useContext } from "react";
import { useRouter } from "next/router";
import { ProductOption } from "lib/graphql/products";
import { ProductContext } from "pages/products/[handle]";

type Props = {
  productOption: ProductOption;
};

const Swatch: React.FC<Props> = ({ productOption }) => {
  const { product, variant, setVariant, setImageId } =
    useContext(ProductContext);

  const { name: optionName } = productOption;

  const selectedOptions = variant
    ? variant.selectedOptions
    : product.variants[0].selectedOptions;

  const currentValue = selectedOptions.find(
    (opt) => opt.name === optionName
  ).value;

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

    // variantを更新
    setVariant(newVariant);

    // imageIdを更新
    newVariant?.image?.id && setImageId(newVariant.image.id as string);

    // query paramを更新
    router.replace(
      {
        query: { handle: router.query.handle, variant: newVariant.id },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <>
      <div className="text-gray-700">{optionName}</div>
      <select
        className="bg-white border border-gray-300 cursor-pointer rounded-sm px-4 py-3 w-full"
        onChange={changeVariant}
        value={currentValue}
      >
        {productOption.values.map((value, idx) => (
          <option value={value} key={idx}>
            {value}
          </option>
        ))}
      </select>
    </>
  );
};

export default Swatch;
