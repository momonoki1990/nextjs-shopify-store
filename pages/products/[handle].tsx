import React, { useState, createContext } from "react";
import { GetServerSideProps } from "next";
import { Product, ProductVariant } from "shopify-buy";
import client from "lib/client";
import Layout from "components/common/Layout";
import ProductImage from "components/product/ProductImage";
import ProductDetail from "components/product/ProductDetail";



type Props = {
  product: any;
  variantId: string | null;
};

type ProductContext = {
  product: any;
  variant: any | null;
  setVariant: (variant: ProductVariant) => void;
  imageId: string;
  setImageId: (imageId: string) => void;
};

export const ProductContext = createContext({} as ProductContext);



const ProductPage: React.FC<Props> = ({ product, variantId }) => {

  const [variant, setVariant] = useState<ProductVariant | null>(variantId ? product.variants.find((v) => v.id === variantId) : null)
  const [imageId, setImageId] = useState<string>(
    (variant?.image?.id || product.images[0].id) as string
  );

  const ProductContextValue: ProductContext = {
    product,
    variant,
    setVariant,
    imageId,
    setImageId,
  };

  return (
    <ProductContext.Provider value={ProductContextValue}>
      <Layout>
        <article className="product">
          <section className="container md:grid md:grid-cols-2 md:gap-x-8">
            <div className="product__image mb-12 md:mb-0">
              <ProductImage />
            </div>
            <div className="product__detail">
              <ProductDetail />
            </div>
          </section>
        </article>
      </Layout>
    </ProductContext.Provider>
  );
};



export const getServerSideProps: GetServerSideProps = async (context) => {
  const handle = context.params.handle as string;
  const product: Product = await client.product.fetchByHandle(handle);
  const variantId: string | null = context.query.variant as string || null;

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      variantId
    },
  };
};

export default ProductPage;
