#!/usr/bin/env node

import path from "node:path";
import { fileURLToPath } from "node:url";

import { exec } from "./utils/exec.js";

const rootDir = path.resolve(fileURLToPath(new URL(".", import.meta.url)), "../");

if (!process.env.CI) {
	await exec("yarn", ["clean:all"]);
}

try {
	await exec("yarn", ["build:tsc"]);
	await exec("yarn", ["build:esm"]);
	await exec("yarn", ["build:types"]);
} catch (code) {
	process.exit(code);
}

process.exit(0);
