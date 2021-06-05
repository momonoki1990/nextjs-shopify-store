import Client from 'shopify-buy'
// fetch the large, unoptimized version of the SDK
import UnoptimizedClient from 'shopify-buy/index.unoptimized.umd';


const client = Client.buildClient({
  domain: process.env.NEXT_PUBLIC_DOMAIN,
  storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFYTOKEN,
});

export const unoptimizedclient = UnoptimizedClient.buildClient({
  domain: process.env.NEXT_PUBLIC_DOMAIN,
  storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFYTOKEN,
});

export default client