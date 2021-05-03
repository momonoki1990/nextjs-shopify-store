import React from "react";
import { Product } from "shopify-buy";
import ProductCard from 'components/products/ProductCard';


type Props = {
  products: Product[]
}

const ProductList: React.FC<Props> = ({ products }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 py-14 md:py-12">
    {products.map((product) => (
      <ProductCard product={product} key={product.id} />
    ))}
  </div>
);

export default ProductList;
