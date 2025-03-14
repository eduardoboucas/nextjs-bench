import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: process.env.NODE_ENV === "production" ? ".prod" : ".dev",
  /* config options here */
};

export default nextConfig;
