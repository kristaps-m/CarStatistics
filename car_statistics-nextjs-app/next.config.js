/** @type {import('next').NextConfig} */
const nextConfig = {}

// module.exports = nextConfig
// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/car-statistics',
        destination: '/src/features/car-statistics/Catalog',
      },
    ];
  },
};

