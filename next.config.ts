import type { NextConfig } from 'next';
const path = require('path');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/shared/styles')],
    prependData: `@import "variables.scss";`,
  },
  output: 'export',
  trailingSlash: true,

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
