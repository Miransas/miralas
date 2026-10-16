import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
    ],
  },
  devIndicators: false,
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

// The options block has been removed.
const withMDX = createMDX();

export default withMDX(nextConfig);