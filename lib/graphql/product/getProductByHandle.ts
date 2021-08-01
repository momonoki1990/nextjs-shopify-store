import { gql } from "graphql-request";
import customClient from "lib/graphql/customClient";

export type Image = {
  id: string;
  src: string;
};

export type ProductOption = {
  name: string;
  values: string[];
};

export type SelectedOption = {
  name: string;
  value: string;
};

export type Variant = {
  availableForSale: boolean;
  id: string;
  image: Image;
  price: number;
  title: string;
  selectedOptions: SelectedOption[];
};

export type Product = {
  descriptionHtml: string;
  title: string;
  images: Image[];
  options: ProductOption[];
  variants: Variant[];
};

export type getProductResult = {
  product: Product;
};

export const getProductByHandle = async (handle: string) => {
  const res = await fetchProduct(handle);
  const result: getProductResult = adjustIntoResult(res);
  return result;
};

const fetchProduct = async (handle: string) => {
  const query = gql`
    query productByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        descriptionHtml
        title
        images(first: 250) {
          edges {
            node {
              id
              originalSrc
            }
          }
        }
        options {
          name
          values
        }
        variants(first: 250) {
          edges {
            node {
              availableForSale
              id
              price
              image {
                id
                originalSrc
              }
              selectedOptions {
                name
                value
              }
              title
            }
          }
        }
      }
    }
  `;

  const variables = {
    handle: handle,
  };

  const res = await customClient.request(query, variables).catch((err) => {
    throw new Error(err);
  });

  return res;
};

const adjustIntoResult = (res: any): getProductResult => {
  const { descriptionHtml, title, options } = res.productByHandle;

  const images = res.productByHandle.images.edges.map((edge) => {
    const image = edge.node;
    return {
      id: image.id,
      src: image.originalSrc,
    };
  });
  const variants: Variant[] = res.productByHandle.variants.edges.map(
    (edge) => edge.node
  );
  const product: Product = {
    descriptionHtml,
    title,
    images,
    options,
    variants,
  };
  const result = {
    product,
  };
  return result;
};
