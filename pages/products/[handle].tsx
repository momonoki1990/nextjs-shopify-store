import React from "react";
import { GetServerSideProps } from "next";
import { Product } from "shopify-buy";
import client from "lib/client";
import Layout from "components/common/Layout";
import ProductImage from "components/product/ProductImage";
import ProductDetail from "components/product/ProductDetail";

type Props = {
  product: Product
};

const ProductPage: React.FC<Props> = ({ product }) => {
  console.log(product);
  return (
    <Layout>
      <article className="product">
        <section className="container md:grid md:grid-cols-2 md:gap-x-8">
          <div className="product__image mb-12 md:mb-0">
            <ProductImage product={product} />
          </div>
          <div className="product__detail">
            <ProductDetail product={product} />
          </div>
        </section>
      </article>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const handle = context.params.handle as string;
  const product = await client.product.fetchByHandle(handle);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
};

export default ProductPage;
