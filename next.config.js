/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "raw.githubusercontent.com",
      "upload.wikimedia.org",
      "fontmeme.com",
    ],
  },
};

module.exports = nextConfig;
