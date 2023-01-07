#!/bin/bash

if ! [ -e ./temp/midi-kbd.api.json ] ; then
  echo "api.json file missing, building package..."
  ./scripts/build-pkg.sh
fi


./node_modules/.bin/api-documenter markdown -i ./temp -o ./docs
