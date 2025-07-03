import {fileURLToPath, URL} from 'node:url'
import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import ui from "@nuxt/ui/vite";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueDevTools({
            launchEditor: "idea"
        }),
        ui({
            ui: {
                colors: {
                    primary: 'green',
                    neutral: 'zinc'
                },
            },
        }),
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url))
        }
    },
    build: {
        sourcemap: true
    }
});
