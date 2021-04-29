import React from "react";
import { GetServerSideProps } from "next";
import client from "lib/client";
import { Product } from "shopify-buy";
import ProductList from "components/products/ProductList";
import Pagination from "components/utils/Pagination";
import { paginate } from "lib/utils";

type Props = {
  products: Product[];
  currentPage: number;
  totalPage: number;
};

const collectionAll: React.FC<Props> = ({
  products,
  currentPage,
  totalPage,
}) => (
  <div
    className="container"
    style={{
      margin: "0 auto",
      maxWidth: "1140px",
      padding: "0 15px",
      textAlign: "center",
    }}
  >
    <h1>商品</h1>
    <ProductList products={products} />
    <Pagination currentPage={currentPage} totalPage={totalPage} />
  </div>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const products: Product[] = await client.product.fetchAll();

  // ページに応じて配列を切り出す
  const perPage = 8;
  const [pagenatedProducts, currentPage, totalPage] = paginate(
    context,
    products,
    perPage
  );

  return {
    props: {
      products: JSON.parse(JSON.stringify(pagenatedProducts)),
      currentPage,
      totalPage,
    },
  };
};

export default collectionAll;
