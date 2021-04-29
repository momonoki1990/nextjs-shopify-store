import React from "react";
import { Product } from "shopify-buy";
import ProductCard from 'components/products/ProductCard';


type Props = {
  products: Product[]
}

const ProductList: React.FC<Props> = ({ products }) => (
  <div style={{ display: "flex", flexWrap: "wrap" }}>
    {products.map((product) => (
      <ProductCard product={product} key={product.id} />
    ))}
  </div>
);

export default ProductList;
