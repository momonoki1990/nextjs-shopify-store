import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { Product } from "lib/graphql/collection/getCollectionWithProducts";
import ProductCard from "components/collections/ProductCard";

type Props = {
  products: Product[] | null;
};

const ProductList: React.FC<Props> = ({ products }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-9 py-9 md:py-14">
    {products.map((product, idx) => (
      <ProductCard product={product} key={idx} />
    ))}
  </div>
);

export default ProductList;
