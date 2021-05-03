import React from "react";
import { GetServerSideProps } from "next";
import client from "lib/client";
import { Product } from "shopify-buy";
import Layout from "components/common/Layout";
import CollectionTitle from "components/collections/CollectionTitle"
import FilterToolbar from "components/collections/FilterToolbar";
import ProductList from "components/products/ProductList";
import Pagination from "components/utils/Pagination";
import { paginate } from "lib/utils";

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
        <CollectionTitle title="商品"/>
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
  const products: Product[] = await client.product.fetchAll();
  const total = products.length;

  // ページに応じて配列を切り出す
  const perPage = 8;
  const [pagenatedProducts, currentPage, totalPage] = paginate(
    context,
    products,
    perPage
  );

  return {
    props: {
      total: total,
      products: JSON.parse(JSON.stringify(pagenatedProducts)),
      currentPage,
      totalPage,
    },
  };
};

export default collectionAll;
