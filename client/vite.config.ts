import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";
import tailwindcss from '@tailwindcss/vite'


export default defineConfig(({ mode }) => ({
  server: {
    allowedHosts: true,
    host: '0.0.0.0', // Разрешаем подключения с любых IP
    port: 3000,
    strictPort: true, // Не менять порт, если занят
    hmr: {
      host: 'localhost' , // Или ваш IP 85.117.234.34
      port: 3000,
      protocol: 'ws'
    }
  
  },
  plugins: [
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({ srcDirectory: "src" }),
    mode === "production" ? nitro() : null,
    viteReact(),
    tailwindcss()
  ],
}));