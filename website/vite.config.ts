import { fileURLToPath } from "node:url";

import { defineConfig } from "vite";

export default defineConfig({
	base: process.env.NODE_ENV === "production" ? "/midi-kbd/" : "/",
	resolve: {
		alias: {
			"midi-kbd": fileURLToPath(new URL("../src/index.ts", import.meta.url).href),
		},
	},
});
