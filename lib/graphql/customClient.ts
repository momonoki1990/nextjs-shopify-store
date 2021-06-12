import { GraphQLClient } from "graphql-request";

const version = "2021-04";
const url = `https://${process.env.NEXT_PUBLIC_DOMAIN}/api/${version}/graphql.json`;
const headers = {
  "X-Shopify-Storefront-Access-Token": process.env.NEXT_PUBLIC_SHOPIFYTOKEN,
};
const option = { headers };

const customClient = new GraphQLClient(url, option);

export default customClient;