import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { Skeleton } from "@material-ui/lab";
import { CircularProgress } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Collection,
  getCollectionWithProducts,
  GetCollectionWithProductsResult,
  Product,
  SortBy,
} from "lib/graphql/collection/getCollectionWithProducts";
import Layout from "components/common/Layout";
import FilterToolbar from "components/collections/FilterToolbar";
import ProductList from "components/collections/ProductList";

type Props = {
  handle: string;
  sortBy: SortBy;
};

const CollectionPage: React.FC<Props> = ({ handle, sortBy }) => {
  const [collection, setCollection] = useState<Collection | null>(null);
  const [products, setProducts] = useState<Product[] | null>(null);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);

  const numOfDisplays: number = 16;

  const fetchData = async (cursor?: string) => {
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

    if (products) {
      setProducts([...products, ...result.products]);
    } else {
      setProducts([...result.products]);
    }

    setCursor(result.cursor);
    setHasNextPage(result.hasNextPage);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout>
      <article className="collection">
        <header>
          <h1 className="font-semibold text-center mb-9 text-gray-700 text-3xl md:mb-14 md:text-4xl">
            {collection && collection.title}
          </h1>
          <FilterToolbar sortBy={sortBy} />
        </header>
        <section>
          <div className="container">
            {products ? (
              <InfiniteScroll
                dataLength={products.length}
                next={() => fetchData(cursor)}
                hasMore={hasNextPage}
                loader={<Loader />}
              >
                <ProductList products={products} />
              </InfiniteScroll>
            ) : (
              <SkeltonLoader numOfDisplays={8} />
            )}
          </div>
        </section>
      </article>
    </Layout>
  );
};

const SkeltonLoader: React.FC<{ numOfDisplays: number }> = ({
  numOfDisplays,
}) => (
  <div className="grid py-9 gap-x-6 gap-y-9 grid-cols-2 md:py-14 md:grid-cols-4">
    {Array.from(new Array(numOfDisplays)).map((_, idx) => (
      <div className="skelton" key={idx}>
        <div
          className="h-0 skelton__image-container overflow-hidden relative"
          style={{ paddingTop: "100%" }}
        >
          <Skeleton
            variant="rect"
            className="h-full w-full top-0 left-0 absolute"
          />
        </div>
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="text" />
      </div>
    ))}
  </div>
);

const Loader = () => (
  <div className="text-center">
    <CircularProgress
      classes={{ svg: "font-bold text-gray-400" }}
      size="1.25rem"
      thickness={6}
    />
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
