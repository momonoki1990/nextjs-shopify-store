import React, { useEffect, useState, createContext } from "react";
import { GetServerSideProps } from "next";
import {
  getProduct,
  getProductResult,
  Product,
  Variant,
} from "lib/graphql/products";
import Layout from "components/common/Layout";
import ProductMainImage from "components/product/ProductMainImage";
import ProductImageList from "components/product/ProductImageList";
import ProductDetail from "components/product/ProductDetail";

type Props = {
  handle: string;
  variantId: string | null;
};

type ProductContext = {
  product: any;
  variant: any | null;
  setVariant: (variant: Variant) => void;
  imageId: string;
  setImageId: (imageId: string) => void;
};

export const ProductContext = createContext({} as ProductContext);

const ProductPage: React.FC<Props> = ({ handle, variantId }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [variant, setVariant] = useState<Variant | null>(null);
  const [imageId, setImageId] = useState<string>(null);

  const ProductContextValue: ProductContext = {
    product,
    variant,
    setVariant,
    imageId,
    setImageId,
  };

  const fetchData = async () => {
    const result: getProductResult = await getProduct(handle);
    const prd = result.product;

    let initialVariant: Variant;
    if (variantId) {
      initialVariant = prd.variants.find((v) => v.id === variantId);
      setVariant(initialVariant);
    }

    const initialImageId: string = (initialVariant?.image?.id ||
      prd.images[0].id) as string;

    setImageId(initialImageId);

    setProduct(prd);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ProductContext.Provider value={ProductContextValue}>
      <Layout>
        <article className="product">
          <section className="container md:grid md:grid-cols-2 md:gap-x-8">
            <div className="product__image mb-12 md:mb-0">
              <div className="main-image">
                {product ? <ProductMainImage /> : <div>hahaha</div>}
              </div>
              <div className="image-list">
                {product ? <ProductImageList /> : <div>hahaha</div>}
              </div>
            </div>
            <div className="product__detail">
              {product ? <ProductDetail /> : <div>hahaha</div>}
            </div>
          </section>
        </article>
      </Layout>
    </ProductContext.Provider>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const handle = context.params.handle as string;
  const variantId: string | null = (context.query.variant as string) || null;

  return {
    props: {
      handle,
      variantId,
    },
  };
};

export default ProductPage;
