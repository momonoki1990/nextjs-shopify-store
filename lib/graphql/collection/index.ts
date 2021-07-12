import { gql } from 'graphql-request';
import customClient from 'lib/graphql/customClient';
import CollectionPage from 'pages/collections/[handle]';


type Image = {
  src: string;
}

export type Product = {
  handle: string;
  images: Image;
  priceMin: number;
  priceMax: number;
  title: string;
}

export type Collection = {
  title: string;
};

export type fetchCollectionWithProductsResult = {
  collection: Collection;
  products: Product[];
  cursor: string;
  hasNextPage: boolean;
};

/**
 * Fetch collection info with products info for collection page
 * @param handle collection handle
 */
export const fetchCollectionWithProducts = async (
  handle: string,
  cursor: string | null,
): Promise<fetchCollectionWithProductsResult> => {
  const query = gql`
    query getCollectionByHandle($handle: String!, $cursor: String) {
      collectionByHandle(handle: $handle) {
        products(first: 8, sortKey: CREATED, after: $cursor) {
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
  console.log(cursor)

  const variables = {
    handle,
    cursor
  };
  const res = await customClient
    .request(query, variables)
    .catch((err) => console.error(JSON.stringify(err)));

  // Arrange as collection object like Liquid collection object
  const collection: Collection = {} as Collection;
  collection.title = res.collectionByHandle.title;

  const products: Product[] = res.collectionByHandle.products.edges.map((edge) => {
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
  });

  const hasNextPage: boolean = res.collectionByHandle.products.pageInfo.hasNextPage;
  const lastCursor = res.collectionByHandle.products.edges.slice(-1)[0].cursor;


  return { collection, products, hasNextPage, cursor: lastCursor };
};