import React from "react";
import { Product } from "lib/graphql/product/getProductsByTitle";

type Props = {
  product: Product;
};

export const SearchItemRow: React.FC<Props> = () => {
  return <div>SearchItemRow</div>;
};
