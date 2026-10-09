import type { NextConfig } from "next";

const isDevelopment = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    // Allow local IP image optimization only during development.
    ...(isDevelopment && {
      dangerouslyAllowLocalIP: true,
    }),

    remotePatterns: [
      // Local Django development
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/media/**",
      },

      // Production Django backend
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;