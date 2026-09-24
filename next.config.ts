import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: [
    "localhost",
    "127.0.0.1",
    "192.168.220.8",
    "192.168.1.*",
    "192.168.0.*",
    "192.168.*.*",
    "10.0.*.*",
    "172.16.*.*",
  ],
};

export default nextConfig;
