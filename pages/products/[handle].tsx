import React, { useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { Product, ProductVariant } from "shopify-buy";
import client from "lib/client";
import Layout from "components/common/Layout";
import ProductImage from "components/product/ProductImage";
import ProductDetail from "components/product/ProductDetail";

type Props = {
  product: Product;
  variant: ProductVariant | null;
};

const ProductPage: React.FC<Props> = ({ product }) => {
  console.log('[handle].tsxがレンダリングされました')
  console.log('product');
  console.log(product);

  // query paramsのvariantを元にvariantオブジェクトを取得
  const router = useRouter();
  const variantId = router.query.variant;
  const variant: ProductVariant | null =
    variantId ? product.variants.find((v) => v.id === variantId) : null;
  console.log('variant')
  console.log(variant);

  return (
    <Layout>
      <article className="product">
        <section className="container md:grid md:grid-cols-2 md:gap-x-8">
          <div className="product__image mb-12 md:mb-0">
            <ProductImage product={product} variant={variant} />
          </div>
          <div className="product__detail">
            <ProductDetail
              product={product}
              variant={variant}
            />
          </div>
        </section>
      </article>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const handle = context.params.handle as string;
  const product: Product = await client.product.fetchByHandle(handle);
  const variantId = context.query?.variant;
  
  console.log('getServersidePropsが走りました。')
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
};

export default ProductPage;
