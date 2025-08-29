import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Redirect lightthebeacon.com to aeonicmenace.com
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'lightthebeacon.com',
          },
        ],
        destination: 'https://aeonicmenace.com/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.lightthebeacon.com',
          },
        ],
        destination: 'https://aeonicmenace.com/:path*',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
