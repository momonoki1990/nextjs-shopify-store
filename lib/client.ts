import Client from 'shopify-buy'

const client = Client.buildClient({
  domain: process.env.DOMAIN,
  storefrontAccessToken: process.env.SHOPIFYTOKEN,
});

export default client