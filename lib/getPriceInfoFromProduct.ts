import { Product } from "shopify-buy";

// variantsから価格に関する情報を取得する
const getPriceInfoFromProduct = (product: Product) => {
  const { variants } = product;

  // variantsを昇順で並び替え
  variants.sort((a, b) => {
    const [priceA, priceB]: number[] = [a.price, b.price].map((str) =>
      Number(str)
    );
    if (priceA > priceB) return 1;
    if (priceA < priceB) return -1;
    return 0;
  });

  // 一番低い価格・価格に差異があるかを取得
  const price: number = Number(variants[0].price);
  const priceVaries: boolean =
    variants[0].price !== variants[variants.length - 1].price;

  return [price, priceVaries];
};

export default getPriceInfoFromProduct;
