import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
       {
        protocol: 'https',
        hostname: 'raw.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },

    ],
  },
  devIndicators: false,
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx", "mjs", "cjs", "json", "rs", "py"],

  redirects: async () => [
  { source: "/resources/docs/:path*", destination: "/docs/:path*", permanent: false },
  
  ]
};

// The options block has been removed.
const withMDX = createMDX();

export default withMDX(nextConfig);