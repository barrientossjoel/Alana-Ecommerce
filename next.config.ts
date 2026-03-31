import type { NextConfig } from "next";
import os from "os";

// Dynamically collect all local network IP addresses so that Server Actions
// work when accessing the dev server from another device via the Network URL.
function getLocalNetworkOrigins(): string[] {
  const origins: string[] = [];
  const interfaces = os.networkInterfaces();

  for (const iface of Object.values(interfaces)) {
    if (!iface) continue;
    for (const addr of iface) {
      if (addr.family === "IPv4" && !addr.internal) {
        // Allow any port on this IP (common dev ports)
        origins.push(addr.address);
        origins.push(`${addr.address}:3000`);
        origins.push(`${addr.address}:3001`);
        origins.push(`${addr.address}:4000`);
      }
    }
  }

  return origins;
}

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        "localhost",
        "localhost:3000",
        "localhost:3001",
        ...getLocalNetworkOrigins(),
      ],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};

export default nextConfig;
