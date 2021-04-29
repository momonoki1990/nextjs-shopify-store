import React from 'react'
import { GetServerSideProps } from 'next'
import client from 'lib/client'
import { Product } from "shopify-buy";
import { ProductsProps } from 'interfaces/index'
import ProductList from 'components/products/ProductList'
import { paginate } from 'lib/utils'

const collectionAll: React.FC<ProductsProps> = ({ products }) => (
  <div className="container" style={{ margin: "0 auto", maxWidth: "1140px", padding: "0 15px", textAlign: "center" }}>
    <h1>商品</h1>
    <ProductList products={products} />
  </div>
);


export const getServerSideProps: GetServerSideProps = async (context) => {
  const products: Product[] = await client.product.fetchAll();

  // ページに応じて配列を切り出す
  const perPage = 8;
  const pagenatedProducts = paginate(context, products, perPage);
  
  return {
    props: {
      products: JSON.parse(JSON.stringify(pagenatedProducts)),
    },
  };
};


export default collectionAll