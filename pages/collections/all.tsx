import React from "react";
import { GetServerSideProps } from "next";
import client from "lib/client";
import { Product } from "shopify-buy";
import { fetchCollectionWithProducts } from "lib/graphql/collection";
import Layout from "components/common/Layout";
import FilterToolbar from "components/collections/FilterToolbar";
import ProductList from "components/collections/ProductList";
import Pagination from "components/utils/Pagination";
import paginate from "lib/paginate";

type Props = {
  total: number;
  products: Product[];
  currentPage: number;
  totalPage: number;
};

const collectionAll: React.FC<Props> = ({
  total,
  products,
  currentPage,
  totalPage,
}) => (
  <Layout>
    <article className="collections-all">
      <header>
        <h1 className="font-semibold mb-9 md:mb-14 text-center text-gray-700 text-4xl">
          商品
        </h1>
        <FilterToolbar total={total} />
      </header>
      <section>
        <div className="container">
          <ProductList products={products} />
          <Pagination currentPage={currentPage} totalPage={totalPage} />
        </div>
      </section>
    </article>
  </Layout>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  
  // サーバーサイドでこれを実行するとIP単位のコスト計算→すぐにコスト超過してしまうと思われる。。。
  const products: Product[] = await client.product.fetchAll();
  const total = products.length;

  // ページに応じて配列を切り出す
  const perPage = 8;
  const [paginatedProducts, currentPage, totalPage] = paginate(
    context,
    products,
    perPage
  );

  return {
    props: {
      total: total,
      products: JSON.parse(JSON.stringify(paginatedProducts)),
      currentPage,
      totalPage,
    },
  };
};

export default collectionAll;
