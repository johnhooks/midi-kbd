#!/usr/bin/env node

import { exec } from "./utils/exec.js";

// Strip `--local` out. It will be configured only by this script.
const args = process.argv.slice(2).filter((arg) => arg !== "--local");

// When in CI, `api-extractor` shouldn't apply the local flag. This script will
// error if an API change occurs without being committed in an `api.md` file.
const localFlag = process.env.CI ? [] : ["--local"];

/**
 * ApiExtractor CLI arguments.
 */
const apiExtractorArgs = ["exec", "api-extractor", "run", ...args, ...localFlag];

console.log(`yarn ${apiExtractorArgs.join(" ")}`);

exec("yarn", apiExtractorArgs)
	.then(() => process.exit(0))
	.catch((code) => {
		process.exit(code);
	});
