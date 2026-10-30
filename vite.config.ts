import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";

// Nitro picks the deployment target automatically on Cloudflare, Vercel and
// Netlify builds, and falls back to a Node server elsewhere. To force a target,
// set NITRO_PRESET (e.g. NITRO_PRESET=node-server npm run build).
export default defineConfig(({ command }) => ({
  plugins: [
    tsConfigPaths(),
    tanstackStart({
      // Use src/server.ts as the SSR entry (error-handling wrapper).
      server: { entry: "server" },
    }),
    viteReact(),
    tailwindcss(),
    ...(command === "build" ? [nitro()] : []),
  ],
  resolve: {
    dedupe: ["react", "react-dom", "@tanstack/react-router", "@tanstack/react-start"],
  },
}));
