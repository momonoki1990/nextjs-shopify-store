import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { CircularProgress } from "@material-ui/core";
import {
  Product,
  getProductsByTitle,
  GetProductsByTitleResult,
} from "lib/graphql/product/getProductsByTitle";
import Layout from "components/common/Layout";
import { SearchBox } from "components/common/SeachBox";
import { SearchItemRow } from "components/search/SearchItemRow";

type Props = {
  q: string | null;
};

const SearchPage: React.FC<Props> = ({ q }) => {
  const [loading, setLoading] = useState<boolean>(q ? true : false);
  const [products, setProducts] = useState<Product[] | null>(null);
  const numOfDisplays: number = 16;
  console.log(products);

  const fetchData = async (queryWord: string) => {
    const result: GetProductsByTitleResult = await getProductsByTitle(
      queryWord,
      numOfDisplays
    );
    setProducts(result.products);
    setLoading(false);
  };

  useEffect(() => {
    if (q) {
      fetchData(q);
    }
  }, []);

  return (
    <Layout>
      <article>
        <header className="border-b pb-8 md:pb-14">
          <div className="container">
            <h2 className="font-semibold mb-4 text-center text-gray-700 text-xl">
              〜件 - 結果 "〜〜〜"
            </h2>
            <div className="max-w-screen-sm relative mx-auto my-0 md:w-7/12 w-full">
              <SearchBox />
            </div>
          </div>
        </header>
        <section className="container pt-8 md:pt-14">
          {loading ? (
            <div className="loading-icon flex items-center justify-center">
              <CircularProgress
                classes={{ svg: "font-bold text-gray-400" }}
                size="1.25rem"
                thickness={6}
              />
            </div>
          ) : (
            products?.map((product: Product) => (
              <SearchItemRow product={product} key={product.id} />
            ))
          )}
        </section>
      </article>
    </Layout>
  );
};

export default SearchPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const q = (context.query?.q as string) || null;

  return {
    props: {
      q,
    },
  };
};
