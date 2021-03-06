/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack: (config) => {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,

            use: ['@svgr/webpack'],
        });
        return config;
    },
    redirects: [
        {
            source: '/blog/read/it-has-to-change-shape-up-do-better',
            destination: '/logs/it-has-to-change-shape-up-do-better',
            permanent: true,
        },
    ],
    experimental: {
        images: {
            allowFutureImage: true,
        },
    },
}

module.exports = nextConfig
