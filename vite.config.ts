import solid from "solid-start/vite";
import vercel from 'solid-start-vercel';
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [solid({
    ssr: true,
    adapter: vercel()
  })],
  optimizeDeps: {
    exclude: ["@tanstack/solid-query"]
  },
  ssr: {
    noExternal: ["@kobalte/core"],
    external: ["@prisma/client"]
  },
});
