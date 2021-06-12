import Client from 'shopify-buy'

const client = Client.buildClient({
  domain: process.env.NEXT_PUBLIC_DOMAIN,
  storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFYTOKEN,
});

export default client;