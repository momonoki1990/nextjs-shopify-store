import { gql } from "graphql-request";
import customClient from "lib/graphql/customClient";
import CollectionPage from "pages/collections/[handle]";

// ProductCollectionSortKeys(https://shopify.dev/api/storefront/reference/products/productcollectionsortkeys)
export type SortBy =
  | "manual"
  | "best-selling"
  | "title-ascending"
  | "title-descending"
  | "price-ascending"
  | "price-descending"
  | "created-ascending"
  | "created-descending";

type Image = {
  src: string;
};

export type Product = {
  handle: string;
  images: Image;
  priceMin: number;
  priceMax: number;
  title: string;
};

export type Collection = {
  title: string;
};

export type GetCollectionWithProductsResult = {
  collection: Collection;
  products: Product[];
  cursor: string;
  hasNextPage: boolean;
};

/**
 * Fetch collection info with products info for collection page
 * @param handle collection handle
 */
export const getCollectionWithProducts = async (
  handle: string,
  numOfDisplays: number,
  sortBy: SortBy,
  cursor: string | null
): Promise<GetCollectionWithProductsResult> => {
  console.log("getCollectionWithProducts");
  const { sortKey, reverse } = generateSortParams(sortBy);
  const res = await fetchCollection(
    handle,
    numOfDisplays,
    sortKey,
    reverse,
    cursor
  );
  return adjustIntoResult(res);
};

/**
 * fetch collection info with products from shopify store front api
 * @param handle collection handle
 * @param numOfDisplays num of collection products to retrieve at once
 * @param sortKey sortKey defined at ProductCollectionSortKeys(https://shopify.dev/api/storefront/reference/products/productcollectionsortkeys)
 * @param reverse sort reverse
 * @param cursor product cursor at store front api
 * @returns
 */
const fetchCollection = async (
  handle: string,
  numOfDisplays: number,
  sortKey: string,
  reverse: boolean,
  cursor: string | null
): Promise<any> => {
  console.log("fetchCollection");
  const query = gql`
    query getCollectionByHandle(
      $handle: String!
      $numOfDisplays: Int!
      $sortKey: ProductCollectionSortKeys!
      $reverse: Boolean!
      $cursor: String
    ) {
      collectionByHandle(handle: $handle) {
        products(
          first: $numOfDisplays
          sortKey: $sortKey
          reverse: $reverse
          after: $cursor
        ) {
          edges {
            cursor
            node {
              handle
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
        title
      }
    }
  `;

  const variables = {
    handle,
    numOfDisplays,
    sortKey,
    reverse,
    cursor,
  };

  const res = await customClient.request(query, variables).catch((err) => {
    throw new Error(err);
  });

  return res;
};

/**
 * generate sort params for query from selected sort-by value
 * @param sortBy
 * @returns
 */
const generateSortParams = (
  sortBy: SortBy
): {
  sortKey: string;
  reverse: boolean;
} => {
  let sortKey: string;
  let reverse: boolean;

  switch (sortBy) {
    case "manual":
      sortKey = "MANUAL";
      reverse = false;
      break;
    case "best-selling":
      sortKey = "BEST_SELLING";
      reverse = false;
      break;
    case "title-ascending":
      sortKey = "TITLE";
      reverse = false;
      break;
    case "title-descending":
      sortKey = "TITLE";
      reverse = true;
      break;
    case "price-ascending":
      sortKey = "PRICE";
      reverse = false;
      break;
    case "price-descending":
      sortKey = "PRICE";
      reverse = true;
      break;
    case "created-ascending":
      sortKey = "CREATED";
      reverse = false;
      break;
    case "created-descending":
      sortKey = "CREATED";
      reverse = true;
      break;
  }

  return {
    sortKey,
    reverse,
  };
};

/**
 * Arrange as collection and product object like Liquid object
 * @param res
 * @returns
 */
const adjustIntoResult = (res: any): GetCollectionWithProductsResult => {
  const collection: Collection = {} as Collection;
  collection.title = res.collectionByHandle.title;

  const products: Product[] = res.collectionByHandle.products.edges.map(
    (edge) => {
      const { node } = edge;
      const product = {} as Product;

      product.handle = node.handle;
      product.images = node.images.edges.map((node) => {
        const originalSrc = node.node.originalSrc;
        return {
          originalSrc,
        };
      });
      product.priceMax = node.priceRange.maxVariantPrice.amount;
      product.priceMin = node.priceRange.minVariantPrice.amount;
      product.title = node.title;

      return product;
    }
  );

  const hasNextPage: boolean =
    res.collectionByHandle.products.pageInfo.hasNextPage;
  const lastCursor = res.collectionByHandle.products.edges.slice(-1)[0].cursor;

  return { collection, products, hasNextPage, cursor: lastCursor };
};
