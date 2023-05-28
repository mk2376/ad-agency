/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: "standalone", // Docker requirement
    experimental: {
        appDir: true,
    },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'ipfs.io',
            port: '',
            pathname: '/**',
          },
        ],
    },
};

module.exports = nextConfig;
