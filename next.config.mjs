/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files.edgestore.dev",
        port: "",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
      },
    ],
  },
  //   images: {
  //     domains: ["images.unsplash.com","files.edgestore.dev"],
  //   },
};

export default nextConfig;
