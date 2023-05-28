/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: "standalone", // Docker requirement
    experimental: {
        appDir: true,
    },
};

module.exports = nextConfig;
