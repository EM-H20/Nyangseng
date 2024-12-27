import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000", // 필요한 경우 포트 지정 (기본값은 80)
      },
    ],
  },
  webpack: (config, { isServer, dev }) => {
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 1000, // 폴링 간격 (밀리초)
        aggregateTimeout: 300, // 변경 감지 후 재빌드까지 대기 시간 (밀리초)
      };
    }
    return config;
  },
};

export default nextConfig;
