module.exports = {
  images: {
    domains: ["cdn.shopify.com"],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/collections/all",
        permanent: true,
      },
    ];
  },
};
