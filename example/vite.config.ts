import { fileURLToPath } from "node:url";

import { defineConfig } from "vite";

export default defineConfig({
	base: "/midi-kbd/",
	resolve: {
		alias: {
			"midi-kbd": fileURLToPath(new URL("../src/index.ts", import.meta.url).href),
		},
	},
});
