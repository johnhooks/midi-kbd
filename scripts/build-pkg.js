#!/usr/bin/env node

import { exec } from "./utils/exec.js";

if (!process.env.CI) {
	await exec("yarn", ["clean:all"]);
}

try {
	if (process.env.CI === true) {
		await exec("yarn", ["build:tsc"]);
	} else {
		await exec("yarn", ["build:tsc", "./src/tsconfig.dev.json"]);
	}
	await exec("yarn", ["build:esm"]);
	await exec("yarn", ["build:types"]);
} catch (code) {
	process.exit(code);
}

process.exit(0);
