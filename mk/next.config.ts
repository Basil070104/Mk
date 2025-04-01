import type { NextConfig } from "next";
import tailwindcss from '@tailwindcss/vite'

const nextConfig: NextConfig = {
  /* config options here */
  // plugins: [
  //   tailwindcss(),
  // ],
  webpack(config) {
    config.module.rules.push({
      test: /\.(mp4|webm|ogg)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[name].[hash][ext]',
      },
    });
    return config;
  },
};

export default nextConfig;
