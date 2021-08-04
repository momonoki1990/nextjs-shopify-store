import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgress } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import {
  Product,
  getProductsByTitle,
  GetProductsByTitleResult,
} from "lib/graphql/product/getProductsByTitle";
import Layout from "components/common/Layout";
import { SearchBox } from "components/common/SeachBox";
import { SearchItemRow, useStyles } from "components/search/SearchItemRow";

type Props = {
  queryWord: string | null;
};

const SearchPage: React.FC<Props> = ({ queryWord }) => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);

  const fetchData = async (queryWord: string, cursor: string) => {
    const numOfDisplays: number = 16;
    let result: GetProductsByTitleResult;
    try {
      result = await getProductsByTitle(queryWord, numOfDisplays, cursor);
    } catch {
      alert("商品情報の取得に失敗しました。");
      return;
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
    if (queryWord) {
      fetchData(queryWord, cursor);
    }
  }, []);

  return (
    <Layout>
      <article>
        <header className="pb-8 md:pb-14">
          <div className="container">
            <h2 className="font-semibold mb-4 text-center text-gray-700 text-xl">
              {queryWord ? `"${queryWord}"の検索結果` : "商品を検索する"}
            </h2>
            <div className="max-w-screen-sm relative mx-auto my-0 md:w-7/12 w-full">
              <SearchBox />
            </div>
          </div>
        </header>
        {queryWord && (
          <section className="container border-t pt-8 md:pt-14">
            {products ? (
              products.length > 0 ? (
                <InfiniteScroll
                  dataLength={products.length}
                  next={() => fetchData(queryWord, cursor)}
                  hasMore={hasNextPage}
                  loader={<Loader />}
                >
                  {products.map((product: Product) => (
                    <SearchItemRow product={product} key={product.id} />
                  ))}
                </InfiniteScroll>
              ) : (
                <div className="text-center">商品が見つかりませんでした。</div>
              )
            ) : (
              Array.from(new Array(6)).map((_, idx) => (
                <SkeltonLoader key={idx} />
              ))
            )}
          </section>
        )}
      </article>
    </Layout>
  );
};

export default SearchPage;

const SkeltonLoader = () => {
  return (
    <div className="flex items-center justify-center mb-5">
      <div className="flex items-center justify-center w-full">
        <div className="flex-grow-0 flex-shrink-0 mr-4 md:mr-6 w-16 md:w-24">
          <div
            className="h-0 overflow-hidden relative"
            style={{ paddingTop: "100%" }}
          >
            <Skeleton
              variant="rect"
              className="absolute h-full left-0 top-0 w-full"
            />
          </div>
        </div>
        <div className="flex-grow-1 w-full">
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </div>
      </div>
      <div className="ml-4 md:ml-6 w-1/5">
        <Skeleton variant="text" />
      </div>
    </div>
  );
};

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
  const queryWord = (context.query?.q as string) || null;

  return {
    props: {
      queryWord,
    },
  };
};
