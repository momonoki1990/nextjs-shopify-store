import { gql } from "graphql-request";
import customClient from "lib/graphql/customClient";

type Image = {
  originalSrc: string;
};

export type Product = {
  handle: string;
  id: number;
  images: Image[];
  priceMin: number;
  priceMax: number;
  title: string;
};

export type GetProductsByTitleResult = {
  products: Product[];
  // cursor: string;
  // hasNextPage: boolean;
};

export const getProductsByTitle = async (
  queryWord: string,
  numOfDisplays: number
): Promise<GetProductsByTitleResult> => {
  console.log("getProductsByTitle called");
  console.log(queryWord);
  const res = await fetchProducts(queryWord, numOfDisplays);
  const result = adjustIntoResult(res);
  return result;
};

const fetchProducts = async (queryWord: string, numOfDisplays: number) => {
  const query = gql`
    query products($query: String!, $numOfDisplays: Int!) {
      products(first: $numOfDisplays, query: $query) {
        edges {
          node {
            handle
            id
            images(first: 1, sortKey: POSITION) {
              edges {
                node {
                  originalSrc
                }
              }
            }
            priceRange {
              maxVariantPrice {
                amount
              }
              minVariantPrice {
                amount
              }
            }
            title
          }
        }
      }
    }
  `;

  const variables = {
    query: `title:*${queryWord}*`,
    numOfDisplays,
  };

  const res = await customClient.request(query, variables).catch((err) => {
    throw new Error(err);
  });

  return res;
};

/**
 * Arrange as product object like Liquid object
 * @param res
 * @returns
 */
const adjustIntoResult = (res: any): GetProductsByTitleResult => {
  const products: Product[] = res.products.edges.map((edge) => {
    const { node } = edge;
    const product = {} as Product;

    product.handle = node.handle;
    product.id = node.id;
    product.images = node.images.edges.map((edge) => {
      const originalSrc = edge.node.originalSrc;
      return {
        originalSrc,
      };
    });
    product.priceMax = Math.floor(node.priceRange.maxVariantPrice.amount);
    product.priceMin = Math.floor(node.priceRange.minVariantPrice.amount);
    product.title = node.title;

    return product;
  });

  return { products };

  // const hasNextPage: boolean =
  //   res.collectionByHandle.products.pageInfo.hasNextPage;
  // const lastCursor = res.collectionByHandle.products.edges.slice(-1)[0].cursor;

  // return { collection, products, hasNextPage, cursor: lastCursor };
};
