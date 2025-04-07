/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "build",
  images: {
    remotePatterns: [
      { hostname: "adxidrieypeocutmghum.supabase.co" },
      { hostname: "127.0.0.1" },
    ],
  },
};

module.exports = nextConfig;
