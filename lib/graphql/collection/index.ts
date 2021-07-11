import { gql } from 'graphql-request';
import customClient from 'lib/graphql/customClient';


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
  products: Product[];
  title: string;
};

/**
 * Fetch collection info with products info for collection page
 * @param handle collection handle
 */
export const fetchCollectionWithProducts = async (handle: string): Promise<
  Collection
> => {
  const query = gql`
    query getCollectionByHandle($handle: String!) {
      collectionByHandle(handle: $handle) {
        products(first: 250, sortKey: CREATED) {
          edges {
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
    handle
  }
  const response = await customClient
    .request(query, variables)
    .catch((err) => console.error(JSON.stringify(err)));

  // Arrange as collection object like Liquid collection object
  const collection = {} as Collection;
  collection.title = response.collectionByHandle.title;
  collection.products = response.collectionByHandle.products.edges.map(edge => {
    const { node } = edge;
    const product = {} as Product;
    
    product.handle = node.handle;
    product.images = node.images.edges.map(node => {
      const originalSrc = node.node.originalSrc;
      return {
        originalSrc
      }
    });
    product.priceMax = node.priceRange.maxVariantPrice.amount;
    product.priceMin = node.priceRange.minVariantPrice.amount;
    product.title = node.title;
    return product;
  })

  return collection;
};