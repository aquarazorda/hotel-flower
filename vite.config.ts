import solid from "solid-start/vite";
import prpc from "@prpc/vite";
import vercel from "solid-start-vercel";
import { defineConfig } from "vite";
import generateImageCountPlugin from './src/plugins/imageCount.plugin';

export default defineConfig({
  plugins: [
    generateImageCountPlugin(),
    prpc(),
    solid({
      ssr: true,
      adapter: vercel(),
    }),
  ],
  optimizeDeps: {
    exclude: ["@tanstack/solid-query"],
  },
  ssr: {
    noExternal: ["@kobalte/core"],
    external: ["@prisma/client"],
  },
});
