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
  cursor: string;
  hasNextPage: boolean;
};

/**
 * Fetch products info with query word as a format like product liquid object for search result page
 * @param queryWord
 * @param numOfDisplays
 * @param cursor
 * @returns
 */
export const getProductsByTitle = async (
  queryWord: string,
  numOfDisplays: number,
  cursor: string
): Promise<GetProductsByTitleResult> => {
  const res = await fetchProducts(queryWord, numOfDisplays, cursor);
  const result = adjustIntoResult(res);
  return result;
};

/**
 * Fetch products info with query word from shopify store front api
 * @param queryWord
 * @param numOfDisplays
 * @param cursor
 * @returns
 */
const fetchProducts = async (
  queryWord: string,
  numOfDisplays: number,
  cursor: string
) => {
  const query = gql`
    query products($numOfDisplays: Int!, $query: String!, $cursor: String) {
      products(first: $numOfDisplays, query: $query, after: $cursor) {
        edges {
          cursor
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
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
      }
    }
  `;

  const variables = {
    numOfDisplays,
    query: `title:*${queryWord}*`,
    cursor,
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

  const hasNextPage: boolean = res.products.pageInfo.hasNextPage;
  const lastCursor = res.products.edges.slice(-1)[0]?.cursor;

  return { products, hasNextPage, cursor: lastCursor };
};
