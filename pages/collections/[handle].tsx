import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import Skeleton from '@material-ui/lab/Skeleton';
import client from "lib/client";
import { Product } from "shopify-buy";
import { Collection, fetchCollectionWithProducts } from "lib/graphql/collection";
import Layout from "components/common/Layout";
import FilterToolbar from "components/collections/FilterToolbar";
import ProductList from "components/collections/ProductList";
import Pagination from "components/utils/Pagination";
import paginate from "lib/paginate";

type Props = {
  handle: string;
  page: number;
};

const CollectionPage: React.FC<Props> = ({
  handle,
  page
}) => {
  const [collection, setCollection] = useState<Collection | null>(null);

  useEffect(() => {
    fetchCollectionWithProducts(handle).then((collection) => {
      setCollection(collection)
    });
  }, [])

  return (
    <Layout>
      <article className="collections-all">
        <header>
          <h1 className="font-semibold mb-9 md:mb-14 text-center text-gray-700 text-4xl">
            {collection && collection.title}
          </h1>
          {/* <FilterToolbar total={total} /> */}
        </header>
        <section>
          <div className="container">
            <ProductList products={collection ? collection.products : null} />
            {/* <Pagination currentPage={currentPage} totalPage={totalPage} /> */}
          </div>
        </section>
      </article>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {

  const handle: string = context.params.handle as string;
  const page: number = Number(context.query?.page) || 1;

  return {
    props: {
      handle,
      page
    },
  };
};

export default CollectionPage;
