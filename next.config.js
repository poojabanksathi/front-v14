/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    optimizeFonts: true,
    swcMinify: false, // it should be false by default
    experimental: {
      staleTimes: {
        dynamic: 30,
        static: 180,
      },
      optimizePackageImports: ['react-star-ratings', 'react-d3-speedometer' , 'slick-carousel'],

    },
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "devcdn.banksathi.com",
          pathname: "/images/**",
          port: "",
        },
        {
          protocol: "https",
          hostname: "www.linkedin.com",
        },
        {
          protocol: "https",
          hostname: "devcdn.banksathi.com",
        },
        {
          protocol: "https",
          hostname: "media.banksathi.com",
        },
      ],
      // ],
      // minimumCacheTTL:1500000,
      // domains: ['https://tryfront.banksathi.com/'], //make it 'your-domain.com'
      //  domains: ['devcdn.banksathi.com'], //make it 'your-domain.com'
    },
  };
  
  module.exports = nextConfig;