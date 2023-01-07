#!/bin/bash

echo "copying ./build/**/*.js to ./dist"
mkdir -p dist
rsync -a --prune-empty-dirs --include '*/' --include '*.js' --exclude '*' build/ dist/
