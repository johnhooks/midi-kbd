#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { exec } from "./utils/exec.js";

const rootDir = path.resolve(fileURLToPath(new URL(".", import.meta.url)), "../");

const apiDocumenterPath = path.join(rootDir, "node_modules/.bin/api-documenter");
const apiJsonPath = path.join(rootDir, "temp/midi-kbd.api.json");

if (!fs.existsSync(apiJsonPath)) {
	console.log("api.json file missing, building package...");
	await exec("yarn", ["build"]);
}

const args = process.argv.slice(2);

/**
 * ApiDocumenter CLI arguments.
 */
const apiDocumenterArgs = ["markdown", "-i", "./temp", "-o", "./docs", ...args];

console.log(`api-documenter ${apiDocumenterArgs.join(" ")}`);

exec(apiDocumenterPath, apiDocumenterArgs)
	.then(() => process.exit(0))
	.catch((code) => {
		process.exit(code);
	});
