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

// コレクションページ用にコレクションと商品の情報をcollectionオブジェクトにまとめて取得する
// このアプリでは使わないことにする(SEOの事考えると、サーバーサイドから叩きたい・StoreFrontAPIはサーバーから叩くとコストの問題出てくる→js-buy-sdkであれば、コストの問題なさそうなので)
export const fetchCollectionWithProducts = async (): Promise<
  Collection
> => {
  const query = gql`
    {
      collectionByHandle(handle: "all") {
        products(first: 8, sortKey: CREATED) {
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

  const response = await customClient
    .request(query)
    .catch((err) => console.error(JSON.stringify(err)));

  // StoreFront APIからのresponseをLiquidで得られるようなcollectionオブジェクトの形式に整形する
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