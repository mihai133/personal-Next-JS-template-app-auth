/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "build",
  images: {
    remotePatterns: [{ hostname: "adxidrieypeocutmghum.supabase.co" }],
  },
};

module.exports = nextConfig;
