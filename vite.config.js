import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";

export default defineConfig({
    plugins: [laravel(["resources/ts/app.tsx", "resouces/css/app.css"])],
});
