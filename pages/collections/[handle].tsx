import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { Skeleton } from "@material-ui/lab";
import InfiniteScroll from "react-infinite-scroll-component";
import client from "lib/client";
import {
  Collection,
  getCollectionWithProducts,
  GetCollectionWithProductsResult,
  Product,
  SortBy,
} from "lib/graphql/collection";
import Layout from "components/common/Layout";
import FilterToolbar from "components/collections/FilterToolbar";
import ProductList from "components/collections/ProductList";

type Props = {
  handle: string;
  sortBy: SortBy;
};

const CollectionPage: React.FC<Props> = ({ handle, sortBy }) => {
  const [collection, setCollection] = useState<Collection | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);

  const numOfDisplays: number = 16;

  const fetchMoreData = async (cursor?: string) => {
    let result: GetCollectionWithProductsResult;
    try {
      result = await getCollectionWithProducts(
        handle,
        numOfDisplays,
        sortBy,
        cursor
      );
    } catch (err) {
      alert("商品情報の取得に失敗しました。");
      return;
    }

    if (!collection) {
      setCollection(result.collection);
    }

    setProducts([...products, ...result.products]);
    setCursor(result.cursor);
    setHasNextPage(result.hasNextPage);
  };

  useEffect(() => {
    fetchMoreData();
  }, []);

  return (
    <Layout>
      <article className="collections-all">
        <header>
          <h1 className="font-semibold mb-9 md:mb-14 text-center text-gray-700 text-4xl">
            {collection && collection.title}
          </h1>
          <FilterToolbar sortBy={sortBy} />
        </header>
        <section>
          <div className="container">
            {products ? (
              <InfiniteScroll
                dataLength={products.length}
                next={() => fetchMoreData(cursor)}
                hasMore={hasNextPage}
                loader={<Loader numOfDisplays={2} />}
                // loader={<h4>Loading...</h4>}
              >
                <ProductList products={products} />
              </InfiniteScroll>
            ) : (
              <Loader numOfDisplays={8} />
            )}

            {/* <Pagination currentPage={currentPage} totalPage={totalPage} /> */}
          </div>
        </section>
      </article>
    </Layout>
  );
};

const Loader: React.FC<{ numOfDisplays: number }> = ({ numOfDisplays }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-9 py-9 md:py-14 md:py-12">
    {Array.from(new Array(numOfDisplays)).map((_, idx) => (
      <div className="skelton" key={idx}>
        <div
          className="skelton__image-container h-0 overflow-hidden relative"
          style={{ paddingTop: "100%" }}
        >
          <Skeleton
            variant="rect"
            className="absolute h-full left-0 top-0 w-full"
          />
        </div>
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="text" />
      </div>
    ))}
  </div>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const handle: string = context.params.handle as string;
  const sortBy: SortBy = (context.query?.sort_by as SortBy) || "manual";

  return {
    props: {
      handle,
      sortBy,
    },
  };
};

export default CollectionPage;
