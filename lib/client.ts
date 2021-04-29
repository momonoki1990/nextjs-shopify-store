import Client from 'shopify-buy'

// fetch the large, unoptimized version of the SDK
import UnoptimizedClient from 'shopify-buy/index.unoptimized.umd';

const client = Client.buildClient({
  domain: 'your-shop-name.myshopify.com',
  storefrontAccessToken: 'your-storefront-access-token'
});

const unoptimizedClient = UnoptimizedClient.buildClient({
  domain: process.env.DOMAIN,
  storefrontAccessToken: process.env.SHOPIFYTOKEN,
});

export default client