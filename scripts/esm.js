#!/usr/bin/env node

import path from "path";
import { fileURLToPath } from "url";

import { copy } from "./utils/index.js";

const rootDir = path.resolve(fileURLToPath(new URL(".", import.meta.url)), "../");
const fromDir = path.join(rootDir, "build");
const toDir = path.join(rootDir, "dist");

copy(fromDir, toDir, (file) => path.extname(file) === ".js");
