import React from 'react'
import { GetServerSideProps } from 'next'
import client from 'lib/client'
import { Product } from "shopify-buy";
import { ProductsProps } from 'interfaces/index'
import ProductList from 'components/products/ProductList'

const collectionAll: React.FC<ProductsProps> = ({ products }) => (
  <div className="container" style={{ margin: "0 auto", maxWidth: "1140px", padding: "0 15px", textAlign: "center" }}>
    <h1>商品</h1>
    <ProductList products={products} />
  </div>
);


export const getServerSideProps: GetServerSideProps = async (context) => {
  const products: Product[] = await client.product.fetchAll();
  
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    }
  };
};


export default collectionAll